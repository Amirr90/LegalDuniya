/** Human-readable labels for `?topic=` slugs from mega menu links. */

const OVERRIDES: Record<string, string> = {
  ip: "Intellectual property",
  itr: "ITR",
  rera: "RERA",
  gst: "GST",
  posh: "POSH",
  tmt: "TMT",
  ec: "EC",
  opc: "OPC",
  llp: "LLP",
  tm: "Trademark",
};

function titleCaseSegment(segment: string): string {
  const lower = segment.toLowerCase();
  if (OVERRIDES[lower]) return OVERRIDES[lower];
  if (lower.length <= 3) return lower.toUpperCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Turn `finance-lawyers` into "Finance lawyers" style label. */
export function getContactTopicLabel(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed) return "";
  return trimmed
    .split("-")
    .filter(Boolean)
    .map((part) => titleCaseSegment(part))
    .join(" ");
}
