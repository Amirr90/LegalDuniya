import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
  /** When true, children are not wrapped in scroll reveal (use custom reveals inside). */
  disableReveal?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  muted = false,
  disableReveal = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 ${muted ? "bg-surface" : ""} ${className}`}
    >
      {disableReveal ? children : <ScrollReveal>{children}</ScrollReveal>}
    </section>
  );
}
