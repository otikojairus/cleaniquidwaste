import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getLocation, getServiceBySlug } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, EMERGENCY_PHONE_E164, SITE_NAME, absoluteUrl, phoneHref, serviceLocationKeyword } from "@/lib/seo";

type PageProps = {
  params: Promise<{ state: string; city: string; service: string }>;
};

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city, service: serviceSlug } = await params;
  const location = getLocation(state, city);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    return { title: "Page Not Found" };
  }

  const keyword = serviceLocationKeyword(service.name, location.cityName);
  const description = `Professional ${service.name.toLowerCase()} in ${location.cityName}, ${location.stateAbbr}. Serving ${location.cityName} and ${location.nearbyCities.join(", ")}.`;

  return {
    title: `${service.name} in ${location.cityName}, ${location.stateAbbr}`,
    description,
    alternates: { canonical: `/${location.stateSlug}/${location.citySlug}/${service.slug}` },
    keywords: [keyword, ...service.secondaryKeywords],
    openGraph: {
      title: `${keyword} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/${location.stateSlug}/${location.citySlug}/${service.slug}`),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function CityServicePage({ params }: PageProps) {
  const { state, city, service: serviceSlug } = await params;
  const location = getLocation(state, city);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    notFound();
  }

  return (
    <main className="frost-shell">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: SITE_NAME,
            description: `${service.name} in ${location.cityName}, ${location.stateAbbr}`,
            url: absoluteUrl(`/${location.stateSlug}/${location.citySlug}/${service.slug}`),
            telephone: EMERGENCY_PHONE_E164,
            address: {
              "@type": "PostalAddress",
              addressLocality: location.cityName,
              addressRegion: location.stateAbbr,
              addressCountry: "CA",
            },
            areaServed: { "@type": "City", name: location.cityName },
            serviceType: service.name,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `How often should ${service.name.toLowerCase()} be scheduled in ${location.cityName}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `It depends on site volume, waste type, and property use in ${location.cityName}. High-use properties usually need more frequent maintenance than low-volume sites.`,
                },
              },
            ],
          },
        ]}
      />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <div className="text-xs uppercase tracking-[0.16em] text-[#dbe7ff]">
            <Link href="/">Home</Link> / <Link href={`/services/${service.slug}`}>{service.name}</Link> / <span>{location.cityName}</span>
          </div>
          <h1 className="mt-4">
            {service.name} in {location.cityName}, {location.stateAbbr}
            <span>Local coverage for {location.cityName} and nearby communities.</span>
          </h1>
          <p className="mt-4 max-w-3xl">
            If you need {service.name.toLowerCase()} in {location.cityName}, this page explains the service, nearby
            coverage, and how to get help quickly when the work cannot wait.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={phoneHref()} className="frost-btn frost-btn-primary">
              Call {EMERGENCY_PHONE_DISPLAY}
            </a>
            <Link href={`/${location.stateSlug}/services/${service.slug}`} className="frost-btn frost-btn-ghost">
              {service.name} in {location.stateName}
            </Link>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <article className="frost-card">
            <p className="section-tag">Professional {service.name}</p>
            <h2 className="frost-title text-2xl">What the service looks like in {location.cityName}</h2>
            <p className="mt-4 text-sm text-slate-600">
              {service.whatItIs} In {location.cityName}, that means matching the job to site access, property type, and
              response timing instead of forcing a one-size-fits-all plan. Whether the issue is routine or urgent, the
              right service starts with a clear understanding of the site.
            </p>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="frost-card">
              <p className="section-tag">Who We Serve</p>
              <h2 className="frost-title text-2xl">Property types in {location.cityName}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.whoNeeds.map((item) => (
                  <p key={item} className="mini-tile">
                    {item}
                  </p>
                ))}
              </div>
            </article>

            <article className="frost-card">
              <p className="section-tag">Nearby Coverage</p>
              <h2 className="frost-title text-2xl">Fast, reliable service in {location.cityName} and surrounding areas</h2>
              <p className="mt-4 text-sm text-slate-600">
                Same-day and emergency availability may be available for {location.cityName}, {location.nearbyCities.join(", ")}, and surrounding communities. When you call, we can confirm access details and explain the likely response window.
              </p>
            </article>
          </div>

          <article className="frost-card">
            <p className="section-tag">FAQ</p>
            <h2 className="frost-title text-2xl">Local questions for {location.cityName}</h2>
            <div className="mt-5 grid gap-4">
              <div className="faq-row">
                <h3>How often should {service.name.toLowerCase()} be done in {location.cityName}?</h3>
                <p>Service frequency depends on volume, property type, and how quickly solids or waste build up. We can recommend an interval after reviewing your site in {location.cityName}.</p>
              </div>
              <div className="faq-row">
                <h3>Do you serve nearby cities around {location.cityName}?</h3>
                <p>Yes. Service may also be available in {location.nearbyCities.join(", ")} and other nearby communities, depending on scheduling and route availability.</p>
              </div>
              <div className="faq-row">
                <h3>Can I call for emergency help in {location.stateAbbr}?</h3>
                <p>Yes. Emergency intake is available 24/7. If the issue involves overflow, blockage, spill risk, or shutdown pressure, call immediately.</p>
              </div>
            </div>
          </article>

            <article className="frost-card cta-card">
              <p className="section-tag">CTA</p>
              <h2 className="frost-title text-2xl">Need {service.name.toLowerCase()} in {location.cityName}?</h2>
              <p className="mt-4 text-sm text-slate-600">
              Call {EMERGENCY_PHONE_DISPLAY} and mention {location.cityName}. We will help you understand the next step and arrange service as quickly as possible.
              </p>
            </article>
        </div>
      </section>
    </main>
  );
}
