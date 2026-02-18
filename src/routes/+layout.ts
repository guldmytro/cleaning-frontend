import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { LayoutProps } from "./types";
import { env } from "$env/dynamic/public";
const PUBLIC_DOCKER_API_URL = env.PUBLIC_DOCKER_API_URL!;
const PUBLIC_LOCAL_API_URL = env.PUBLIC_LOCAL_API_URL!;
import { browser } from "$app/environment";
import { getLocale } from "$lib/paraglide/runtime";
import { redirect } from "@sveltejs/kit";
import { localizeHref } from "$lib/paraglide/runtime";
import type { CategoryArchive } from "$lib/types/category";
import { normalizeMediaURL } from "$lib/utils";


export const load: LayoutLoad = async ({ fetch, params }) => {
    const locale = getLocale();
    let base = browser ? PUBLIC_LOCAL_API_URL : PUBLIC_DOCKER_API_URL;
    base = base.replace('locale', locale);
    const urls: string[] = [
        `${base}cities/`,
        `${base}categories/`,
    ];

    let [cities, categories] = await Promise.all(urls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(r => {
            if (!r.ok) error(r.status, r.statusText);
            return r.json();
        })));
    if (!params.city && Array.isArray(cities) && cities.length) {
        return redirect(302, localizeHref(`/${cities[0].slug}`));
    }

    const currentCity = cities.find((city: {slug: string}) => city.slug === params.city);
    const currentCityTitle = currentCity?.title || '';
    const currentCitySlug = cities.find((city: {slug: string}) => city.slug === params.city)?.slug;
    if (!currentCity) error(404, 'Page not found');

    categories = categories.map((c: CategoryArchive) => {
        return {
            slug: c.slug,
            title: c.title,
            description: c.description,
            image: normalizeMediaURL(c.image, PUBLIC_LOCAL_API_URL),
            services: c.services
        }
    })
    
    return {
        cities,
        categories,
        currentCity: currentCityTitle,
        currentCityObj: currentCity,
        currentCitySlug,
    } satisfies LayoutProps;
}