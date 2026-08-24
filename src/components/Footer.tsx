"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { contactInfo, industries, services } from "@/lib/content";

const socialIcons = { LinkedIn: FaLinkedinIn, Instagram: FaInstagram, Facebook: FaFacebookF } as const;

const companyLinks = [
  { label: "About", href: "#why-us" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-navy-1 px-6 py-14 text-navy-text lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:flex">
              <Image
                src="/logo.jpeg"
                alt="WinSphere Technologies"
                width={32}
                height={32}
                className="shrink-0 rounded-lg"
              />
              <span className="min-w-0 truncate font-heading text-lg text-navy-text">WinSphere</span>
            </div>
            <p className="mt-4 text-sm text-navy-text-secondary">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-border text-navy-text-secondary transition-colors hover:border-teal/40 hover:text-teal"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-text">Company</p>
            <ul className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-navy-text-secondary hover:text-teal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-text">Services</p>
            <ul className="mt-4 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.title}>
                  <a href="#services" className="text-sm text-navy-text-secondary hover:text-teal">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-text">Industries</p>
            <ul className="mt-4 flex flex-col gap-3">
              {industries.map((industry) => (
                <li key={industry.name}>
                  <a href="#industries" className="text-sm text-navy-text-secondary hover:text-teal">
                    {industry.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-navy-border" />

        <p className="text-center text-xs text-navy-text-secondary">
          &copy; {new Date().getFullYear()} WinSphere Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
