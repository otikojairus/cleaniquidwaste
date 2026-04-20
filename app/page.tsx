import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { FEATURED_CITIES, PROVINCES, SERVICE_ORDER, SERVICES } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, phoneHref } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Canada's Trusted Liquid Waste Removal & Industrial Pumping Service",
  description:
    "Licensed liquid waste removal, grease trap cleaning, septic pumping, hydrovac, and vacuum truck services across Canada for commercial and residential properties.",
  alternates: { canonical: "/" },
  keywords: [
    "liquid waste removal canada",
    "vacuum truck service canada",
    "septic tank pumping canada",
    "grease trap cleaning canada",
  ],
  openGraph: {
    title: `${SITE_NAME} | Liquid Waste Removal & Vacuum Truck Services Canada`,
    description:
      "Canada-wide liquid waste removal for grease traps, septic pumping, hydrovac, industrial tank cleaning, and drainage maintenance.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    telephone: EMERGENCY_PHONE_DISPLAY,
  };

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CleanLiquidWaste Services",
    itemListElement: SERVICE_ORDER.map((slug, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: SERVICES[slug].name,
      url: absoluteUrl(`/services/${slug}`),
    })),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={organizationSchema} />
      <JsonLd data={serviceListSchema} />

      <section className="frost-hero frost-section">
        <div className="frost-container relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="frost-kicker">Licensed. Insured. 24/7 Emergency Response.</p>
            <h1>
              Canada&apos;s trusted liquid waste removal and industrial pumping service
            </h1>
            <p className="mt-5 max-w-2xl">
              CleanLiquidWaste helps commercial sites, municipalities, industrial facilities, and residential properties
              stay ahead of backups, sludge buildup, spills, and drainage failures with direct scheduling and clear
              service planning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={phoneHref()} className="frost-btn frost-btn-primary">
                Call Now
              </a>
              <a href={phoneHref()} className="frost-btn frost-btn-ghost">
                Call {EMERGENCY_PHONE_DISPLAY}
              </a>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="hero-stat">
                <strong>8</strong>
                <span>core services</span>
              </div>
              <div className="hero-stat">
                <strong>13</strong>
                <span>provinces & territories</span>
              </div>
              <div className="hero-stat">
                <strong>24/7</strong>
                <span>emergency availability</span>
              </div>
            </div>
          </div>

          <div className="hero-feature-panel">
            <p className="frost-chip frost-chip-dark">Why CleanLiquidWaste</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Modern response for messy, time-sensitive jobs.</h2>
            <div className="mt-5 grid gap-3 text-sm text-sky-50">
              <div className="feature-pill">Licensed & insured crews</div>
              <div className="feature-pill">Commercial + residential coverage</div>
              <div className="feature-pill">Emergency dispatch across Canada</div>
              <div className="feature-pill">Clear maintenance planning after every visit</div>
            </div>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container">
          <div className="section-heading">
            <p className="section-tag">Our Services</p>
            <h2 className="frost-title">The services businesses, municipalities, and property owners call for when waste buildup, drainage problems, or urgent cleanup cannot wait.</h2>
          </div>
          <div className="frost-grid frost-cards-4 mt-8">
            {SERVICE_ORDER.map((slug) => {
              const service = SERVICES[slug];

              return (
                <article key={slug} className="frost-card service-card">
                  <p className="frost-chip">{service.clusterLabel}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{service.name}</h3>
                  <p className="mt-3 text-sm text-slate-600">{service.shortDescription}</p>
                  <Link href={`/services/${service.slug}`} className="inline-link mt-5">
                    Learn more about {service.name}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="frost-section pt-0">
        <div className="frost-container">
          <div className="frost-highlight">
            <div className="section-heading">
              <p className="section-tag">Service Areas</p>
              <h2 className="frost-title text-2xl">Canada-wide coverage, from dense metros to rural properties and remote sites.</h2>
            </div>
            <p className="frost-subtitle">
              Whether you manage a busy commercial property, a rural home, an industrial site, or a municipal system,
              CleanLiquidWaste is positioned to help across all 13 provinces and territories.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {PROVINCES.map((province) => (
                <Link key={province.slug} href={`/${province.slug}/services/grease-trap-cleaning`} className="province-pill">
                  {province.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="frost-section pt-0">
        <div className="frost-container grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="frost-card">
            <p className="section-tag">Popular Cities</p>
            <h2 className="frost-title text-2xl">Local service in major Canadian markets</h2>
            <p className="mt-3 text-sm text-slate-600">
              From large urban service areas to surrounding communities, we help customers book the right pumping,
              cleaning, or excavation service without delays.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {FEATURED_CITIES.map((city) => (
                <p key={city} className="mini-tile">
                  {city}
                </p>
              ))}
            </div>
          </div>

          <div className="frost-card">
            <p className="section-tag">FAQ</p>
            <h2 className="frost-title text-2xl">Questions people ask before they call</h2>
            <div className="mt-5 grid gap-4">
              <div className="faq-row">
                <h3>What services do you offer?</h3>
                <p>We cover grease trap cleaning, wash bay cleaning, septic and holding tank pumping, vacuum truck work, hydrovac excavation, industrial tank cleaning, catch basin cleaning, and storm drain cleaning.</p>
              </div>
              <div className="faq-row">
                <h3>Do you serve residential clients?</h3>
                <p>Yes. Septic and holding tank pumping is available for homes, acreages, cottages, and other properties that need scheduled or urgent service.</p>
              </div>
              <div className="faq-row">
                <h3>Do you offer emergency service?</h3>
                <p>Yes. If you are dealing with an overflow, backup, spill, or critical drainage issue, call now and our team will help arrange the fastest next step for your location.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
