export const SITE_NAME = "CleanLiquidWaste";
export const DEFAULT_SITE_URL = "https://cleanliquidwaste.com";
export const EMERGENCY_PHONE_DISPLAY = "1-888-328-8990";
export const EMERGENCY_PHONE_E164 = "+18883288990";

function isLoopbackOrPrivateHost(hostname: string) {
  const normalizedHost = hostname.trim().toLowerCase();

  if (!normalizedHost) {
    return true;
  }

  if (normalizedHost === "localhost" || normalizedHost === "::1" || normalizedHost.endsWith(".localhost")) {
    return true;
  }

  if (/^127(?:\.\d{1,3}){3}$/.test(normalizedHost) || /^10(?:\.\d{1,3}){3}$/.test(normalizedHost)) {
    return true;
  }

  if (/^192\.168(?:\.\d{1,3}){2}$/.test(normalizedHost)) {
    return true;
  }

  const private172Match = normalizedHost.match(/^172\.(\d{1,3})(?:\.\d{1,3}){2}$/);

  if (private172Match) {
    const secondOctet = Number(private172Match[1]);
    if (secondOctet >= 16 && secondOctet <= 31) {
      return true;
    }
  }

  return false;
}

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol) || isLoopbackOrPrivateHost(url.hostname)) {
      return null;
    }

    url.hash = "";
    url.search = "";

    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
    normalizeSiteUrl(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ??
    DEFAULT_SITE_URL
  );
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path}`;
}

export function serviceLocationKeyword(serviceName: string, locationName: string) {
  return `${serviceName} ${locationName}`;
}

export function phoneHref(phone = EMERGENCY_PHONE_DISPLAY) {
  return `tel:${phone.replace(/[^0-9]/g, "")}`;
}
