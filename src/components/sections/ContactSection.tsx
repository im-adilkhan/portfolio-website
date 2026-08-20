"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check, Send } from "lucide-react";
import { profile, socials } from "@/data/socials";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import MagneticButton from "@/components/animations/MagneticButton";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * GitHub Pages pe static export chalta hai, jahan /api/contact exist hi nahi karta.
 * Us case mein form user ke email client ko prefilled mailto ke saath kholta hai.
 * Server build (local dev / Vercel) pe ye false rehta hai aur API route hi chalta hai.
 */
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // honeypot bhara hua -> bot hai, chup-chaap ignore karo
    if (payload.company) {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    // static host: koi backend nahi, mailto pe fallback
    if (IS_STATIC) {
      const subject = payload.subject || `Portfolio message from ${payload.name}`;
      const body = `From: ${payload.name} <${payload.email}>

${payload.message}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Message could not be sent.");
    }
  }

  return (
    <section id="contact" className="section-x section-y relative mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        subtitle="Hiring for a Data Analyst / MIS / BI role, or have a dataset that needs sorting out? Send a message — I usually reply within 24 hours."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.a
            variants={fadeInUp}
            href={`mailto:${profile.email}`}
            className="block break-all font-display text-xl tracking-tight transition-colors hover:text-accent sm:text-3xl"
          >
            {profile.email}
          </motion.a>

          <motion.p variants={fadeInUp} className="mt-4 text-sm text-muted">
            {profile.location} · {profile.phone} · Open to remote
          </motion.p>

          <motion.ul variants={fadeInUp} className="mt-8 space-y-3 sm:mt-10">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between border-b border-line py-3 transition-colors hover:border-accent"
                >
                  <span className="text-sm text-fg">{s.label}</span>
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                    {s.handle}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="space-y-5 rounded-lg border border-line bg-surface/40 p-5 backdrop-blur-xl sm:p-8"
        >
          {IS_STATIC && (
            <p className="label-mono leading-relaxed">
              This site is hosted statically — submitting opens your email app with
              the message ready to send.
            </p>
          )}

          {/* honeypot — bots ke liye */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute h-0 w-0 opacity-0"
            aria-hidden
          />

          <motion.div variants={fadeInUp} className="grid gap-5 sm:grid-cols-2">
            <Input label="Name" name="name" required placeholder="Your name" />
            <Input
              label="Email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Input label="Subject" name="subject" placeholder="What is this about?" />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TextArea
              label="Message"
              name="message"
              required
              minLength={10}
              placeholder="Tell me a bit about the role or project…"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <MagneticButton>
              <Button type="submit" disabled={status === "sending" || status === "sent"}>
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      Sending <Loader />
                    </motion.span>
                  ) : status === "sent" ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      {IS_STATIC ? "Opened in mail app" : "Sent"} <Check size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      {IS_STATIC ? "Compose email" : "Send message"} <Send size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </MagneticButton>

            <AnimatePresence>
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-[#0ca30c]"
                >
                  Got it — I&apos;ll reply soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
