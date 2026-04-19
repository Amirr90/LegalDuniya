"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FocusEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brandName } from "@/content/pageCopy";
import {
  allServicesMenuItem,
  comprehensiveLegalSolutionLinks,
} from "@/content/servicePages";
import {
  businessIprMenu,
  contactChannels,
  lawyerServicesMenu,
  navLinks,
  propertyServicesMenu,
  propertySuggestedLinks,
  serviceCategories,
  whatsappPrefillHeader,
} from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** CTAs: WhatsApp for quick chat; `/contact` for structured intake (matches Hero). */
const headerWaChat = whatsappUrl(contactChannels.whatsappE164, whatsappPrefillHeader);

function HeaderWhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const defaultBusinessSectionId = businessIprMenu[0]?.id ?? "";
const defaultBusinessCategoryId = businessIprMenu[0]?.categories[0]?.id ?? "";
const defaultPropertyCategoryId = propertyServicesMenu[0]?.id ?? "";

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
  const [propertyActiveId, setPropertyActiveId] = useState(defaultPropertyCategoryId);
  const [mobilePropertyOpen, setMobilePropertyOpen] = useState(false);
  const [mobilePropertyCategoryId, setMobilePropertyCategoryId] = useState<string | null>(null);

  type DesktopMenuKey = "services" | "business" | "lawyer" | "property";
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<DesktopMenuKey | null>(null);
  const desktopCloseTimerRef = useRef<number | null>(null);

  const cancelDesktopMenuClose = () => {
    if (desktopCloseTimerRef.current != null) {
      window.clearTimeout(desktopCloseTimerRef.current);
      desktopCloseTimerRef.current = null;
    }
  };

  const openDesktopMenu = (key: DesktopMenuKey) => {
    cancelDesktopMenuClose();
    setDesktopMenuOpen(key);
  };

  const scheduleDesktopMenuClose = () => {
    cancelDesktopMenuClose();
    desktopCloseTimerRef.current = window.setTimeout(() => setDesktopMenuOpen(null), 140) as unknown as number;
  };

  const closeDesktopMenuNow = useCallback(() => {
    cancelDesktopMenuClose();
    setDesktopMenuOpen(null);
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    closeDesktopMenuNow();
    setOpen(false);
  }, [pathname, closeDesktopMenuNow]);

  const blurCloseDesktopMenuIfLeaving = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    scheduleDesktopMenuClose();
  };

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

  const activePropertyCategory = useMemo(
    () => propertyServicesMenu.find((c) => c.id === propertyActiveId) ?? propertyServicesMenu[0],
    [propertyActiveId],
  );

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
        setMobilePropertyOpen(false);
        setMobilePropertyCategoryId(null);
      });
      return () => window.cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (desktopCloseTimerRef.current != null) {
        window.clearTimeout(desktopCloseTimerRef.current);
        desktopCloseTimerRef.current = null;
      }
    };
  }, []);

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
              onClick={closeDesktopMenuNow}
            >
              {item.label}
            </Link>
          ))}
          <div
            className="relative group"
            onPointerEnter={() => openDesktopMenu("services")}
            onPointerLeave={scheduleDesktopMenuClose}
            onFocusCapture={() => openDesktopMenu("services")}
            onBlurCapture={blurCloseDesktopMenuIfLeaving}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground"
              aria-expanded={desktopMenuOpen === "services"}
              aria-haspopup="true"
              aria-controls="nav-services-menu"
            >
              Services
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div
              id="nav-services-menu"
              className={`absolute left-0 top-full z-50 mt-2 min-w-[min(100vw-2rem,300px)] max-w-[min(100vw-2rem,320px)] rounded-xl border border-border bg-surface-elevated p-2 shadow-xl transition ${
                desktopMenuOpen === "services"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              {serviceCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                  onClick={closeDesktopMenuNow}
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" aria-hidden />
              <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                Comprehensive legal solutions
              </p>
              <div className="max-h-[min(50vh,340px)] overflow-y-auto overscroll-contain">
                {comprehensiveLegalSolutionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                    onClick={closeDesktopMenuNow}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-1 border-t border-border pt-1">
                <Link
                  href={allServicesMenuItem.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-surface hover:text-accent"
                  onClick={closeDesktopMenuNow}
                >
                  {allServicesMenuItem.label}
                </Link>
              </div>
            </div>
          </div>

          <div
            className="relative group"
            onPointerEnter={() => openDesktopMenu("business")}
            onPointerLeave={() => {
              scheduleDesktopMenuClose();
              setBusinessSectionId(defaultBusinessSectionId);
              setBusinessCategoryId(defaultBusinessCategoryId);
            }}
            onFocusCapture={() => openDesktopMenu("business")}
            onBlurCapture={blurCloseDesktopMenuIfLeaving}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground group-hover:text-foreground"
              aria-haspopup="true"
              aria-expanded={desktopMenuOpen === "business"}
              aria-controls="business-ipr-mega"
            >
              Business & IPR
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div
              id="business-ipr-mega"
              className={`absolute left-1/2 top-full z-50 mt-2 w-[min(calc(100vw-2rem),760px)] -translate-x-1/2 rounded-xl border border-border bg-surface-elevated shadow-xl transition ${
                desktopMenuOpen === "business"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
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
                            onClick={closeDesktopMenuNow}
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
                      onClick={closeDesktopMenuNow}
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
            onPointerEnter={() => openDesktopMenu("lawyer")}
            onPointerLeave={() => {
              scheduleDesktopMenuClose();
              setLawyerActiveId(lawyerServicesMenu[0]?.id ?? "");
            }}
            onFocusCapture={() => openDesktopMenu("lawyer")}
            onBlurCapture={blurCloseDesktopMenuIfLeaving}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground group-hover:text-foreground"
              aria-haspopup="true"
              aria-expanded={desktopMenuOpen === "lawyer"}
              aria-controls="lawyer-services-mega"
            >
              Lawyer services
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div
              id="lawyer-services-mega"
              className={`absolute left-1/2 top-full z-50 mt-2 w-[min(calc(100vw-2rem),680px)] -translate-x-1/2 rounded-xl border border-border bg-surface-elevated shadow-xl transition ${
                desktopMenuOpen === "lawyer"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
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
                            onClick={closeDesktopMenuNow}
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
                      onClick={closeDesktopMenuNow}
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
            onPointerEnter={() => openDesktopMenu("property")}
            onPointerLeave={() => {
              scheduleDesktopMenuClose();
              setPropertyActiveId(defaultPropertyCategoryId);
            }}
            onFocusCapture={() => openDesktopMenu("property")}
            onBlurCapture={blurCloseDesktopMenuIfLeaving}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted transition hover:text-foreground group-hover:text-foreground"
              aria-haspopup="true"
              aria-expanded={desktopMenuOpen === "property"}
              aria-controls="property-services-mega"
            >
              Property
              <span aria-hidden className="text-xs">
                ▾
              </span>
            </button>
            <div
              id="property-services-mega"
              className={`absolute left-1/2 top-full z-50 mt-2 w-[min(calc(100vw-2rem),680px)] -translate-x-1/2 rounded-xl border border-border bg-surface-elevated shadow-xl transition ${
                desktopMenuOpen === "property"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              <div className="flex max-h-[min(75vh,520px)] min-h-0 flex-col">
                <div className="shrink-0 border-b border-border bg-surface/90 px-3 py-2.5 sm:px-4">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                    Suggested
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {propertySuggestedLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-label={item.ariaLabel}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground/90 hover:border-accent/50 hover:text-accent"
                        onClick={closeDesktopMenuNow}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row">
                  <div
                    role="tablist"
                    aria-label="Property service categories"
                    className="flex shrink-0 flex-row gap-0 overflow-x-auto border-border sm:w-52 sm:flex-col sm:overflow-x-visible sm:border-r sm:border-border"
                  >
                    {propertyServicesMenu.map((cat) => {
                      const isActive = cat.id === propertyActiveId;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          id={`property-tab-${cat.id}`}
                          className={`flex items-center justify-between gap-2 whitespace-nowrap border-b border-border px-3 py-2.5 text-left text-sm transition last:border-b-0 sm:border-b sm:last:border-b sm:px-4 ${
                            isActive
                              ? "bg-surface font-medium text-foreground"
                              : "text-muted hover:bg-surface/80 hover:text-foreground"
                          }`}
                          onMouseEnter={() => setPropertyActiveId(cat.id)}
                          onFocus={() => setPropertyActiveId(cat.id)}
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
                    aria-labelledby={`property-tab-${propertyActiveId}`}
                    className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-4"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      {activePropertyCategory?.label}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {activePropertyCategory?.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-lg px-2 py-1.5 text-sm text-foreground/90 hover:bg-surface hover:text-accent"
                            onClick={closeDesktopMenuNow}
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
                      onClick={closeDesktopMenuNow}
                    >
                      Request a callback
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href={headerWaChat} variant="outline" external className="px-4 py-2 text-xs sm:text-sm">
              Chat with lawyer
            </ButtonLink>
            <ButtonLink href="/contact" variant="primary" className="px-4 py-2 text-xs sm:text-sm">
              Talk to lawyer
            </ButtonLink>
          </div>

          <a
            href={headerWaChat}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp — opens a new chat with a prefilled message"
            aria-label={`WhatsApp — chat with ${brandName}`}
            className="inline-flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_-6px_rgba(37,211,102,0.65)] ring-2 ring-[#25D366]/30 transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_28px_-8px_rgba(37,211,102,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={closeDesktopMenuNow}
          >
            <HeaderWhatsAppGlyph className="size-[26px]" />
          </a>

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
        </div>
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
            <p className="px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Comprehensive legal solutions
            </p>
            {comprehensiveLegalSolutionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={allServicesMenuItem.href}
              className="rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-surface hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {allServicesMenuItem.label}
            </Link>

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

            <div className="border-t border-border pt-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-foreground hover:bg-surface"
                aria-expanded={mobilePropertyOpen}
                aria-controls="mobile-property-services"
                onClick={() =>
                  setMobilePropertyOpen((value) => {
                    const next = !value;
                    if (!next) setMobilePropertyCategoryId(null);
                    return next;
                  })
                }
              >
                Property
                <span aria-hidden className="text-xs text-muted">
                  {mobilePropertyOpen ? "▾" : "▸"}
                </span>
              </button>
              {mobilePropertyOpen ? (
                <div
                  id="mobile-property-services"
                  className="mt-1 flex flex-col gap-2 border-l-2 border-accent/25 pl-3"
                >
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                      Suggested
                    </p>
                    <div className="flex flex-col gap-1">
                      {propertySuggestedLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-label={item.ariaLabel}
                          className="rounded-md border border-border bg-surface px-2 py-1.5 text-center text-sm font-medium text-foreground/90 hover:border-accent/50 hover:text-accent"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {propertyServicesMenu.map((cat) => {
                    const expanded = mobilePropertyCategoryId === cat.id;
                    return (
                      <div key={cat.id} className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-md py-1.5 pr-1 text-left text-xs font-semibold uppercase tracking-wide text-muted hover:text-foreground"
                          aria-expanded={expanded}
                          onClick={() =>
                            setMobilePropertyCategoryId((id) => (id === cat.id ? null : cat.id))
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
              <a
                href={headerWaChat}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                onClick={() => setOpen(false)}
              >
                Chat with lawyer
              </a>
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
