<script lang="ts">
    import { page } from "$app/state";
    import type { CategoryDetail } from "$lib/types/category";
    import type { ServiceArchive } from "$lib/types/service";
    import Container from "../../global/Container.svelte";
    import Headline from "../../ui/Headline.svelte";
    import Paragraph from "../../ui/Paragraph.svelte";
    export let category: CategoryDetail;
    export let services: ServiceArchive[];
    import List from "../service/list/List.svelte";
</script>

<main class="category">
    <Container>
        <div class="category-row gr">
            <div class="category-header gr">
                <Headline title={category.title + ' in&nbsp;' + page.data?.currentCity} level={1} levelStyle={1} />
                <div class="p-wrapper">
                    <Paragraph text={category.description} size="p" weight="400" />
                </div>
            </div>
            <List {category} {services} />
        </div>
    </Container>
</main>

<style>
    .category {
        margin-top: 235px;
    }

    .category-row {
        row-gap: var(--s-v-1100);
    }

    .category-header {
        max-width: 590px;
        row-gap: var(--s-v-400);
        margin: 0 auto;
        text-align: center;
        justify-items: center;
    }

    .p-wrapper {
        max-width: 550px;
    }

    @media (max-width: 834px) {
        .category {
            margin-top: clamp(175px, calc(126px + 13.07vw), 235px);
        }   
    }
</style>