import Image from "next/image";
import Link from "next/link";
import type { ServiceTile } from "@/content/servicePages";

const defaultImageSizes =
  "(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 42vw, 100vw";

type ServiceCatalogCardProps = {
  tile: ServiceTile;
  /** Pass tighter `sizes` when the card sits in a denser grid (e.g. home). */
  imageSizes?: string;
};

export function ServiceCatalogCard({ tile, imageSizes = defaultImageSizes }: ServiceCatalogCardProps) {
  const chromeLabel = `lexbridge.in/${tile.slug}`;

  return (
    <Link
      href={`/service/${tile.slug}`}
      className="card-interactive group flex flex-col overflow-hidden rounded-2xl border border-border bg-background/40 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-3 py-2">
        <span className="flex shrink-0 gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/90" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/90" />
        </span>
        <span className="min-w-0 truncate font-mono text-[10px] text-muted sm:text-[11px]">{chromeLabel}</span>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
        <Image
          src={tile.imageSrc}
          alt={tile.title}
          fill
          sizes={imageSizes}
          className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 text-center">
        <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
          {tile.title}
        </span>
        {tile.tagline ? <span className="text-xs text-muted">{tile.tagline}</span> : null}
      </div>
    </Link>
  );
}
