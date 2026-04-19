import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type HeroVisualProps = {
  heroImage: string;
};

export function HeroVisual({ heroImage }: HeroVisualProps) {
  return (
    <ScrollReveal
      className="relative"
      delayMs={140}
      rootMargin="18% 0px -10% 0px"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-2xl shadow-black/40">
        <Image
          src={heroImage}
          alt="Legal professional reviewing documents in a modern office"
          width={1200}
          height={900}
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
          className="h-full w-full object-cover"
        />
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
