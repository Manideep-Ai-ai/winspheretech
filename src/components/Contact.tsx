"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, services } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

const fields = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Work Email", type: "email", required: true },
  { name: "company", label: "Company", type: "text", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      phone: data.get("phone"),
      service: data.get("service"),
      message: data.get("message"),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="fluid-px fluid-py">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 fluid-gap-y lg:grid-cols-2">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h2 className="mt-3 text-fluid-h2 font-extrabold leading-tight">
            Let&rsquo;s build what&rsquo;s next.
          </h2>
          <p className="mt-6 max-w-md text-text-secondary">
            Tell us what you&rsquo;re trying to build, improve, or scale. Our
            team will get back to you within one business day.
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
                    required={field.required}
                    disabled={status === "submitting"}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-transparent px-4 py-3.5 text-text outline-none transition-colors focus:border-primary disabled:opacity-60"
                  />
                  <label
                    htmlFor={field.name}
                    className="pointer-events-none absolute left-4 top-3.5 text-text-secondary transition-all peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-bg peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-bg peer-[:not(:placeholder-shown)]:px-1"
                  >
                    {field.label}
                    {!field.required && <span className="text-muted"> (optional)</span>}
                  </label>
                </div>
              ))}

              <div>
                <label htmlFor="service" className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  Service Required
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  disabled={status === "submitting"}
                  defaultValue=""
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 text-text outline-none transition-colors focus:border-primary disabled:opacity-60"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  disabled={status === "submitting"}
                  placeholder=" "
                  className="peer w-full resize-none rounded-xl border border-border bg-transparent px-4 py-3.5 text-text outline-none transition-colors focus:border-primary disabled:opacity-60"
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
                disabled={status === "submitting"}
                className="mt-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-semibold text-bg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "submitting" ? "Sending…" : "Send Enquiry"}
              </button>

              {status === "success" && (
                <p className="text-sm text-primary">
                  Message sent — check your inbox for a confirmation. We&rsquo;ll be in touch within one business day.
                </p>
              )}
              {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
