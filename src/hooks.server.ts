import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { redirect } from '@sveltejs/kit';
import { getLocale } from '$lib/paraglide/runtime';

const redirects: Record<string, string> = {
	'/impressum': '/zuerich/legal-notice',
	'/kontakt': '/zuerich/contacts',
	'/reinigungsfirma-zuerich': '/zuerich',
	'/umzugsreinigung-zuerich': '/zuerich/services/spezialreinigung/umzugsreinigung',
	'/reinigungsfirma-berlin-gebaeudereinigung-experten-bern': '/bern',
	'/en/impressum': '/en/zuerich/legal-notice',
	'/en/kontakt': '/en/zuerich/contacts',
	'/en/reinigungsfirma-zuerich': '/en/zuerich',
	'/en/umzugsreinigung-zuerich': '/en/zuerich/services/spezialreinigung/umzugsreinigung',
	'/en/reinigungsfirma-berlin-gebaeudereinigung-experten-bern': '/en/bern'
};

const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;
	

	const pathname = event.url.pathname;

	if (redirects[pathname]) {
		throw redirect(301, redirects[pathname]);
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

export const handle: Handle = handleParaglide;
