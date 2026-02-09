<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import "@glidejs/glide/dist/css/glide.core.min.css";
	import '$lib/assets/css/all.css';
    import Header from '$lib/assets/components/sections/Header.svelte';
    import Footer from '$lib/assets/components/sections/Footer.svelte';

	let { children } = $props();

	import { browser } from '$app/environment';
	let enabled = $state(false);
	if (browser) {
		if (localStorage.getItem('enabled') === 'true') {
			enabled = true;
		}
		if (page.url.searchParams.get('enabled') === 'true') {
			localStorage.setItem('enabled', 'true');
			enabled = true;
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if enabled}
	<div class="body-content">
		<Header cities={page.data.cities} />
		{@render children()}
	</div>
	<Footer cities={page.data.cities} />
{/if}
