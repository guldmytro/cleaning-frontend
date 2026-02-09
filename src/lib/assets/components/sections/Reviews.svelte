<script lang="ts">
    import type { Review } from "$lib/types/review";
    import Container from "../global/Container.svelte";
    import Headline from "../ui/Headline.svelte";
    import { m } from "$lib/paraglide/messages";
    import Paragraph from "../ui/Paragraph.svelte";
    import ReviewsSlider from "../global/ReviewsSlider.svelte";

    export let reviews: Review[];
</script>

{#if Array.isArray(reviews) && reviews.length}
    <section class="reviews">
        <Container>
            <div class="reviews-row gr">
                <div class="reviews-header gr">
                    <Headline title={m.reviewsTitle()} level={2} levelStyle={2} />
                    <div class="reviews-subtitle">
                        <Paragraph text={m.reviewsSubtitle()} size="p" weight="400" />
                    </div>
                </div>
                <ReviewsSlider {reviews} />
            </div>
        </Container>
    </section>
{/if}

<style>
    .reviews-row {
        row-gap: var(--s-v-1000);
    }

    .reviews-header {
        max-width: 550px;
        row-gap: var(--s-v-400);
    }

    .reviews-subtitle {
        max-width: 480px;
    }
</style>

