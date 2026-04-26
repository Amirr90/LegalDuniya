import { getMenuTree } from "@/lib/cms";
import type {
  BusinessIprSection,
  LawyerServicesCategory,
  PropertySuggestedLink,
} from "@/content/site";
import type { HeaderServiceStripLink, ServiceNavLink } from "@/content/menus";

function toId(label: string, idx: number): string {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `n-${idx}`;
}

function toMenuLabelCase(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      if (word === "ipr") return "IPR";
      if (word === "gst") return "GST";
      if (word === "iec") return "IEC";
      if (word === "msme") return "MSME";
      if (word === "roc") return "ROC";
      if (word === "llp") return "LLP";
      if (word === "cbi") return "CBI";
      return `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`;
    })
    .join(" ");
}

export type HeaderMenusData = {
  lawyerServicesMenu: LawyerServicesCategory[];
  propertyServicesMenu: LawyerServicesCategory[];
  businessIprMenu: BusinessIprSection[];
  headerServiceStripLinks: {
    left: HeaderServiceStripLink[];
    right: HeaderServiceStripLink[];
  };
  serviceCategories: ServiceNavLink[];
  comprehensiveLegalSolutionLinks: ServiceNavLink[];
  propertySuggestedLinks: PropertySuggestedLink[];
};

export async function getHeaderMenus(): Promise<HeaderMenusData> {
  const [
    lawyer,
    property,
    business,
    stripLeft,
    stripRight,
    categories,
    comprehensive,
    suggested,
  ] = await Promise.all([
    getMenuTree("lawyerServices"),
    getMenuTree("propertyServices"),
    getMenuTree("businessIpr"),
    getMenuTree("headerStripLeft"),
    getMenuTree("headerStripRight"),
    getMenuTree("serviceCategories"),
    getMenuTree("comprehensiveLegalSolutions"),
    getMenuTree("propertySuggested"),
  ]);

  return {
    lawyerServicesMenu: lawyer.map((cat, i) => ({
      id: toId(cat.label, i),
      label: toMenuLabelCase(cat.label),
      items: (cat.children ?? []).map((it) => ({
        label: toMenuLabelCase(it.label),
        href: it.href,
      })),
    })),
    propertyServicesMenu: property.map((cat, i) => ({
      id: toId(cat.label, i),
      label: toMenuLabelCase(cat.label),
      items: (cat.children ?? []).map((it) => ({
        label: toMenuLabelCase(it.label),
        href: it.href,
      })),
    })),
    businessIprMenu: business.map((sec, i) => ({
      id: toId(sec.label, i),
      label: toMenuLabelCase(sec.label),
      categories: (sec.children ?? []).map((cat, j) => ({
        id: toId(cat.label, j),
        label: toMenuLabelCase(cat.label),
        items: (cat.children ?? []).map((it) => ({
          label: toMenuLabelCase(it.label),
          href: it.href,
        })),
      })),
    })),
    headerServiceStripLinks: {
      left: stripLeft.map((it) => ({ label: toMenuLabelCase(it.label), href: it.href })),
      right: stripRight.map((it) => ({ label: toMenuLabelCase(it.label), href: it.href })),
    },
    serviceCategories: categories.map((it) => ({ label: toMenuLabelCase(it.label), href: it.href })),
    comprehensiveLegalSolutionLinks: comprehensive.map((it) => ({
      label: toMenuLabelCase(it.label),
      href: it.href,
    })),
    propertySuggestedLinks: suggested.map((it) => ({
      label: toMenuLabelCase(it.label),
      href: it.href,
      ariaLabel: toMenuLabelCase(it.ariaLabel ?? it.label),
    })),
  };
}
