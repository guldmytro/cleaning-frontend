import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { redirect } from '@sveltejs/kit';
import { getLocale } from '$lib/paraglide/runtime';

const redirects: Record<string, string> = {
	'/impressum': '/zuerich/legal-notice',
	'/kontakt': '/zuerich/contacts',
	'/reinigungsfirma-zuerich': '/zuerich',
	'/umzugsreinigung-zuerich': '/zuerich/services/spezialreinigung/umzugsreinigung',
	'/reinigungsfirma-berlin-gebaeudereinigung-experten-bern': '/bern'
};

const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;
	

	const pathname = event.url.pathname;

	if (redirects[pathname]) {
		const locale = getLocale();
		if (locale === 'de') throw redirect(301, redirects[pathname]);
		if (locale === 'en') throw redirect(301, '/en' + redirects[pathname]);
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

export const handle: Handle = handleParaglide;
