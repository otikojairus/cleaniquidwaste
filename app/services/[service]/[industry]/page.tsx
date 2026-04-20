import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SERVICE_ORDER, getIndustry, getServiceBySlug } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, phoneHref } from "@/lib/seo";

type PageProps = {
  params: Promise<{ service: string; industry: string }>;
};

export async function generateStaticParams() {
  return SERVICE_ORDER.flatMap((service) =>
    (getServiceBySlug(service)?.industries ?? []).map((industry) => ({ service, industry: industry.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, industry: industrySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const industry = getIndustry(serviceSlug, industrySlug);

  if (!service || !industry) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${service.name} for ${industry.name}s in Canada`,
    description: `Specialized ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} sites across Canada. Licensed, scheduled, and emergency-ready.`,
    alternates: { canonical: `/services/${service.slug}/${industry.slug}` },
    openGraph: {
      title: `${service.name} for ${industry.name}s | ${SITE_NAME}`,
      description: industry.summary,
      url: absoluteUrl(`/services/${service.slug}/${industry.slug}`),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { service: serviceSlug, industry: industrySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const industry = getIndustry(serviceSlug, industrySlug);

  if (!service || !industry) {
    notFound();
  }

  return (
    <main className="frost-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${service.name} for ${industry.name}s`,
          serviceType: service.name,
          provider: { "@type": "LocalBusiness", name: SITE_NAME, telephone: EMERGENCY_PHONE_DISPLAY },
          areaServed: "Canada",
          url: absoluteUrl(`/services/${service.slug}/${industry.slug}`),
        }}
      />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <div className="text-xs uppercase tracking-[0.16em] text-[#dbe7ff]">
            <Link href="/services">Services</Link> / <Link href={`/services/${service.slug}`}>{service.name}</Link> / <span>{industry.name}</span>
          </div>
          <h1 className="mt-4">
            {service.name} for {industry.name}s in Canada
            <span>{industry.summary}</span>
          </h1>
          <p className="mt-4 max-w-3xl">
            {industry.name}s often need service plans that match operating hours, waste volume, compliance pressure, and
            the cost of downtime. This page focuses on those practical needs.
          </p>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <article className="frost-card">
            <p className="section-tag">Regulations</p>
            <h2 className="frost-title text-2xl">{service.name} regulations for {industry.name.toLowerCase()}s in Canada</h2>
            <p className="mt-4 text-sm text-slate-600">{industry.regulations}</p>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="frost-card">
              <p className="section-tag">What&apos;s Included</p>
              <h2 className="frost-title text-2xl">Service checklist for {industry.name.toLowerCase()} operators</h2>
              <div className="mt-5 grid gap-3">
                {industry.checklist.map((item) => (
                  <p key={item} className="mini-tile">
                    {item}
                  </p>
                ))}
              </div>
            </article>

            <article className="frost-card">
              <p className="section-tag">Maintenance Plans</p>
              <h2 className="frost-title text-2xl">Recurring options built around site volume and risk</h2>
              <div className="mt-5 grid gap-3">
                {industry.planOptions.map((plan) => (
                  <p key={plan} className="mini-tile">
                    {plan}
                  </p>
                ))}
              </div>
            </article>
          </div>

          <article className="frost-card cta-card">
            <p className="section-tag">CTA</p>
            <h2 className="frost-title text-2xl">Need a schedule built for your {industry.name.toLowerCase()} site?</h2>
            <p className="mt-4 text-sm text-slate-600">
              Call {EMERGENCY_PHONE_DISPLAY} and we can help build a service interval that matches your volume,
              operating hours, and site access.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={phoneHref()} className="frost-btn frost-btn-primary">
                Call Now
              </a>
              <Link href={`/services/${service.slug}`} className="frost-btn frost-btn-secondary">
                Back to {service.name}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
