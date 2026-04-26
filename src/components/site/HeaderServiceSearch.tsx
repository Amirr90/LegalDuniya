"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CHATBOT_FALLBACK_ANSWER, matchChatbotFaq } from "@/content/chatbotFaq";
import { allServicesMenuItem } from "@/content/menus";
import { searchableServiceLinks } from "@/content/servicePages";

function slugSearchBlob(href: string): string {
  const prefix = "/service/";
  if (!href.startsWith(prefix)) return "";
  const slug = href.slice(prefix.length).split("?")[0] ?? "";
  return slug.replace(/-/g, " ").toLowerCase();
}

function serviceMatchesQuery(query: string, title: string, href: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  const blob = `${title.toLowerCase()} ${slugSearchBlob(href)}`;
  return blob.includes(q);
}

/** Desktop Services dropdown: leaf links (see Header.tsx). */
const serviceMenuLinkClass =
  "block rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-surface hover:text-accent";

/** Desktop Services dropdown: “All” row (see Header.tsx). */
const allServicesLinkClass =
  "block rounded-lg px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-surface hover:text-accent";

type Props = {
  onNavigate: () => void;
  suppress?: boolean;
};

export function HeaderServiceSearch({ onNavigate, suppress = false }: Props) {
  const router = useRouter();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const baseId = useId();
  const resultsPanelId = `${baseId}-panel`;
  const resultsId = `${baseId}-results`;

  const trimmed = query.trim();
  const matches = useMemo(
    () =>
      trimmed
        ? searchableServiceLinks.filter((s) => serviceMatchesQuery(trimmed, s.title, s.href))
        : [],
    [trimmed],
  );

  const assistantText = useMemo(() => {
    if (!trimmed || matches.length > 0) return null;
    const faq = matchChatbotFaq(trimmed);
    return faq?.answer ?? CHATBOT_FALLBACK_ANSWER;
  }, [trimmed, matches.length]);

  const close = useCallback(() => {
    setResultsOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!resultsOpen) return;
    const onDoc = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root || root.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [resultsOpen, close]);

  useEffect(() => {
    if (!suppress) return;
    close();
  }, [suppress, close]);

  useEffect(() => {
    if (!resultsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resultsOpen, close]);

  const handleServiceNavigate = () => {
    onNavigate();
    close();
  };

  const handleInputBlur = () => {
    window.requestAnimationFrame(() => {
      if (!rootRef.current?.contains(document.activeElement)) {
        setResultsOpen(false);
      }
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const first = matches[0];
    if (!first) return;
    e.preventDefault();
    onNavigate();
    router.push(first.href);
    close();
  };

  return (
    <div ref={rootRef} className="relative min-w-0 w-full">
      <div className="flex min-h-11 w-full min-w-0 items-stretch overflow-hidden rounded-sm border border-border bg-background/85 shadow-[0_12px_28px_-22px_rgba(0,0,0,0.9)] transition focus-within:border-accent/50">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (!suppress) setResultsOpen(true);
          }}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoComplete="off"
          placeholder="Get help with…"
          aria-expanded={resultsOpen}
          aria-controls={resultsOpen ? resultsPanelId : undefined}
          role="combobox"
          aria-autocomplete="list"
          className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted ring-0 focus-visible:ring-0"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Focus search"
          className="grid h-11 w-12 shrink-0 place-items-center bg-accent text-accent-foreground transition hover:bg-accent/90"
          onMouseDown={(e) => {
            e.preventDefault();
            if (suppress) return;
            inputRef.current?.focus();
            setResultsOpen(true);
          }}
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {resultsOpen && !suppress ? (
        <div
          id={resultsPanelId}
          role="region"
          aria-label="Service search results"
          className="absolute left-0 right-0 top-full z-[70] mt-1 max-h-[min(70vh,420px)] overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-xl"
        >
          <div
            id={resultsId}
            className="max-h-[min(55vh,340px)] overflow-y-auto overscroll-contain p-2"
          >
            {!trimmed ? (
              <p className="px-2 py-3 text-sm text-muted">Start typing to filter all services.</p>
            ) : matches.length > 0 ? (
              <ul role="listbox" className="flex flex-col gap-0.5">
                {matches.map((item) => (
                  <li key={item.href} role="presentation">
                    <Link
                      href={item.href}
                      role="option"
                      className={serviceMenuLinkClass}
                      onClick={handleServiceNavigate}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : assistantText ? (
              <div className="rounded-md border border-border/80 bg-surface/80 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Assistant</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {assistantText}
                </p>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border px-2 py-2">
            <Link
              href={allServicesMenuItem.href}
              className={allServicesLinkClass}
              onClick={handleServiceNavigate}
            >
              {allServicesMenuItem.label}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
