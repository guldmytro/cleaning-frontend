<script lang="ts">
    import Glide from "@glidejs/glide";
    import type { CategoryArchive } from '$lib/types/category';
    import Container from "../global/Container.svelte";
    import SectionHeader from "../global/SectionHeader.svelte";
    import { page } from "$app/state";

    let category: CategoryArchive | null = $derived(page.data.categories.find((c: CategoryArchive) => c.slug === 'unterhaltsreinigung'));
    import { m } from "$lib/paraglide/messages";
    import { replaceStringWithCity } from "$lib/utils";
    import MCSlider from './MCSlider.svelte';
</script>

{#if category && Array.isArray(category.services) && category.services.length}
    <section class="maintenance-cleaning">
        <Container>
            <div class="row">
                <SectionHeader 
                    title={replaceStringWithCity(m.mcTitle(), page.data.currentCity)} 
                    description={replaceStringWithCity(m.mcSubtitle(), page.data.currentCity)}
                    maxWidths={[665, 580]}
                />
                <MCSlider services={category.services} {category} />
            </div>
        </Container>
    </section>
{/if}

<style>
    .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-1000);
    }
</style>