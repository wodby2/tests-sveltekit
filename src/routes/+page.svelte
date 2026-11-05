<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	// Starts with the server-rendered value; the button replaces it with a
	// fresh one from the API endpoint.
	let info = $derived(data.info);

	async function refresh() {
		const response = await fetch('/api/info');
		info = await response.json();
	}
</script>

<svelte:head>
	<title>SvelteKit on Wodby</title>
</svelte:head>

<main>
	<h1>SvelteKit on Wodby</h1>
	<p>Edit <code>src/routes/+page.svelte</code> to start building.</p>

	<dl>
		<dt>Node.js</dt>
		<dd>{info.node}</dd>
		<dt>Environment</dt>
		<dd>{info.environment}</dd>
		<dt>Server time</dt>
		<dd>{info.renderedAt}</dd>
	</dl>

	<button type="button" onclick={refresh}>Call the API endpoint again</button>

	<form method="POST" use:enhance>
		<label>
			Your name
			<input name="name" value={form?.name ?? ''} autocomplete="off" />
		</label>
		<button type="submit">Send to the form action</button>
	</form>

	{#if form?.missing}
		<p class="error">Enter a name.</p>
	{:else if form?.greeting}
		<p class="greeting">{form.greeting}</p>
	{/if}
</main>
