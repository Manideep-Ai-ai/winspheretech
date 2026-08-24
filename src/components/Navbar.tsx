"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { navLinks } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The navbar sits transparent over the dark-navy Hero until the user
  // scrolls, so its text needs to stay light until there's a light
  // background underneath it to contrast against.
  const textColor = scrolled ? "text-text" : "text-navy-text";
  const textMuted = scrolled ? "text-text-secondary" : "text-navy-text-secondary";
  const textHover = scrolled ? "hover:text-text" : "hover:text-navy-text";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-bg/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:flex">
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

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href} className="group relative">
              <a href={link.href} className={`text-sm ${textMuted} transition-colors ${textHover}`}>
                {link.label}
              </a>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-navy-1 transition-transform hover:scale-105 md:inline-block"
        >
          Get a Quote
        </a>

        <button
          className={open ? "text-text md:hidden" : `${textColor} md:hidden`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-bg/95 px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-text-secondary hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
