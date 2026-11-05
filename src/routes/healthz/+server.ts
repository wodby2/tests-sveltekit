import type { RequestHandler } from './$types';

// Lightweight health endpoint for deployment checks. It touches no external
// services, so it reports whether the server itself answers requests.
export const GET: RequestHandler = () =>
	new Response('ok', {
		headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' }
	});
