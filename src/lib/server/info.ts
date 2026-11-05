import { WODBY_ENV_TYPE } from '$app/env/private';

export interface ServerInfo {
	node: string;
	environment: string;
	renderedAt: string;
}

// Server-only (the module is under src/lib/server), so environment variables
// and other server-side resources stay out of the browser bundle.
export function getServerInfo(): ServerInfo {
	return {
		node: process.version,
		environment: WODBY_ENV_TYPE ?? 'local',
		renderedAt: new Date().toISOString()
	};
}
