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
      label: cat.label,
      items: (cat.children ?? []).map((it) => ({ label: it.label, href: it.href })),
    })),
    propertyServicesMenu: property.map((cat, i) => ({
      id: toId(cat.label, i),
      label: cat.label,
      items: (cat.children ?? []).map((it) => ({ label: it.label, href: it.href })),
    })),
    businessIprMenu: business.map((sec, i) => ({
      id: toId(sec.label, i),
      label: sec.label,
      categories: (sec.children ?? []).map((cat, j) => ({
        id: toId(cat.label, j),
        label: cat.label,
        items: (cat.children ?? []).map((it) => ({ label: it.label, href: it.href })),
      })),
    })),
    headerServiceStripLinks: {
      left: stripLeft.map((it) => ({ label: it.label, href: it.href })),
      right: stripRight.map((it) => ({ label: it.label, href: it.href })),
    },
    serviceCategories: categories.map((it) => ({ label: it.label, href: it.href })),
    comprehensiveLegalSolutionLinks: comprehensive.map((it) => ({
      label: it.label,
      href: it.href,
    })),
    propertySuggestedLinks: suggested.map((it) => ({
      label: it.label,
      href: it.href,
      ariaLabel: it.ariaLabel ?? it.label,
    })),
  };
}
