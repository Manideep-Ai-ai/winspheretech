"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

const fields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "company", label: "Company", type: "text" },
] as const;

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="fluid-px fluid-py">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 fluid-gap-y lg:grid-cols-2">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Let&rsquo;s build what&rsquo;s next.
          </h2>
          <p className="mt-6 max-w-md text-text-secondary">
            Tell us about your project and we&rsquo;ll get back to you within
            one business day.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-text-secondary hover:text-primary">
              <Mail size={18} /> {contactInfo.email}
            </a>
            <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-text-secondary hover:text-primary">
              <Phone size={18} /> {contactInfo.phone}
            </a>
            <div className="flex items-center gap-3 text-text-secondary">
              <MapPin size={18} /> {contactInfo.location}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="glass rounded-3xl fluid-p">
            <div className="flex flex-col gap-5">
              {fields.map((field) => (
                <div key={field.name} className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-transparent px-4 py-3.5 text-text outline-none transition-colors focus:border-primary"
                  />
                  <label
                    htmlFor={field.name}
                    className="pointer-events-none absolute left-4 top-3.5 text-text-secondary transition-all peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-bg peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-bg peer-[:not(:placeholder-shown)]:px-1"
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder=" "
                  className="peer w-full resize-none rounded-xl border border-border bg-transparent px-4 py-3.5 text-text outline-none transition-colors focus:border-primary"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-4 top-3.5 text-text-secondary transition-all peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-bg peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-bg peer-[:not(:placeholder-shown)]:px-1"
                >
                  Project Details
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-semibold text-bg transition-transform hover:scale-[1.02]"
              >
                Send Message
              </button>
              {sent && <p className="text-sm text-primary">Opening your email client&hellip;</p>}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
