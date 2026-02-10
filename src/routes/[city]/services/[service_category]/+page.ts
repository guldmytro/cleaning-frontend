import type { PageLoad } from './$types';
import type { PageProps } from './types';
import { env } from "$env/dynamic/public";
const PUBLIC_DOCKER_API_URL = env.PUBLIC_DOCKER_API_URL!;
const PUBLIC_LOCAL_API_URL = env.PUBLIC_LOCAL_API_URL!;
import { getLocale } from '$lib/paraglide/runtime';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import type { ServiceArchive } from "$lib/types/service";
import { normalizeMediaURL } from '$lib/utils';


export const load: PageLoad = async ({ fetch, params }) => {
    const locale = getLocale();
    let base = browser ? PUBLIC_LOCAL_API_URL : PUBLIC_DOCKER_API_URL;
    base = base.replace('locale', locale);
    const urls: string[] = [
        `${base}categories/${params.service_category}/`,
        `${base}services/?category=${params.service_category}`,
        `${base}seo/?link=/services/${params.service_category}`,
    ];

    let [category, services, seo] = await Promise.all(urls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(r => {
            if (!r.ok) error(r.status, r.statusText);
            return r.json();
        })));

    services = services.map((s: ServiceArchive) => {
        return {
            slug: s.slug,
            short_title: s.short_title,
            image: normalizeMediaURL(s.image, PUBLIC_LOCAL_API_URL)
        }
    }) satisfies ServiceArchive[];

    return {
        category,
        services,
        seo: {
            robots: seo[0]?.robots || null,
            noindex: seo[0]?.noindex || null,
            cannonical: seo[0]?.cannonical || null,
            title_tag: seo[0]?.title_tag || null,
            meta_description: seo[0]?.meta_description || null,
        }
    } satisfies PageProps;
}
