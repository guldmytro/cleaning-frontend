<script lang="ts">
    import type { CategoryArchive } from "$lib/types/category";
    import Container from "../global/Container.svelte";
    import SectionHeader from "../global/SectionHeader.svelte";
    import { localizeHref } from "$lib/paraglide/runtime";
    import SP1 from '$lib/assets/img/sp1.jpg';
    import SP2 from '$lib/assets/img/sp2.jpg';
    import SP3 from '$lib/assets/img/sp3.jpg';
    import SP4 from '$lib/assets/img/sp4.jpg';
    import { m } from "$lib/paraglide/messages";
    import { replaceStringWithCity } from "$lib/utils";
    
    import { page } from "$app/state";

    let category: CategoryArchive | null = $derived(page.data.categories.find((c: CategoryArchive) => c.slug === 'spezialreinigung'));

    const images : { src: string, alt: string, width: number, height: number }[] = [
        { src: SP1, alt: 'cleaning', width: 580, height: 458 },
        { src: SP2, alt: 'cleaning', width: 580, height: 718 },
        { src: SP3, alt: 'cleaning', width: 580, height: 718 },
        { src: SP4, alt: 'cleaning', width: 580, height: 458 },
    ];
</script>

{#if category && Array.isArray(category.services) && category.services.length}
<section class="special-cleaning">
    <Container>
        <div class="row">
            <div class="special-cleaning__text">
                <SectionHeader 
                    title={replaceStringWithCity(m.scTitle(), page?.data.currentCity || '')} 
                    description={replaceStringWithCity(m.scSubtitle(), page?.data.currentCity || '')} 
                    maxWidths={[550, 550]}
                 />
                <div class="tags">
                    {#each category.services as service (service.slug)}
                        <a href={localizeHref(`/${page.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)}>{service.short_title}</a>
                    {/each}
                </div>
            </div>
            <div class="special-cleaning__gallery">
                {#each images as image (image.src)}
                    <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy">
                {/each}
            </div>
        </div>
    </Container>
</section>
{/if}

<style>
    .row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
        column-gap: 20px;
        row-gap: var(--s-v-1100);
    }

    .special-cleaning__text {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-700);
        flex-shrink: 0;
    }

    .tags {
        display: flex;
        flex-flow: row wrap;
        gap: var(--s-v-200);
        max-width: 550px;
    }

    .tags a {
        flex-shrink: 0;
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        background-color: white;
        border-radius: 400px;
        padding: var(--s-v-400);
    }

    .special-cleaning__gallery {
        columns: 2;
        gap: 10px;
        max-width: 580px;
    }

    .special-cleaning__gallery img {
        border-radius: 6px;
        object-fit: cover;
    }

    .special-cleaning__gallery img:nth-child(odd) {
        margin-bottom: 10px;
    }

    @media (max-width: 991px) {
        .row {
            flex-direction: column;
        }

        .special-cleaning__gallery {
            max-width: 100%;
        }
    }

    @media (max-width: 575px) {
        .tags a {
            padding: var(--s-v-300);
        }

        .special-cleaning__gallery img:nth-child(1),
        .special-cleaning__gallery img:nth-child(4) {
            height: 163px;
        }

        .special-cleaning__gallery img:nth-child(2),
        .special-cleaning__gallery img:nth-child(3) {
            height: 255px;
        }
    }
</style>