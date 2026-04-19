"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay after the element intersects (ms). */
  delayMs?: number;
  /** Passed to IntersectionObserver (e.g. earlier trigger above the fold). */
  rootMargin?: string;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  rootMargin = "0px 0px -5% 0px",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin, threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`.trim()}
      data-visible={visible}
      style={{ transitionDelay: visible ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}
