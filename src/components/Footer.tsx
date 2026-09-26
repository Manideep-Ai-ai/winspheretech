"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { contactInfo, digitalMarketingServices, itSolutionsServices } from "@/lib/content";

const socialIcons = { LinkedIn: FaLinkedinIn, Instagram: FaInstagram, Facebook: FaFacebookF } as const;

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Our Approach", href: "#approach" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-navy-1 px-6 py-14 text-navy-text lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="auto-grid-md">
          <div className="max-w-sm">
            {/* logo-full-light.png bakes the wordmark in already (dark ink
                swapped for white), so it reads on this section's permanent
                navy background without a separate text label. */}
            <Image
              src="/logo-full-light.png"
              alt="WinSphere Technologies Pvt Ltd"
              width={2368}
              height={1285}
              className="h-8 w-auto"
            />
            <p className="mt-4 text-sm text-navy-text-secondary">
              WinSphere Technologies Digital Marketing &amp; IT Solutions for
              Businesses. We help businesses strengthen their digital
              presence, generate opportunities, and solve technology
              challenges through digital marketing and practical technology
              solutions.
            </p>
            <div className="mt-6 flex gap-3">
              {contactInfo.social.map(({ name, url }) => {
                const Icon = socialIcons[name];
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-border text-navy-text-secondary transition-colors hover:border-teal/40 hover:text-teal"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-text">Digital Marketing</p>
            <ul className="mt-4 flex flex-col gap-3">
              {digitalMarketingServices.map((service) => (
                <li key={service.title}>
                  <a href="#digital-marketing" className="text-sm text-navy-text-secondary hover:text-teal">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-text">IT Solutions</p>
            <ul className="mt-4 flex flex-col gap-3">
              {itSolutionsServices.map((service) => (
                <li key={service.title}>
                  <a href="#it-solutions" className="text-sm text-navy-text-secondary hover:text-teal">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
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
        </div>

        <div className="my-10 h-px w-full bg-navy-border" />

        <p className="text-center text-xs text-navy-text-secondary">
          Copyright &copy; {new Date().getFullYear()} WinSphere Technologies Private Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
