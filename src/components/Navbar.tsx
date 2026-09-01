"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { navLinks } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer semantics: lock body scroll (position:fixed, not just
  // overflow:hidden — iOS Safari ignores overflow:hidden alone), trap Tab
  // inside the panel, Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const main = document.querySelector("main");
    main?.setAttribute("inert", "");

    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>("a, button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // The navbar sits transparent over the dark-navy Hero until the user
  // scrolls, so its text needs to stay light until there's a light
  // background underneath it to contrast against.
  const textColor = scrolled ? "text-text" : "text-navy-text";
  const textMuted = scrolled ? "text-text-secondary" : "text-navy-text-secondary";
  const textHover = scrolled ? "hover:text-text" : "hover:text-navy-text";

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-bg/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:flex">
          <Image
            src="/logo.jpeg"
            alt="WinSphere Technologies"
            width={36}
            height={36}
            className="shrink-0 rounded-lg"
          />
          <span className={`min-w-0 truncate font-heading text-lg ${open ? "text-text" : textColor}`}>
            WinSphere
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href} className="group relative shrink-0">
              <a href={link.href} className={`whitespace-nowrap text-sm ${textMuted} transition-colors ${textHover}`}>
                {link.label}
              </a>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-navy-1 transition-transform hover:scale-105 md:inline-block"
        >
          Get a Quote
        </a>

        <button
          ref={menuButtonRef}
          className={open ? "shrink-0 text-text md:hidden" : `shrink-0 ${textColor} md:hidden`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {open && (
        <>
          <div
            aria-hidden
            onClick={closeMenu}
            className="fixed inset-0 top-[73px] z-40 bg-navy-1/40 md:hidden"
          />
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-50 border-t border-border bg-bg/95 px-6 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu} className="text-text-secondary hover:text-text">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </header>
  );
}
