import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SERVICE_ORDER, getLocationsByState, getProvinceBySlug, getServiceBySlug, getStates } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, serviceLocationKeyword } from "@/lib/seo";

type PageProps = {
  params: Promise<{ state: string; service: string }>;
};

export async function generateStaticParams() {
  return getStates().flatMap((state) => SERVICE_ORDER.map((service) => ({ state: state.slug, service })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, service: serviceSlug } = await params;
  const province = getProvinceBySlug(state);
  const service = getServiceBySlug(serviceSlug);
  const locations = getLocationsByState(state);

  if (!province || !service || locations.length === 0) {
    return { title: "Page Not Found" };
  }

  const title = `${service.name} in ${province.name}`;
  const description = `Expert ${service.name.toLowerCase()} across ${province.name}. Serving ${province.cities.slice(0, 5).join(", ")} and surrounding areas.`;

  return {
    title,
    description,
    alternates: { canonical: `/${province.slug}/services/${service.slug}` },
    keywords: [serviceLocationKeyword(service.name, province.name), `${service.name} ${province.abbr}`, ...service.secondaryKeywords],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/${province.slug}/services/${service.slug}`),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function ProvinceServicePage({ params }: PageProps) {
  const { state, service: serviceSlug } = await params;
  const province = getProvinceBySlug(state);
  const service = getServiceBySlug(serviceSlug);
  const locations = getLocationsByState(state);

  if (!province || !service || locations.length === 0) {
    notFound();
  }

  return (
    <main className="frost-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${service.name} in ${province.name}`,
          serviceType: service.name,
          provider: { "@type": "LocalBusiness", name: SITE_NAME, telephone: EMERGENCY_PHONE_DISPLAY },
          areaServed: province.name,
          url: absoluteUrl(`/${province.slug}/services/${service.slug}`),
        }}
      />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <div className="text-xs uppercase tracking-[0.16em] text-[#dbe7ff]">
            <Link href="/services">Services</Link> / <span>{province.name}</span>
          </div>
          <h1 className="mt-4">
            {service.name} in {province.name}
            <span>Trusted local experts serving {province.context}.</span>
          </h1>
          <p className="mt-4 max-w-3xl">
            {service.name} in {province.name} works best when the service plan matches local property types, climate,
            access conditions, and operating demands. Whether you manage a busy commercial site or a rural property, the
            goal is dependable service and a clear maintenance plan.
          </p>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="frost-card">
              <p className="section-tag">Across {province.name}</p>
              <h2 className="frost-title text-2xl">{service.name} across {province.name}</h2>
              <p className="mt-4 text-sm text-slate-600">
                Properties across {province.name} need dependable pumping and cleanup support that fits both routine
                maintenance and emergency response. CleanLiquidWaste is positioned around fast intake, straightforward
                scheduling, and practical follow-up planning.
              </p>
            </article>

            <article className="frost-card">
              <p className="section-tag">Commercial + Residential</p>
              <h2 className="frost-title text-2xl">Service coverage for varied property types</h2>
              <p className="mt-4 text-sm text-slate-600">
                We support commercial kitchens, industrial facilities, municipal assets, rural homes, acreages, and
                other properties in {province.name}. Licensed crews and emergency availability help when the work cannot wait.
              </p>
            </article>
          </div>

          <article className="frost-card">
            <p className="section-tag">Cities We Serve</p>
            <h2 className="frost-title text-2xl">Top cities in {province.name}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {locations.map((location) => (
                <Link key={location.citySlug} href={`/${location.stateSlug}/${location.citySlug}/${service.slug}`} className="province-pill">
                  {location.cityName}
                </Link>
              ))}
            </div>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="frost-card">
              <p className="section-tag">FAQ</p>
              <h2 className="frost-title text-2xl">Common {province.abbr} questions</h2>
              <div className="mt-5 grid gap-4">
                <div className="faq-row">
                  <h3>How often should {service.name.toLowerCase()} be scheduled in {province.name}?</h3>
                  <p>It depends on waste volume, weather, occupancy, and equipment size. High-use properties in {province.name} often need more frequent service than low-volume or seasonal sites.</p>
                </div>
                <div className="faq-row">
                  <h3>Do you offer emergency response in {province.abbr}?</h3>
                  <p>Yes. Emergency response is available for urgent jobs where overflow, backups, spills, or shutdown pressure cannot wait.</p>
                </div>
                <div className="faq-row">
                  <h3>Can you support both urban and rural properties in {province.name}?</h3>
                  <p>Yes. We support dense urban sites, smaller communities, and rural properties across {province.name}, depending on the service needed and access conditions.</p>
                </div>
              </div>
            </article>

            <article className="frost-card cta-card">
              <p className="section-tag">CTA</p>
              <h2 className="frost-title text-2xl">Need {service.name.toLowerCase()} in {province.name}?</h2>
              <p className="mt-4 text-sm text-slate-600">
                Call {EMERGENCY_PHONE_DISPLAY} to discuss your location, property type, and urgency. We can help arrange service as quickly as possible.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
