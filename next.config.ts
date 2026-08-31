import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is static (no API routes, no server actions, no
  // dynamic rendering) — export it to plain HTML/CSS/JS so it can be
  // deployed to Cloudflare Pages (or any static host) without an
  // adapter. This produces the `out/` directory Cloudflare's build
  // step expects, instead of the SSR-capable `.next/` output.
  output: "export",
  // Static export has no server to run Next's Image Optimization API,
  // so images are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
