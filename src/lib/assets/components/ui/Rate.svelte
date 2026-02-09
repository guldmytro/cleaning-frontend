<script lang="ts">
    import Google from '$lib/assets/img/icons/google.png';
    import Sprite from './Sprite.svelte';
    export let title: string;
    export let description: string | null = null;
</script>

<div class="rate">
    <strong class="rate__level">{title}</strong>
    {#if !description}
        <div class="rate__footer">
            <img class="rate__icon" src={Google} alt="Google icon" width="36" height="36">
            <div class="stars">
                {#each Array(4) as star }
                    <div class="star">
                        <Sprite id="star" />
                    </div>
                {/each}
                <div class="star">
                    <Sprite id="star-gradient" />
                </div>
            </div>
        </div>
    {:else}
        <p class="rate__text">{description}</p>
    {/if}
</div>

<style>
    .rate {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-200);
    }

    .rate__level {
        font-size: var(--h3);
        font-weight: 600;
        line-height: 1.1;
    }

    .rate__text {
        font-size: 15px;
        line-height: 1.1;
    }

    .rate__footer {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .rate__icon {
        width: 18px;
        height: 18px;
    }

    .stars {
        display: flex;
        align-items: center;
        gap: 1px;
    }

    .star {
        width: 18px;
        height: 18px;
    }
</style>