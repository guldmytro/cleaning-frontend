<script lang="ts">
    import type { ServiceArchive } from "$lib/types/service";
    import type { CategoryDetail } from "$lib/types/category";
    import Card from "./Card.svelte";
    export let services: ServiceArchive[];
    export let category: CategoryDetail;
</script>

{#if Array.isArray(services) && services.length}
    <ul class="services-list">
        {#each services as service (service.slug)}
            <Card {service} {category} />
        {/each}
    </ul>
{/if}

<style>
    .services-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--s-h-100);
    }

    @media (max-width: 834px) {
        .services-list {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>