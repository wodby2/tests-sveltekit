import { fail } from '@sveltejs/kit';
import { getServerInfo } from '#lib/server/info.ts';
import type { Actions, PageServerLoad } from './$types';

// Runs on the server for the first page load and for client-side navigations.
export const load: PageServerLoad = () => ({
	info: getServerInfo()
});

export const actions = {
	// A form action: works without JavaScript, and use:enhance submits it
	// without a full page reload when JavaScript is available.
	default: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		if (!name) {
			return fail(400, { name, missing: true });
		}
		return { greeting: `Hello, ${name}!` };
	}
} satisfies Actions;
