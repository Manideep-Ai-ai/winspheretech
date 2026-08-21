"use client";

import { useEffect, useRef, useState } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule,
  geoBounds,
  type GeoPermissibleObjects,
} from "d3-geo";
import { cn } from "@/lib/utils";

// Matte cream + gray + blue globe: a real dotted world map (not an abstract
// sphere) rendered via orthographic projection. Ocean is transparent (the
// cream page shows through); land is a scatter of matte-blue dots.
const LAND_URL = "/land-110m.json";
const DOT_COLOR = "#2c4870";
const OUTLINE_COLOR = "rgba(44,72,112,0.4)";
const GRATICULE_COLOR = "rgba(44,72,112,0.1)";

interface LandFeature {
  type: "Feature";
  geometry: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] };
  properties?: Record<string, unknown>;
}
interface LandCollection {
  type: "FeatureCollection";
  features: LandFeature[];
}

let landCache: LandCollection | null = null;
let landPromise: Promise<LandCollection> | null = null;

function loadLand(): Promise<LandCollection> {
  if (landCache) return Promise.resolve(landCache);
  if (!landPromise) {
    landPromise = fetch(LAND_URL)
      .then((res) => res.json())
      .then((data: LandCollection) => {
        landCache = data;
        return data;
      });
  }
  return landPromise;
}

function pointInRing(point: [number, number], ring: number[][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function pointInFeature(point: [number, number], feature: LandFeature): boolean {
  const { geometry } = feature;
  if (geometry.type === "Polygon") {
    const rings = geometry.coordinates as number[][][];
    if (!pointInRing(point, rings[0])) return false;
    for (let i = 1; i < rings.length; i++) if (pointInRing(point, rings[i])) return false;
    return true;
  }
  const polygons = geometry.coordinates as number[][][][];
  for (const rings of polygons) {
    if (!pointInRing(point, rings[0])) continue;
    let inHole = false;
    for (let i = 1; i < rings.length; i++) {
      if (pointInRing(point, rings[i])) {
        inHole = true;
        break;
      }
    }
    if (!inHole) return true;
  }
  return false;
}

function dotsForFeature(feature: LandFeature, step: number): [number, number][] {
  const dots: [number, number][] = [];
  const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(feature as GeoPermissibleObjects);
  for (let lng = minLng; lng <= maxLng; lng += step) {
    for (let lat = minLat; lat <= maxLat; lat += step) {
      if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
    }
  }
  return dots;
}

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let radius = Math.min(width, height) / 2.15;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule();

    const applySize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      radius = Math.min(width, height) / 2.15;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection.scale(radius).translate([width / 2, height / 2]);
    };
    applySize();

    let land: LandCollection | null = null;
    let dots: [number, number][] = [];
    let rotation: [number, number] = [0, -8];
    let autoRotate = true;
    let raf = 0;
    let lastT = performance.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = "rgba(44,72,112,0.03)";
      ctx.fill();

      ctx.beginPath();
      path(graticule());
      ctx.strokeStyle = GRATICULE_COLOR;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (land) {
        ctx.beginPath();
        land.features.forEach((f) => path(f as GeoPermissibleObjects));
        ctx.strokeStyle = OUTLINE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();

        const scaleFactor = projection.scale() / radius;
        ctx.fillStyle = DOT_COLOR;
        for (const [lng, lat] of dots) {
          const p = projection([lng, lat]);
          if (!p) continue;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1.3 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.strokeStyle = OUTLINE_COLOR;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const tick = (t: number) => {
      const dt = t - lastT;
      lastT = t;
      if (autoRotate) {
        rotation = [rotation[0] + dt * 0.012, rotation[1]];
        projection.rotate(rotation);
      }
      render();
      raf = requestAnimationFrame(tick);
    };

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startRotation: [number, number] = rotation;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      autoRotate = false;
      startX = e.clientX;
      startY = e.clientY;
      startRotation = rotation;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const lat = Math.max(-90, Math.min(90, startRotation[1] - dy * 0.4));
      rotation = [startRotation[0] + dx * 0.4, lat];
      projection.rotate(rotation);
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      canvas.releasePointerCapture(e.pointerId);
      window.setTimeout(() => (autoRotate = true), 1200);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.style.cursor = "grab";

    const onResize = () => applySize();
    window.addEventListener("resize", onResize);

    loadLand().then((data) => {
      land = data;
      const step = 2.4;
      dots = data.features.flatMap((f) => dotsForFeature(f, step));
      setReady(true);
    });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto aspect-square w-full max-w-[600px]", className)}
    >
      <div
        aria-hidden
        className="absolute inset-[6%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, transparent 58%, rgba(44,72,112,0.14) 74%, transparent 88%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[10%] rounded-full"
        style={{ boxShadow: "0 30px 60px -20px rgba(23,24,28,0.22)" }}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "relative size-full transition-opacity duration-700 [contain:layout_paint_size]",
          ready ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
