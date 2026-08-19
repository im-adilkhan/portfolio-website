"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/socials";
import { fadeInUp, VIEWPORT } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* big marquee name */}
      <div className="flex overflow-hidden py-10 opacity-[0.06] select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="px-8 font-display text-[10vw] font-bold leading-none tracking-tighter"
            >
              {profile.name} — {profile.role}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col gap-8 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-display text-2xl tracking-tight">Let&apos;s work together</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
            >
              {profile.email}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                >
                  {s.label}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* dataset footer — meta row */}
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {[
            { k: "Location", v: profile.location },
            { k: "Status", v: profile.available ? "Open to roles" : "Booked" },
            { k: "Stack", v: "SQL · Python · Power BI" },
            { k: "Response", v: "< 24h" },
          ].map((m) => (
            <div key={m.k} className="bg-bg px-4 py-3">
              <dt className="label-mono mb-1.5">{m.k}</dt>
              <dd className="font-mono text-xs text-fg/85">{m.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 font-mono text-xs text-muted/70">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Framer Motion &amp;
          Tailwind.
        </p>
      </div>
    </footer>
  );
}
