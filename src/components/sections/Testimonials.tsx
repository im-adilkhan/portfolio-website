"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-x section-y relative mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say"
        align="center"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.div key={t.name + t.company} variants={fadeInUp}>
            <Card tilt={6} className="h-full">
              <figure className="flex h-full flex-col p-6">
                <Quote size={20} className="mb-4 text-accent" />
                <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-medium text-fg">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {t.role}, {t.company}
                  </p>
                </figcaption>
              </figure>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
