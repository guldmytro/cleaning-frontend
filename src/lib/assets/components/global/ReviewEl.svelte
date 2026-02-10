<script lang="ts">
    import type { Review } from "$lib/types/review";
    import Paragraph from "../ui/Paragraph.svelte";
    import Google from '$lib/assets/img/icons/google-full.png';
    import Sprite from "../ui/Sprite.svelte";
    export let review: Review;
</script>

<div class="review gr">
    <div class="review-body gr">
        <Paragraph text={review.body} lineHeight="short" weight="400" size="p" />
        <p class="review-author">{review.author}</p>
    </div>
    <a href={review.link} class="google-link">
        <img class="google-link__icon" src={Google} alt="Google" width="118" height="40" loading="lazy">
        <div class="stars">
            {#each Array(5) as r, i}
                <span class="star" class:disabled={i + 1 > review.rate}>
                    <Sprite id="star" />
                </span>
            {/each}
        </div>
    </a>
</div>

<style>
    .review {
        padding: var(--s-v-800) var(--s-h-400);
        border-radius: 10px;
        min-height: 310px;
        background-color: var(--c-white);
        row-gap: var(--s-v-600);
    }

    .review-body {
        row-gap: var(--s-v-400);
        align-self: start;
    }

    .review-author {
        font-weight: 600;
        text-transform: uppercase;
        font-size: var(--fz-button-text);
    }

    .google-link {
        display: flex;
        align-items: center;
        column-gap: 12px;
        margin-top: auto;
    }

    .google-link__icon {
        width: 59px;
    }

    .stars {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        column-gap: 1px;
    }

    .star {
        width: 15px;
        height: 15px;
    }

    .disabled {
        opacity: 0.3;
    }

    @media (max-width: 991px) {
        .review {
            min-height: 370px;
        }
    }

    @media (max-width: 575px) {
        .review {
            min-height: 350px;
        }
    }
</style>