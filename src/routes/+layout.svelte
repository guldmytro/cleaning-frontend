<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import "@glidejs/glide/dist/css/glide.core.min.css";
	import '$lib/assets/css/all.css';
    import Header from '$lib/assets/components/sections/Header.svelte';
    import Footer from '$lib/assets/components/sections/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if false}
	<div class="body-content">
		<Header cities={page.data.cities} />
		{@render children()}
	</div>
	<Footer cities={page.data.cities} />
{/if}
