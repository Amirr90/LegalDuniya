"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type HeroVisualProps = {
  heroImage: string;
};

export function HeroVisual({ heroImage }: HeroVisualProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const n = (center - vh * 0.5) / vh;
      setShift(n * 14);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ScrollReveal
      className="relative"
      delayMs={140}
      rootMargin="18% 0px -10% 0px"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl" aria-hidden />
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-2xl shadow-black/40"
      >
        <Image
          src={heroImage}
          alt="Legal professional reviewing documents in a modern office"
          width={1200}
          height={900}
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
          className="h-full w-full object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${shift}px, 0) scale(1.03)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
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
