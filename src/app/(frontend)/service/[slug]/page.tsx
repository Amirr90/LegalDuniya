import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLeadForm } from "@/components/service/ServiceLeadForm";
import { Container } from "@/components/ui/Container";
import { advocatesShowcaseCopy, serviceLandingPage } from "@/content/pageCopy";
import { getAdvocates, getAllServiceSlugs, getServiceBySlug, getSiteSettings } from "@/lib/cms";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServiceBySlug(slug);
  if (!page) {
    return { title: serviceLandingPage.metadataFallbackTitle };
  }
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function ServiceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const [page, advocates, site] = await Promise.all([
    getServiceBySlug(slug),
    getAdvocates(),
    getSiteSettings(),
  ]);
  if (!page) {
    notFound();
  }

  const tel = site.contact.phone.replace(/\s/g, "");

  return (
    <>
      <section className="border-b border-border bg-surface-elevated py-12 sm:py-16">
        <Container>
          <nav className="text-xs text-muted">
            <Link href="/" className="hover:text-accent">
              {serviceLandingPage.breadcrumbHome}
            </Link>
            <span className="mx-2 text-border">/</span>
            <Link href="/#top-services" className="hover:text-accent">
              {serviceLandingPage.breadcrumbServices}
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground/80">{page.title}</span>
          </nav>
          <h1 className="mt-6 max-w-4xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{page.heroSummary}</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={page.heroImageSrc}
                alt={page.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
            <div className="lg:sticky lg:top-24">
              <ServiceLeadForm serviceTitle={page.title} serviceSlug={slug} />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            <article className="min-w-0 space-y-8">
              <p className="text-base leading-relaxed text-muted">{page.articleLead}</p>
              {page.sections.map((block) => (
                <div key={block.heading}>
                  <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{block.heading}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{block.body}</p>
                </div>
              ))}
              <p className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-xs leading-relaxed text-muted">
                {serviceLandingPage.articleDisclaimer(page.title.toLowerCase())}
              </p>
            </article>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-[radial-gradient(120%_80%_at_20%_0%,rgba(212,175,55,0.14),var(--surface-elevated))] p-6 text-center">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {serviceLandingPage.asideTitle}
                </h3>
                <p className="mt-2 text-sm text-muted">{serviceLandingPage.asideSubtitle}</p>
                <a
                  href={`tel:${tel}`}
                  className="mt-4 block font-display text-2xl font-semibold tracking-tight text-accent hover:underline"
                >
                  {site.contact.phone}
                </a>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
                >
                  {serviceLandingPage.contactFormLink}
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {advocates.length > 0 ? (
        <section className="border-t border-border bg-surface py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {serviceLandingPage.advocatesSectionTitle}
              </h2>
              <p className="mt-3 text-sm text-muted sm:text-base">{serviceLandingPage.advocatesSectionSubtitle}</p>
            </div>
            <ul className="mt-10 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advocates.map((person) => (
                <li
                  key={person.name}
                  className="card-interactive flex flex-col overflow-hidden rounded-2xl border border-border bg-background/40 hover:-translate-y-1 hover:border-accent/45"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-elevated">
                    <Image
                      src={person.imageSrc}
                      alt={`${person.name}, ${person.practice}`}
                      fill
                      sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{person.name}</h3>
                    <p className="text-xs text-muted">{person.practice}</p>
                    <Link
                      href="/contact"
                      className="mt-auto inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
                    >
                      {advocatesShowcaseCopy.cardCta}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
