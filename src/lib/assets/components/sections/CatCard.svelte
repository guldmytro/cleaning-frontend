<script lang="ts">
    import type { CategoryArchive } from "$lib/types/category";
    import Headline from "../ui/Headline.svelte";
    import LinkArrow from "../ui/LinkArrow.svelte";
    import Paragraph from "../ui/Paragraph.svelte";
    export let category: CategoryArchive;
    import { localizeHref } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
</script>

<li class="category gr"
    style="background: linear-gradient(180deg, rgba(21, 25, 31, 0.60) 0%, rgba(21, 25, 31, 0.85) 78.43%), url({category.image}) no-repeat center / cover">
    <div class="category-content gr">
        <Headline title={category.title} level={3} levelStyle={4} href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}`)} />
        <Paragraph text={category.description} size="p" weight="400" />
        <LinkArrow href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}`)} ariaLabel={category.title} />
    </div>
</li>

<style>
    .category {
        width: 100%;
        align-items: end;
        height: clamp(380px, calc(468.4px - 4.604vw), 430px);
        padding: var(--s-v-800) var(--s-h-400);
        color: var(--c-white);
        border-radius: 10px;
    }

    .category-content {
        row-gap: var(--s-v-300);
    }
</style>