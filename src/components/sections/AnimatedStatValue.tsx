"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

type Parsed =
  | { kind: "count"; target: number; suffix: string }
  | { kind: "slash"; left: number; right: string }
  | { kind: "fixed"; text: string };

function parseStatValue(raw: string): Parsed {
  if (raw.endsWith("+")) {
    const target = Number.parseInt(raw.slice(0, -1), 10);
    if (!Number.isNaN(target)) return { kind: "count", target, suffix: "+" };
  }
  if (raw.endsWith("%")) {
    const target = Number.parseInt(raw.slice(0, -1), 10);
    if (!Number.isNaN(target)) return { kind: "count", target, suffix: "%" };
  }
  const slash = /^(\d+)\/(.+)$/.exec(raw);
  if (slash) {
    const left = Number.parseInt(slash[1], 10);
    if (!Number.isNaN(left)) return { kind: "slash", left, right: slash[2] };
  }
  return { kind: "fixed", text: raw };
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

const DURATION_MS = 1600;

export function AnimatedStatValue({ value }: { value: string }) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() => {
    if (parsed.kind === "fixed") return parsed.text;
    if (parsed.kind === "count") return `0${parsed.suffix}`;
    return `0/${parsed.right}`;
  });
  const [started, setStarted] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion && parsed.kind === "count") {
      setDisplay(`${parsed.target}${parsed.suffix}`);
    } else if (reducedMotion && parsed.kind === "slash") {
      setDisplay(`${parsed.left}/${parsed.right}`);
    }
  }, [parsed, reducedMotion]);

  useEffect(() => {
    if (parsed.kind === "fixed") return;

    const el = containerRef.current;
    if (!el) return;

    if (reducedMotion) {
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [parsed, reducedMotion]);

  useEffect(() => {
    if (parsed.kind === "fixed" || reducedMotion || !started) return;

    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      const t = Math.min(1, elapsed / DURATION_MS);
      const eased = easeOutCubic(t);

      if (parsed.kind === "count") {
        const n = Math.round(eased * parsed.target);
        setDisplay(`${n}${parsed.suffix}`);
      } else {
        const n = Math.round(eased * parsed.left);
        setDisplay(`${n}/${parsed.right}`);
      }

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parsed, reducedMotion, started]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {display}
    </span>
  );
}
