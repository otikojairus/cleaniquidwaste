import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PROVINCES, SERVICE_ORDER, getServiceBySlug } from "@/lib/site-data";
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
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} in Canada`,
    description: `${service.shortDescription} Licensed, insured, and 24/7 emergency service across Canada. Call ${EMERGENCY_PHONE_DISPLAY}.`,
    alternates: { canonical: `/services/${service.slug}` },
    keywords: [service.name, ...service.secondaryKeywords],
    openGraph: {
      title: `${service.name} in Canada | ${SITE_NAME}`,
      description: service.shortDescription,
      url: absoluteUrl(`/services/${service.slug}`),
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in Canada`,
    serviceType: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: EMERGENCY_PHONE_DISPLAY,
      url: absoluteUrl("/"),
    },
    areaServed: "Canada",
    url: absoluteUrl(`/services/${service.slug}`),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={schema} />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <p className="frost-kicker">{service.heroPrimary}</p>
          <h1>
            {service.name} in Canada
            <span>{service.heroSecondary}</span>
          </h1>
          <p className="mt-4 max-w-3xl">
            <strong>{service.name}</strong> is one of the core CleanLiquidWaste service lines across Canada. {service.whatItIs}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={phoneHref()} className="frost-btn frost-btn-primary">
              Call Now
            </a>
            <Link href={`/services/${service.slug}/near-me`} className="frost-btn frost-btn-ghost">
              Find {service.name} Near Me
            </Link>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <div className="frost-highlight">
            <p className="section-tag">What It Is</p>
            <h2 className="frost-title text-2xl">What this service includes and why it matters.</h2>
            <p className="frost-subtitle">{service.whatItIs}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="frost-card">
              <p className="section-tag">Who Needs It</p>
              <h2 className="frost-title text-2xl">Common property and industry fit</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.whoNeeds.map((item) => (
                  <p key={item} className="mini-tile">
                    {item}
                  </p>
                ))}
              </div>
            </article>

            <article className="frost-card">
              <p className="section-tag">Why Choose Us</p>
              <h2 className="frost-title text-2xl">Fast response, clear communication, and service you can plan around.</h2>
              <p className="mt-4 text-sm text-slate-600">{service.whyChoose}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <p className="mini-tile">Licensed & insured</p>
                <p className="mini-tile">24/7 emergency response</p>
                <p className="mini-tile">Commercial + residential support</p>
                <p className="mini-tile">Canada-wide coverage model</p>
              </div>
            </article>
          </div>

          <div className="frost-card">
            <p className="section-tag">Our Process</p>
            <h2 className="frost-title text-2xl">How {service.name.toLowerCase()} jobs move from intake to completion</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {service.processSteps.map((step, index) => (
                <article key={step} className="step-card">
                  <span className="step-index">0{index + 1}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="frost-card">
            <p className="section-tag">Service Areas</p>
            <h2 className="frost-title text-2xl">Where we provide {service.name.toLowerCase()} across Canada</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROVINCES.map((province) => (
                <Link key={province.slug} href={`/${province.slug}/services/${service.slug}`} className="province-pill">
                  {service.name} in {province.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="frost-card">
              <p className="section-tag">FAQ</p>
              <h2 className="frost-title text-2xl">Frequently asked questions</h2>
              <div className="mt-5 grid gap-4">
                {service.faqs.map((faq) => (
                  <div key={faq.q} className="faq-row">
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="frost-card cta-card">
              <p className="section-tag">Next Step</p>
              <h2 className="frost-title text-2xl">Need {service.name.toLowerCase()} now?</h2>
              <p className="mt-4 text-sm text-slate-600">
                Call {EMERGENCY_PHONE_DISPLAY} to speak with our team about your location, property type, and urgency.
                We will help you move forward quickly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={phoneHref()} className="frost-btn frost-btn-primary">
                  Call Now
                </a>
                {service.industries[0] ? (
                  <Link href={`/services/${service.slug}/${service.industries[0].slug}`} className="frost-btn frost-btn-secondary">
                    Industry Details
                  </Link>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
