<script>
    import Container from "../global/Container.svelte";
    import { page } from "$app/state";
    import { m } from "$lib/paraglide/messages";
    import Headline from "../ui/Headline.svelte";
    import Paragraph from "../ui/Paragraph.svelte";
    import CatCard from "./CatCard.svelte";
</script>

{#if Array.isArray(page.data?.categories) && page.data?.categories.length}
    <section class="categories">
        <Container>
            <div class="categories-header gr">
                <Headline title={m.catTitle()} level={2} levelStyle={2} />
                <div class="p-wrapper">
                    <Paragraph text={m.catSubtitle()} size="p" weight="400" />
                </div>
            </div>
            <ul class="cats-list">
                {#each page.data.categories as category}
                    <CatCard {category} />
                {/each}
            </ul>
        </Container>
    </section>
{/if}

<style>
    .categories-header {
        max-width: 665px;
        row-gap: var(--s-v-400);
    }

    .p-wrapper {
        max-width: 580px;
    }

    .cats-list {
        margin-top: var(--s-v-1000);
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--s-h-100);
        list-style: none;
    }

    @media (max-width: 991px) {
        .cats-list {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>