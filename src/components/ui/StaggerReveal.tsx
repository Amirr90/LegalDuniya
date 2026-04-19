"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  /** Root element; use `ul` for semantic lists so direct children can be `li`. */
  as?: "div" | "ul" | "ol";
};

export function StaggerReveal({
  children,
  className = "",
  once = true,
  as: Tag = "div",
}: StaggerRevealProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const olRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el =
      Tag === "ul" ? ulRef.current : Tag === "ol" ? olRef.current : divRef.current;
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
      { rootMargin: "0px 0px -7% 0px", threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, Tag]);

  const cls = `stagger-reveal ${className}`.trim();

  if (Tag === "ul") {
    return (
      <ul ref={ulRef} className={cls} data-stagger-visible={visible}>
        {children}
      </ul>
    );
  }
  if (Tag === "ol") {
    return (
      <ol ref={olRef} className={cls} data-stagger-visible={visible}>
        {children}
      </ol>
    );
  }
  return (
    <div ref={divRef} className={cls} data-stagger-visible={visible}>
      {children}
    </div>
  );
}
