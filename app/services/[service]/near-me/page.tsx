import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { FEATURED_CITIES, LOCATION_PAGES, SERVICE_ORDER, getServiceBySlug } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, phoneHref } from "@/lib/seo";

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return SERVICE_ORDER.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${service.name} Near Me`,
    description: `Looking for ${service.name.toLowerCase()} near you? CleanLiquidWaste serves major Canadian cities with licensed, 24/7 support.`,
    alternates: { canonical: `/services/${service.slug}/near-me` },
    openGraph: {
      title: `${service.name} Near Me | ${SITE_NAME}`,
      description: `Find local ${service.name.toLowerCase()} coverage across Canada.`,
      url: absoluteUrl(`/services/${service.slug}/near-me`),
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function NearMePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const majorLocations = LOCATION_PAGES.filter((location) => FEATURED_CITIES.includes(location.cityName));

  return (
    <main className="frost-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `How do I find ${service.name.toLowerCase()} near me?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Call ${EMERGENCY_PHONE_DISPLAY} and share your city, site type, and urgency. Our team can help confirm availability for ${service.name.toLowerCase()} across Canada.`,
              },
            },
          ],
        }}
      />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <p className="frost-kicker">{service.name} near me</p>
          <h1>
            Find local {service.name.toLowerCase()} anywhere in Canada
            <span>Fast local help for commercial sites, residential properties, municipal systems, and industrial work.</span>
          </h1>
          <p className="mt-4 max-w-3xl">
            If you are searching for {service.name.toLowerCase()} near you, the fastest path is to call with your city,
            site type, and the issue you are dealing with. We can help confirm availability and explain the right next step.
          </p>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <div className="frost-card">
            <p className="section-tag">How It Works</p>
            <h2 className="frost-title text-2xl">What to have ready when you call</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <p className="mini-tile">Your city and province</p>
              <p className="mini-tile">The service you think you need</p>
              <p className="mini-tile">Any overflow, odour, or access issue</p>
              <p className="mini-tile">Whether the job is routine or urgent</p>
            </div>
          </div>

          <div className="frost-card">
            <p className="section-tag">Major Cities</p>
            <h2 className="frost-title text-2xl">High-priority Canadian markets</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {majorLocations.map((location) => (
                <Link key={`${location.stateSlug}-${location.citySlug}`} href={`/${location.stateSlug}/${location.citySlug}/${service.slug}`} className="province-pill">
                  {location.cityName}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="frost-card">
              <p className="section-tag">Why Local Matters</p>
              <h2 className="frost-title text-2xl">Better response, better planning, fewer surprises</h2>
              <p className="mt-4 text-sm text-slate-600">
                Local service matters because access, disposal planning, climate, and property conditions change across
                Canada. Working with a team that understands regional service needs helps reduce delays and confusion.
              </p>
            </article>

            <article className="frost-card cta-card">
              <p className="section-tag">Call Now</p>
              <h2 className="frost-title text-2xl">Need {service.name.toLowerCase()} near you today?</h2>
              <p className="mt-4 text-sm text-slate-600">
                Call {EMERGENCY_PHONE_DISPLAY} and we will confirm coverage, explain what to expect, and help arrange the next available service.
              </p>
              <a href={phoneHref()} className="frost-btn frost-btn-primary mt-6">
                Call Now
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
