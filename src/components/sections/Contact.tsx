"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { siteConfig, socialLinks } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowUpRightIcon, CheckIcon, CopyIcon, LockIcon, socialIconMap } from "@/components/ui/Icons";
import { CvButton } from "@/components/ui/CvButton";

/**
 * The form posts to /api/contact, which sends the mail over SMTP server-side.
 * Credentials live only in that route handler — nothing secret reaches the
 * browser. If the server has no SMTP credentials it replies 503 and we fall
 * back to the visitor's own mail client rather than losing the message.
 */

type Status = "idle" | "submitting" | "sent" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: { name: string; email: string; subject: string; message: string }): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 2) errors.subject = "Please add a subject.";
  if (values.message.trim().length < 10) errors.message = "Please add a little more detail.";
  return errors;
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link still works.
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-mist-400 transition-colors duration-300 hover:border-rose-400/50 hover:text-mist-100"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5 text-rose-400" /> : <CopyIcon className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const update = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  /** Hand off to the visitor's own mail client — used when SMTP is unconfigured. */
  const openMailClient = () => {
    const subject = encodeURIComponent(values.subject.trim() || `Message from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Guard against double submission, including a fast double-click.
    if (status === "submitting") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        code?: string;
        errors?: FormErrors;
      };

      if (response.ok && data.ok) {
        setStatus("sent");
        setValues(EMPTY);
        return;
      }

      // Server has no SMTP credentials — fall back rather than lose the message.
      if (response.status === 503 || data.code === "not_configured") {
        openMailClient();
        setStatus("sent");
        setServerMessage("Your mail client should now be open with the message ready.");
        return;
      }

      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setServerMessage(data.error ?? "The message could not be sent.");
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please check your connection, or email me directly.");
    }
  };

  const fieldClass = (hasError: boolean) =>
    cn(
      "w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-[0.9rem] text-mist-100 outline-none transition-colors duration-300 placeholder:text-mist-600",
      hasError ? "border-[#ef5f7a]/60" : "border-white/[0.1] focus:border-rose-400/50",
    );

  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="eyebrow block text-[0.625rem]">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={busy}
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn("mt-2", fieldClass(Boolean(errors.name)))}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-[0.75rem] text-[#ef8a9c]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="eyebrow block text-[0.625rem]">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            disabled={busy}
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn("mt-2", fieldClass(Boolean(errors.email)))}
            placeholder="you@company.com"
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-[0.75rem] text-[#ef8a9c]">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="eyebrow block text-[0.625rem]">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          disabled={busy}
          value={values.subject}
          onChange={update("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={cn("mt-2", fieldClass(Boolean(errors.subject)))}
          placeholder="Freelance project, internship, collaboration…"
        />
        {errors.subject ? (
          <p id="contact-subject-error" className="mt-1.5 text-[0.75rem] text-[#ef8a9c]">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="eyebrow block text-[0.625rem]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          disabled={busy}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn("mt-2 resize-y", fieldClass(Boolean(errors.message)))}
          placeholder="What are you building, and where do you need help?"
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-[0.75rem] text-[#ef8a9c]">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button
          type="submit"
          disabled={busy}
          magnetic={false}
          icon={<ArrowUpRightIcon className="h-4 w-4" />}
        >
          {busy ? "Sending…" : "Send message"}
        </Button>

        <p
          aria-live="polite"
          className={cn("text-[0.8rem]", status === "error" ? "text-[#ef8a9c]" : "text-mist-500")}
        >
          {status === "sent"
            ? (serverMessage ?? "Message sent. I will get back to you shortly.")
            : status === "error"
              ? serverMessage
              : null}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden">
      {/* Closing glow — the one place the palette is allowed to bloom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38rem] bg-[radial-gradient(60%_60%_at_50%_100%,rgba(34,211,238,0.10),transparent_70%),radial-gradient(45%_50%_at_20%_100%,rgba(139,92,246,0.10),transparent_70%)]"
      />

      <div className="shell relative section-y">
        <div className="flex items-center gap-4">
          <span className="eyebrow text-rose-400">07</span>
          <span aria-hidden="true" className="h-px w-16 bg-gradient-to-r from-white/22 to-transparent" />
          <span className="eyebrow">Contact</span>
        </div>

        {/* Statement */}
        <h2 id="contact-heading" className="mt-8 max-w-4xl">
          <span className="sr-only">Have an idea? Let&rsquo;s build it.</span>
          <span aria-hidden="true" className="block font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.94] tracking-[-0.045em]">
            {["Have an idea?", "Let's build it."].map((line, lineIndex) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={cn("block", lineIndex === 1 ? "text-accent" : "text-mist-50")}
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: lineIndex * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-mist-400">
            Open to freelance projects, internships and engineering roles — particularly anything
            that touches full stack development, AI or data. Tell me what you are building.
          </p>
        </Reveal>

        {/* Channels + form */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="eyebrow text-[0.625rem]">Direct</span>
              <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <ul className="mt-6 space-y-0 border-t border-white/[0.08]">
              {socialLinks.map((link, index) => {
                const Icon = socialIconMap[link.icon];
                const available = link.href !== null;

                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: index * 0.07 }}
                    className="border-b border-white/[0.08]"
                  >
                    {available ? (
                      <a
                        href={link.href as string}
                        {...(link.href!.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-4 py-4"
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0 text-mist-500 transition-colors duration-300 group-hover:text-rose-400" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.9rem] font-medium tracking-tight text-mist-100">
                            {link.label}
                          </span>
                          <span className="block truncate text-[0.78rem] text-mist-500">{link.handle}</span>
                        </span>
                        <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-mist-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mist-200" />
                      </a>
                    ) : (
                      /* No URL supplied yet — shown as explicitly unavailable
                         rather than linking somewhere that does not exist. */
                      <div
                        aria-disabled="true"
                        title="Link not published yet"
                        className="flex cursor-not-allowed items-center gap-4 py-4 opacity-45"
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0 text-mist-600" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.9rem] font-medium tracking-tight text-mist-300">
                            {link.label}
                          </span>
                          <span className="block truncate text-[0.78rem] text-mist-600">
                            Not published yet
                          </span>
                        </span>
                        <LockIcon className="h-4 w-4 shrink-0 text-mist-600" />
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CopyEmailButton />
              <span className="text-[0.72rem] text-mist-600">{siteConfig.location}</span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="text-[0.72rem] text-mist-500 transition-colors duration-300 hover:text-rose-300"
              >
                {siteConfig.phone}
              </a>
            </div>

            {siteConfig.cv ? (
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <p className="eyebrow text-[0.6rem]">Curriculum vitae</p>
                <div className="mt-3.5 flex flex-wrap items-center gap-3">
                  <CvButton />
                  <span className="text-[0.7rem] text-mist-600">PDF · updated {siteConfig.cv.updated}</span>
                </div>
              </div>
            ) : null}

            <div className="hidden">
              <span />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="eyebrow text-[0.625rem]">Send a message</span>
              <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Reveal delay={0.08} className="mt-6">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
