import Image from "next/image";
import Link from "next/link";
import type { ServiceTile } from "@/content/servicePages";

const defaultImageSizes =
  "(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 42vw, 100vw";

/** Minimal scales — legal cue, stays small for a modern UI. */
function LegalBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18" />
      <path d="M5 9h14" />
      <path d="M8 9 7 17h4L9 9" />
      <path d="M15 9l-1 8h4l-1-8" />
      <path d="M5 20h14" />
    </svg>
  );
}

type ServiceCatalogCardProps = {
  tile: ServiceTile;
  /** Pass tighter `sizes` when the card sits in a denser grid (e.g. home). */
  imageSizes?: string;
};

export function ServiceCatalogCard({ tile, imageSizes = defaultImageSizes }: ServiceCatalogCardProps) {
  const label = tile.tagline ? `${tile.title}, ${tile.tagline}` : tile.title;

  return (
    <Link
      href={`/service/${tile.slug}`}
      aria-label={label}
      className="card-interactive group flex flex-col overflow-hidden rounded-2xl border border-border/90 bg-surface-elevated/90 shadow-lg shadow-black/25 ring-1 ring-white/[0.04] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/45 hover:bg-surface-elevated hover:shadow-xl hover:shadow-black/35"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={tile.imageSrc}
          alt=""
          fill
          sizes={imageSizes}
          className="object-cover object-center transition duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-elevated/90 via-transparent to-black/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -11deg,
              transparent,
              transparent 6px,
              var(--glow) 6px,
              var(--glow) 7px
            )`,
          }}
          aria-hidden
        />
      </div>

      <div className="relative border-t border-border/80 bg-surface-elevated/95 px-4 pb-4 pt-3 backdrop-blur-md sm:px-5 sm:pb-5 sm:pt-4">
        <div
          className="absolute left-4 right-4 top-0 h-px -translate-y-px bg-gradient-to-r from-transparent via-accent/80 to-transparent sm:left-5 sm:right-5"
          aria-hidden
        />
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/20">
            <LegalBadgeIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-glow/90 sm:text-[11px]">
              Legal service
            </p>
            <h3 className="font-display mt-1.5 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-lg">
              {tile.title}
            </h3>
            {tile.tagline ? (
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{tile.tagline}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
