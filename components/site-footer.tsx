import Image from "next/image";
import Link from "next/link";
import { SERVICE_ORDER, SERVICES } from "@/lib/site-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, phoneHref } from "@/lib/seo";

const CALL_HREF = phoneHref();

export function SiteFooter() {
  return (
    <footer className="frost-footer">
      <div className="frost-container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="frost-footer-brand">
              <Image
                src="/cleanliquidwaste-logo.png"
                alt={`${SITE_NAME} logo`}
                width={44}
                height={44}
                className="frost-logo-mark"
              />
              <p className="frost-footer-title">{SITE_NAME}</p>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Canada-wide liquid waste removal, industrial pumping, septic service, and drainage cleanup with 24/7 emergency response.
            </p>
            <a href={CALL_HREF} className="frost-btn frost-btn-primary mt-4">
              Call {EMERGENCY_PHONE_DISPLAY}
            </a>
          </div>

          <div>
            <p className="frost-footer-title">Services</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300">
              {SERVICE_ORDER.slice(0, 8).map((slug) => {
                const service = SERVICES[slug];
                return (
                  <li key={slug}>
                    <Link href={`/services/${slug}`} className="hover:text-white">
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="frost-footer-title">Navigation</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">Service Hubs</Link>
              </li>
              <li>
                <a href={CALL_HREF} className="hover:text-white">Emergency Intake</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
