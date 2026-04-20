export const revalidate = 3600;

const ROBOTS_TXT = `User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://cleanliquidwaste.com/sitemap.xml
`;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
