import type { SiteSettings } from "@/lib/cms";

/**
 * Inline style block that overrides the `:root` CSS variables defined in
 * `globals.css` based on the `SiteSettings.theme` document. Rendered server-side
 * inside the layout so it ships to the browser before first paint, eliminating
 * any flash of unthemed content.
 */
export function ThemeStyle({ settings }: { settings: SiteSettings }) {
  const t = settings.theme;
  const css = `:root{--background:${t.background};--foreground:${t.foreground};--muted:${t.muted};--surface:${t.surface};--surface-elevated:${t.surfaceElevated};--border:${t.border};--accent:${t.accent};--accent-foreground:${t.accentForeground};--ring:${t.accent};--glow:${t.glow};--accent-soft:color-mix(in srgb, ${t.accent} 14%, transparent);--glow-soft:color-mix(in srgb, ${t.glow} 22%, transparent);}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
