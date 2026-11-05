import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Host names the development server answers for. Wodby sets WODBY_HOSTS to a
// JSON array of the environment's domains and WODBY_APP_SERVICE_NAME to the
// internal service name. Vite always allows localhost and IP addresses.
function allowedHosts(): string[] {
	const hosts: string[] = [];
	try {
		const parsed: unknown = JSON.parse(process.env.WODBY_HOSTS || '[]');
		if (Array.isArray(parsed)) {
			hosts.push(...parsed.filter((host): host is string => typeof host === 'string'));
		}
	} catch {
		console.warn('WODBY_HOSTS is not a JSON array; ignoring it');
	}
	if (process.env.WODBY_APP_SERVICE_NAME) {
		hosts.push(process.env.WODBY_APP_SERVICE_NAME);
	}
	return hosts;
}

export default defineConfig({
	server: {
		port: 3000,
		allowedHosts: allowedHosts()
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// A standalone Node.js server in build/, started with `node build`.
			adapter: adapter()
		})
	]
});
