import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LOCATION_PAGES, SERVICE_ORDER, SERVICES } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, phoneHref } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Liquid Waste Services",
  description:
    "Browse CleanLiquidWaste services for grease traps, wash bays, septic pumping, vacuum truck work, hydrovac, industrial tank cleaning, and drainage maintenance.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${SITE_NAME} Services`,
    description: "Browse CleanLiquidWaste services across grease trap cleaning, septic pumping, hydrovac, vacuum truck work, and drainage maintenance.",
    url: absoluteUrl("/services"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Liquid Waste Service Hubs",
    itemListElement: SERVICE_ORDER.map((slug, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: SERVICES[slug].name,
      url: absoluteUrl(`/services/${slug}`),
    })),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={schema} />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <p className="frost-kicker">Choose the service that matches the waste stream, site type, and urgency.</p>
          <h1>
            CleanLiquidWaste services
            <span>Find the right pumping, cleaning, excavation, or drainage service for your property, facility, or project.</span>
          </h1>
          <p className="mt-4 max-w-3xl">
            Whether you need scheduled maintenance, one-time cleanup, or urgent response, this page helps you go straight
            to the service that fits the job.
          </p>
          <a href={phoneHref()} className="frost-btn frost-btn-primary mt-6">
            Call {EMERGENCY_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container">
          <div className="section-heading">
            <p className="section-tag">All Services</p>
            <h2 className="frost-title">Professional liquid waste, industrial pumping, hydrovac, and drainage services across Canada.</h2>
          </div>
          <p className="frost-subtitle">
            We support commercial, residential, municipal, and industrial work in {LOCATION_PAGES.length} major city
            markets across Canada.
          </p>

          <div className="frost-grid frost-cards-4 mt-8">
            {SERVICE_ORDER.map((slug) => {
              const service = SERVICES[slug];

              return (
                <article key={slug} className="frost-card service-card">
                  <p className="frost-chip">{service.clusterLabel}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{service.name}</h3>
                  <p className="mt-3 text-sm text-slate-600">{service.shortDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={`/services/${slug}`} className="frost-btn frost-btn-primary">
                      View Service
                    </Link>
                    <Link href={`/services/${slug}/near-me`} className="frost-btn frost-btn-secondary">
                      Find Near You
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
