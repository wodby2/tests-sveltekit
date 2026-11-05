# SvelteKit starter for Wodby

A starter for the [Wodby SvelteKit service](https://github.com/wodby/service-sveltekit) and
[SvelteKit stack](https://github.com/wodby/stack-sveltekit).

It includes:

- [SvelteKit](https://svelte.dev/docs/kit) 3 with Svelte 5 and TypeScript
- a server `load` function and a JSON API endpoint, used during server rendering and from the browser
- a form action that works with and without JavaScript
- the [Node.js adapter](https://svelte.dev/docs/kit/adapter-node), started with `node build`
- Wodby CI build, push, deployment and a post-deployment health check
- a lightweight health endpoint at `/healthz`

SvelteKit 3 needs Node.js 22.17 or later.

## Local development

```shell
npm install
npm run dev
```

Open http://localhost:3000. Edit `src/routes/+page.svelte`; the page updates as
you save. Add a page by creating a directory with a `+page.svelte` file in
`src/routes`.

Check types and run the production build locally:

```shell
npm run check
npm run build
npm run start
```

The production server checks the `Origin` header of form submissions and,
without a proxy in front, treats every request as HTTPS. Over plain
http://localhost it therefore rejects the form with `403`. To try the
production build in a browser, run `npm run preview` instead of
`npm run start`.

## Environment variables

Variables the application reads are declared in `src/env.ts` and imported in
server code from `$app/env/private`. They are read when the server starts, not
at build time. Give each one a schema that accepts a missing value, as
`WODBY_ENV_TYPE` has: the image build runs without the runtime variables, and
SvelteKit stops a build when a declared variable without a schema is missing.

## On Wodby

The pipeline in `.wodby/pipeline.yml` installs dependencies with `npm ci`, then
the service's image build runs `npm run build`. The container starts with
`npm run start` and listens on port 3000.

Runtime variables, including the database, Redis and mail variables of linked
services, are not available during the build. Declare the ones you use in
`src/env.ts` as described above.

The Wodby service tells the Node.js adapter to take the scheme from
`X-Forwarded-Proto` and the visitor's address from `X-Forwarded-For`, so form
actions and `url.origin` work on every domain of the environment.

In a development workspace, Wodby starts Vite's development server with this
project's `vite.config.ts`. That file allows the environment's host names from
`WODBY_HOSTS`, which Vite needs to answer requests for them. SvelteKit
regenerates `.svelte-kit/` and the route types as you add files.
