"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineLink, HiOutlineMail } from "react-icons/hi";
import { navLinks, contactInfo } from "@/lib/content";

const socialIcons = { LinkedIn: FaLinkedinIn, Instagram: FaInstagram, Facebook: FaFacebookF } as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:flex">
              <Image
                src="/logo.jpeg"
                alt="WinSphere Technologies"
                width={32}
                height={32}
                className="shrink-0 rounded-lg"
              />
              <span className="min-w-0 truncate font-heading text-lg text-text">WinSphere</span>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              AI, cloud, and software engineering for enterprises moving fast.
            </p>
            <div className="mt-6 flex gap-3">
              {contactInfo.social.map((name) => {
                const Icon = socialIcons[name as keyof typeof socialIcons];
                return (
                  <a
                    key={name}
                    href="#"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-text">
              <HiOutlineLink size={16} className="text-primary" />
              Quick Links
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-text">
              <HiOutlineMail size={16} className="text-primary" />
              Stay Updated
            </p>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              Subscribe for insights on AI, cloud, and digital growth.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-full border border-border bg-transparent px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button className="shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-bg">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <p className="text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} WinSphere Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
