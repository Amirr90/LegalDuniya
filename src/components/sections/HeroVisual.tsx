"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type HeroVisualProps = {
  heroImage: string;
};

const SLIDE_INTERVAL_MS = 4000;
const FADE_DURATION_MS = 700;

const CURATED_HERO_IMAGES: readonly string[] = [
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
];

function buildSlides(primary: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const src of [primary, ...CURATED_HERO_IMAGES]) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    result.push(src);
  }
  return result;
}

export function HeroVisual({ heroImage }: HeroVisualProps) {
  const slides = useMemo(() => buildSlides(heroImage), [heroImage]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timerId: number | null = null;

    const start = () => {
      if (timerId != null) return;
      timerId = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, SLIDE_INTERVAL_MS);
    };

    const stop = () => {
      if (timerId != null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [slides.length]);

  return (
    <ScrollReveal
      className="relative"
      delayMs={140}
      rootMargin="18% 0px -10% 0px"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-2xl shadow-black/40">
        {slides.map((src, index) => {
          const isActive = index === activeIndex;
          return (
            <Image
              key={src}
              src={src}
              alt="Legal professional reviewing documents in a modern office"
              width={1200}
              height={900}
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 56vw, 100vw"
              aria-hidden={!isActive}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
            />
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-border/60 bg-background/70 p-4 text-sm backdrop-blur">
          <div className="font-display text-base text-foreground">Assured confidentiality</div>
          <p className="mt-1 text-xs text-muted">
            Encrypted intake, discreet billing descriptors, and advocate-side privilege safeguards.
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
