import { browser } from "$app/environment";
import { getLocale } from "$lib/paraglide/runtime";
import { env } from "$env/dynamic/public";
const PUBLIC_DOCKER_API_URL = env.PUBLIC_DOCKER_API_URL!;
const PUBLIC_LOCAL_API_URL = env.PUBLIC_LOCAL_API_URL!;
import { error } from "@sveltejs/kit";

import type { City } from "$lib/types/city";

const BASE = 'https://swiss-worx.ch';

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

const locale = getLocale();
let base = browser ? PUBLIC_LOCAL_API_URL : PUBLIC_DOCKER_API_URL;
base = base.replace('locale', locale);
const fetchUrls: string[] = [
    `${base}cities/`,
    `${base}categories/`,
];

let [cities, categories] = await Promise.all(fetchUrls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(r => {
        if (!r.ok) error(r.status, r.statusText);
        return r.json();
    })));

  let urls = '';

  // Головна сторінка
  for (const city of cities) {
    urls += urlEntry(`${BASE}/${city.slug}`, `${BASE}/en/${city.slug}`, today);
    urls += urlEntry(`${BASE}/${city.slug}/contacts`, `${BASE}/en/${city.slug}/contacts`, today);
  }

//   // Сервіси
//   for (const service of services) {
//     urls += urlEntry(`${BASE}/${service}`, `${BASE}/en/${service}`, today);
//   }

//   // Міста × Сервіси
//   for (const city of cities) {
//     for (const service of services) {
//       urls += urlEntry(
//         `${BASE}/${city}/${service}`,
//         `${BASE}/en/${city}/${service}`,
//         today,
//         '0.6'
//       );
//     }
//   }

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