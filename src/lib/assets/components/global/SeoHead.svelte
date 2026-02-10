<script lang="ts">
    import type { Seo } from "$lib/types/seo";
    import { page } from "$app/state";
    import { replaceStringWithCity } from "$lib/utils";
    export let seo: Seo;
</script>

<svelte:head>
    {#if seo?.title_tag}
        <title>{replaceStringWithCity(seo.title_tag, page?.data.currentCity || '')}</title>
    {/if}

    {#if seo?.meta_description}
        <meta name="description" content={replaceStringWithCity(seo.meta_description, page?.data.currentCity || '')} />
    {/if}

    {#if seo?.robots}
        <meta name="robots" content={seo.robots} />
    {/if}

    {#if seo?.noindex}
        <meta name="robots" content="noindex" />
    {/if}

    {#if seo?.cannonical}
        <link rel="canonical" href={seo.cannonical} />
    {/if}
</svelte:head>