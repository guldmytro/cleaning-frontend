<script lang="ts">
    import type { CategoryArchive } from "$lib/types/category";
    import Headline from "../ui/Headline.svelte";
    import LinkArrow from "../ui/LinkArrow.svelte";
    import Paragraph from "../ui/Paragraph.svelte";
    export let category: CategoryArchive;
    import { localizeHref } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
</script>

<li class="category gr">
    <img src={category.image} alt={category.title} loading="lazy">
    <div class="category-content gr">
        <Headline title={category.title} level={3} levelStyle={4} href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}`)} />
        <Paragraph text={category.description} size="p" weight="400" />
        <LinkArrow href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}`)} ariaLabel={category.title} />
    </div>
</li>

<style>
    .category {
        position: relative;
        width: 100%;
        align-items: end;
        height: clamp(380px, calc(468.4px - 4.604vw), 430px);
        padding: var(--s-v-800) var(--s-h-400);
        color: var(--c-white);
        border-radius: 10px;
        overflow: hidden;
        isolation: isolate;
    }

    .category::after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(21, 25, 31, 0.60) 0%, rgba(21, 25, 31, 0.85) 78.43%);
        z-index: 1;
    }

    .category img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
        transition: transform 800ms ease;
    }

    .category:hover img {
        transform: scale(1.1);
    }

    :global(.category.gr .headline__link) {
        position: relative;
    }

    :global(.category.gr .headline__link::after) {
        position: absolute;
        display: block;
        content: '';
        top: -9999px;
        left: -9999px;
        bottom: -9999px;
        right: -9999px;
    }

    .category-content {
        row-gap: var(--s-v-300);
        position: relative;
        z-index: 2;
    }
</style>