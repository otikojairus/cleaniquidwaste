import type { MetadataRoute } from "next";
import { LOCATION_PAGES, SERVICE_ORDER, getServiceBySlug, getStates } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const now = new Date();

  const baseRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ];

  const serviceHubs: MetadataRoute.Sitemap = SERVICE_ORDER.map((service) => ({
    url: `${siteUrl}/services/${service}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const nearMeRoutes: MetadataRoute.Sitemap = SERVICE_ORDER.map((service) => ({
    url: `${siteUrl}/services/${service}/near-me`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.82,
  }));

  const industryRoutes: MetadataRoute.Sitemap = SERVICE_ORDER.flatMap((serviceSlug) =>
    (getServiceBySlug(serviceSlug)?.industries ?? []).map((industry) => ({
      url: `${siteUrl}/services/${serviceSlug}/${industry.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.74,
    })),
  );

  const provinceRoutes: MetadataRoute.Sitemap = getStates().flatMap((state) =>
    SERVICE_ORDER.map((service) => ({
      url: `${siteUrl}/${state.slug}/services/${service}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_PAGES.flatMap((location) =>
    SERVICE_ORDER.map((service) => ({
      url: `${siteUrl}/${location.stateSlug}/${location.citySlug}/${service}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [...baseRoutes, ...serviceHubs, ...nearMeRoutes, ...industryRoutes, ...provinceRoutes, ...locationRoutes];
}
