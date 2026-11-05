import { getServerInfo } from '#lib/server/info.ts';
import type { RequestHandler } from './$types';

// A JSON API endpoint, called from the browser by the home page.
export const GET: RequestHandler = () =>
	Response.json(getServerInfo(), { headers: { 'Cache-Control': 'no-store' } });
