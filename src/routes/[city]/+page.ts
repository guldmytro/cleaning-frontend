import type { PageLoad } from './$types';
import type { PageProps } from './types';
import { env } from "$env/dynamic/public";
const PUBLIC_DOCKER_API_URL = env.PUBLIC_DOCKER_API_URL!;
const PUBLIC_LOCAL_API_URL = env.PUBLIC_LOCAL_API_URL!;
import { getLocale } from '$lib/paraglide/runtime';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { normalizeMediaURL } from '$lib/utils';
import type { Result } from '$lib/types/result';


export const load: PageLoad = async ({ fetch, params }) => {
    const locale = getLocale();
    let base = browser ? PUBLIC_LOCAL_API_URL : PUBLIC_DOCKER_API_URL;
    base = base.replace('locale', locale);
    const urls: string[] = [
        `${base}reviews/`,
        `${base}results/`,
        `${base}seo/?link=/`,
    ];

    let [reviews, results, seo] = await Promise.all(urls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(r => {
            if (!r.ok) error(r.status, r.statusText);
            return r.json();
        })));
    
    results = results.map((r: Result) => {
        return {
            photo_before: normalizeMediaURL(r.photo_before || '', PUBLIC_LOCAL_API_URL),
            photo_after: normalizeMediaURL(r.photo_after, PUBLIC_LOCAL_API_URL)
        }
    });
    
    return {
        reviews,
        results,
        seo: {
            robots: seo[0]?.robots || null,
            noindex: seo[0]?.noindex || null,
            cannonical: seo[0]?.cannonical || null,
            title_tag: seo[0]?.title_tag || null,
            meta_description: seo[0]?.meta_description || null,
        }
    } satisfies PageProps;
}
