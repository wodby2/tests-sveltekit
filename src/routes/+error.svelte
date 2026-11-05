<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | SvelteKit on Wodby</title>
</svelte:head>

<main>
	<h1>{page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
	<p>{page.error?.message}</p>
	<p><a href="/">Back to the home page</a></p>
</main>
