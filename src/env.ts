import { defineEnvVars } from '@sveltejs/kit/env';

// Environment variables the application reads, imported in server code from
// $app/env/private. They are dynamic: read when the server starts, not inlined
// at build time. Runtime variables are not set while the image is built, so
// the schema accepts a missing value.
export const variables = defineEnvVars({
	WODBY_ENV_TYPE: {
		description: 'Wodby environment type: dev, staging, prod, test or feature',
		schema: (value) => value || undefined
	}
});
