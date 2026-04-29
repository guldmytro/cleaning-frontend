// src/routes/sitemap.xml/+server.js

const BASE = 'https://swiss-worx.ch';

const cities = ['zuerich', 'bern', 'basel'];
const services = ['reinigung', 'umzug', 'entsorgung'];

function urlEntry(deHref, enHref, lastmod, priority = '0.8') {
  return `
  <url>
    <loc>${deHref}</loc>
    <xhtml:link rel="alternate" hreflang="de"        href="${deHref}"/>
    <xhtml:link rel="alternate" hreflang="en"        href="${enHref}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${deHref}"/>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
    <changefreq>monthly</changefreq>
  </url>`;
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  let urls = '';

  // Головна
  urls += urlEntry(`${BASE}/`, `${BASE}/en`, today, '1.0');

  // Міста
  for (const city of cities) {
    urls += urlEntry(`${BASE}/${city}`, `${BASE}/en/${city}`, today);
  }

  // Сервіси
  for (const service of services) {
    urls += urlEntry(`${BASE}/${service}`, `${BASE}/en/${service}`, today);
  }

  // Міста × Сервіси
  for (const city of cities) {
    for (const service of services) {
      urls += urlEntry(
        `${BASE}/${city}/${service}`,
        `${BASE}/en/${city}/${service}`,
        today,
        '0.6'
      );
    }
  }

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=3600'
    }
  });
}