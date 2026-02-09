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
        `${base}services/${params.service}/`,
        `${base}reviews/`,
    ];

    const [service, reviews] = await Promise.all(urls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(r => {
            if (!r.ok) error(r.status, r.statusText);
            return r.json();
        })));

    if (service?.category?.slug !== params.service_category) error(404, 'Page not found');
    service.image = normalizeMediaURL(service.image, PUBLIC_LOCAL_API_URL);
    
    service.results = service?.results.map((result: Result) => {
        return {
            photo_before: normalizeMediaURL(result?.photo_before || '', PUBLIC_LOCAL_API_URL),
            photo_after: normalizeMediaURL(result?.photo_after || '', PUBLIC_LOCAL_API_URL),
        }
    }) satisfies Result[];
    
    return {
        service,
        reviews
    } satisfies PageProps;
}
