"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { businessIprMenu, lawyerServicesMenu, navLinks, serviceCategories } from "@/content/site";

const defaultBusinessSectionId = businessIprMenu[0]?.id ?? "";
const defaultBusinessCategoryId = businessIprMenu[0]?.categories[0]?.id ?? "";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lawyerActiveId, setLawyerActiveId] = useState(lawyerServicesMenu[0]?.id ?? "");
  const [businessSectionId, setBusinessSectionId] = useState(defaultBusinessSectionId);
  const [businessCategoryId, setBusinessCategoryId] = useState(defaultBusinessCategoryId);
  const [mobileLawyerOpen, setMobileLawyerOpen] = useState(false);
  const [mobileLawyerCategoryId, setMobileLawyerCategoryId] = useState<string | null>(null);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [mobileBusinessSectionId, setMobileBusinessSectionId] = useState<string | null>(null);
  const [mobileBusinessCategoryId, setMobileBusinessCategoryId] = useState<string | null>(null);

  const activeLawyerCategory = useMemo(
    () => lawyerServicesMenu.find((c) => c.id === lawyerActiveId) ?? lawyerServicesMenu[0],
    [lawyerActiveId],
  );

  const activeBusinessSection = useMemo(
    () => businessIprMenu.find((s) => s.id === businessSectionId) ?? businessIprMenu[0],
    [businessSectionId],
  );

  const activeBusinessCategory = useMemo(() => {
    const section = activeBusinessSection;
    if (!section) return undefined;
    return (
      section.categories.find((c) => c.id === businessCategoryId) ?? section.categories[0]
    );
  }, [activeBusinessSection, businessCategoryId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      const id = window.requestAnimationFrame(() => {
        setMobileLawyerOpen(false);
        setMobileLawyerCategoryId(null);
        setMobileBusinessOpen(false);
        setMobileBusinessSectionId(null);
        setMobileBusinessCategoryId(null);
      });
      return () => window.cancelAnimationFrame(id);
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-500 ease-out ${
        scrolled
          ? "border-border bg-background/92 shadow-[0_14px_48px_-18px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "border-border/80 bg-background/80"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-surface text-accent">
            ⚖
          </span>
          <span className="hidden sm:inline">LexBridge</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground"
              aria-expanded="false"
            >
              Services
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div className="pointer-events-none absolute left-0 top-full z-50 mt-2 min-w-[220px] translate-y-1 rounded-xl border border-border bg-surface-elevated p-2 opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {serviceCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="relative group"
            onMouseLeave={() => {
              setBusinessSectionId(defaultBusinessSectionId);
              setBusinessCategoryId(defaultBusinessCategoryId);
            }}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground group-hover:text-foreground"
              aria-haspopup="true"
              aria-expanded="false"
              aria-controls="business-ipr-mega"
            >
              Business & IPR
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div
              id="business-ipr-mega"
              className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[min(calc(100vw-2rem),760px)] -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-surface-elevated opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              <div className="flex max-h-[min(75vh,520px)] min-h-0 flex-col">
                <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row">
                  <div
                    role="tablist"
                    aria-label="Business and IPR sections"
                    className="flex shrink-0 flex-row gap-0 overflow-x-auto border-border sm:w-44 sm:flex-col sm:overflow-x-visible sm:border-r sm:border-border"
                  >
                    {businessIprMenu.map((sec) => {
                      const isActive = sec.id === businessSectionId;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          id={`business-ipr-section-${sec.id}`}
                          className={`flex items-center justify-between gap-2 whitespace-nowrap border-b border-border px-3 py-2.5 text-left text-sm transition last:border-b-0 sm:border-b sm:last:border-b sm:px-4 ${
                            isActive
                              ? "bg-surface font-medium text-foreground"
                              : "text-muted hover:bg-surface/80 hover:text-foreground"
                          }`}
                          onMouseEnter={() => {
                            setBusinessSectionId(sec.id);
                            const firstCat = sec.categories[0]?.id ?? "";
                            setBusinessCategoryId(firstCat);
                          }}
                          onFocus={() => {
                            setBusinessSectionId(sec.id);
                            const firstCat = sec.categories[0]?.id ?? "";
                            setBusinessCategoryId(firstCat);
                          }}
                        >
                          <span>{sec.label}</span>
                          <span aria-hidden className="text-xs text-muted sm:inline">
                            ›
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div
                    role="tablist"
                    aria-label="Categories"
                    className="flex shrink-0 flex-row gap-0 overflow-x-auto border-border sm:w-52 sm:flex-col sm:overflow-x-visible sm:border-r sm:border-border"
                  >
                    {activeBusinessSection?.categories.map((cat) => {
                      const isActive = cat.id === businessCategoryId;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          id={`business-ipr-cat-${cat.id}`}
                          className={`flex items-center justify-between gap-2 whitespace-nowrap border-b border-border px-3 py-2.5 text-left text-sm transition last:border-b-0 sm:border-b sm:last:border-b sm:px-4 ${
                            isActive
                              ? "bg-surface font-medium text-foreground"
                              : "text-muted hover:bg-surface/80 hover:text-foreground"
                          }`}
                          onMouseEnter={() => setBusinessCategoryId(cat.id)}
                          onFocus={() => setBusinessCategoryId(cat.id)}
                        >
                          <span>{cat.label}</span>
                          <span aria-hidden className="text-xs text-muted sm:inline">
                            ›
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div
                    role="tabpanel"
                    aria-labelledby={`business-ipr-cat-${businessCategoryId}`}
                    className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-4"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      {activeBusinessCategory?.label}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {activeBusinessCategory?.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-lg px-2 py-1.5 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="shrink-0 border-t border-border bg-surface/90 px-3 py-2.5 sm:px-4">
                  <p className="text-xs text-muted">
                    Prefer guidance before you choose?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      Request a callback
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative group"
            onMouseLeave={() => setLawyerActiveId(lawyerServicesMenu[0]?.id ?? "")}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground group-hover:text-foreground"
              aria-haspopup="true"
              aria-expanded="false"
              aria-controls="lawyer-services-mega"
            >
              Lawyer services
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div
              id="lawyer-services-mega"
              className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[min(calc(100vw-2rem),680px)] -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-surface-elevated opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              <div className="flex max-h-[min(75vh,520px)] min-h-0 flex-col">
                <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row">
                  <div
                    role="tablist"
                    aria-label="Lawyer service categories"
                    className="flex shrink-0 flex-row gap-0 overflow-x-auto border-border sm:w-52 sm:flex-col sm:overflow-x-visible sm:border-r sm:border-border"
                  >
                    {lawyerServicesMenu.map((cat) => {
                      const isActive = cat.id === lawyerActiveId;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          id={`lawyer-tab-${cat.id}`}
                          className={`flex items-center justify-between gap-2 whitespace-nowrap border-b border-border px-3 py-2.5 text-left text-sm transition last:border-b-0 sm:border-b sm:last:border-b sm:px-4 ${
                            isActive
                              ? "bg-surface font-medium text-foreground"
                              : "text-muted hover:bg-surface/80 hover:text-foreground"
                          }`}
                          onMouseEnter={() => setLawyerActiveId(cat.id)}
                          onFocus={() => setLawyerActiveId(cat.id)}
                        >
                          <span>{cat.label}</span>
                          <span aria-hidden className="text-xs text-muted sm:inline">
                            ›
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div
                    role="tabpanel"
                    aria-labelledby={`lawyer-tab-${lawyerActiveId}`}
                    className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-4"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      {activeLawyerCategory?.label}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {activeLawyerCategory?.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-lg px-2 py-1.5 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="shrink-0 border-t border-border bg-surface/90 px-3 py-2.5 sm:px-4">
                  <p className="text-xs text-muted">
                    Prefer guidance before you choose?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      Request a callback
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/contact" variant="outline" className="px-4 py-2 text-xs sm:text-sm">
            Chat with lawyer
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary" className="px-4 py-2 text-xs sm:text-sm">
            Talk to lawyer
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden className="text-lg leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background md:hidden"
        >
          <Container className="flex flex-col gap-3 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {serviceCategories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-border pt-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-foreground hover:bg-surface"
                aria-expanded={mobileBusinessOpen}
                aria-controls="mobile-business-ipr"
                onClick={() =>
                  setMobileBusinessOpen((value) => {
                    const next = !value;
                    if (!next) {
                      setMobileBusinessSectionId(null);
                      setMobileBusinessCategoryId(null);
                    }
                    return next;
                  })
                }
              >
                Business & IPR
                <span aria-hidden className="text-xs text-muted">
                  {mobileBusinessOpen ? "▾" : "▸"}
                </span>
              </button>
              {mobileBusinessOpen ? (
                <div
                  id="mobile-business-ipr"
                  className="mt-1 flex flex-col gap-2 border-l-2 border-accent/25 pl-3"
                >
                  {businessIprMenu.map((sec) => {
                    const sectionExpanded = mobileBusinessSectionId === sec.id;
                    return (
                      <div key={sec.id} className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-md py-1.5 pr-1 text-left text-xs font-semibold uppercase tracking-wide text-muted hover:text-foreground"
                          aria-expanded={sectionExpanded}
                          onClick={() => {
                            setMobileBusinessSectionId((id) => (id === sec.id ? null : sec.id));
                            setMobileBusinessCategoryId(null);
                          }}
                        >
                          {sec.label}
                          <span aria-hidden className="text-[10px]">
                            {sectionExpanded ? "▾" : "▸"}
                          </span>
                        </button>
                        {sectionExpanded
                          ? sec.categories.map((cat) => {
                              const catExpanded = mobileBusinessCategoryId === cat.id;
                              return (
                                <div key={cat.id} className="flex flex-col gap-0.5 pl-1">
                                  <button
                                    type="button"
                                    className="flex w-full items-center justify-between rounded-md py-1.5 pr-1 text-left text-xs font-medium text-muted hover:text-foreground"
                                    aria-expanded={catExpanded}
                                    onClick={() =>
                                      setMobileBusinessCategoryId((id) =>
                                        id === cat.id ? null : cat.id,
                                      )
                                    }
                                  >
                                    {cat.label}
                                    <span aria-hidden className="text-[10px]">
                                      {catExpanded ? "▾" : "▸"}
                                    </span>
                                  </button>
                                  {catExpanded ? (
                                    <ul className="flex flex-col gap-0.5 pb-1">
                                      {cat.items.map((item) => (
                                        <li key={item.href}>
                                          <Link
                                            href={item.href}
                                            className="block rounded-md py-1.5 pl-1 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                                            onClick={() => setOpen(false)}
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              );
                            })
                          : null}
                      </div>
                    );
                  })}
                  <p className="text-xs text-muted">
                    Prefer guidance first?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-accent underline-offset-2 hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      Request a callback
                    </Link>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="border-t border-border pt-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-foreground hover:bg-surface"
                aria-expanded={mobileLawyerOpen}
                aria-controls="mobile-lawyer-services"
                onClick={() =>
                  setMobileLawyerOpen((value) => {
                    const next = !value;
                    if (!next) setMobileLawyerCategoryId(null);
                    return next;
                  })
                }
              >
                Lawyer services
                <span aria-hidden className="text-xs text-muted">
                  {mobileLawyerOpen ? "▾" : "▸"}
                </span>
              </button>
              {mobileLawyerOpen ? (
                <div id="mobile-lawyer-services" className="mt-1 flex flex-col gap-2 border-l-2 border-accent/25 pl-3">
                  {lawyerServicesMenu.map((cat) => {
                    const expanded = mobileLawyerCategoryId === cat.id;
                    return (
                      <div key={cat.id} className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-md py-1.5 pr-1 text-left text-xs font-semibold uppercase tracking-wide text-muted hover:text-foreground"
                          aria-expanded={expanded}
                          onClick={() =>
                            setMobileLawyerCategoryId((id) => (id === cat.id ? null : cat.id))
                          }
                        >
                          {cat.label}
                          <span aria-hidden className="text-[10px]">
                            {expanded ? "▾" : "▸"}
                          </span>
                        </button>
                        {expanded ? (
                          <ul className="flex flex-col gap-0.5 pb-1">
                            {cat.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block rounded-md py-1.5 pl-1 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })}
                  <p className="text-xs text-muted">
                    Prefer guidance first?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-accent underline-offset-2 hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      Request a callback
                    </Link>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                onClick={() => setOpen(false)}
              >
                Chat with lawyer
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
                onClick={() => setOpen(false)}
              >
                Talk to lawyer
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
