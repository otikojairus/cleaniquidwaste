export const SITE_NAME = "CleanLiquidWaste";
export const DEFAULT_SITE_URL = "https://cleanliquidwaste.com";
export const EMERGENCY_PHONE_DISPLAY = "1-888-328-8990";
export const EMERGENCY_PHONE_E164 = "+18883288990";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
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
