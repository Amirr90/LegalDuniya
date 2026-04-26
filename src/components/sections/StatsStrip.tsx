import { AnimatedStatValue } from "@/components/sections/AnimatedStatValue";
import { Container } from "@/components/ui/Container";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export type StatItem = { value: string; label: string };

export type StatsStripProps = {
  stats: readonly StatItem[];
};

export function StatsStrip({ stats }: StatsStripProps) {
  if (!stats.length) return null;
  return (
    <div className="border-b border-border bg-surface">
      <Container className="py-10">
        <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border/70 bg-surface-elevated/60 p-4">
              <div className="font-display text-3xl font-semibold text-accent">
                <AnimatedStatValue value={item.value} />
              </div>
              <div className="mt-1 text-sm text-muted">{item.label}</div>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </div>
  );
}
