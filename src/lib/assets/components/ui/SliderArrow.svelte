<script lang="ts">
    import Sprite from "./Sprite.svelte";

    export let direction: 'left' | 'right';
    export let ariaLabel: string;
</script>

<span class="slider-arrow {direction}" aria-label={ariaLabel}>
    <Sprite id="arrow-corner" />
</span>

<style>
    .slider-arrow {
        display: block;
        width: 48px;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--c-accent);
        border: none;
        color: var(--c-white);
        transition: background-color 180ms ease;
        will-change: background-color;
    }

    .left {
        transform: scaleX(-1);
    }

    .slider-arrow:hover {
        background-color: var(--c-accent-hover);
    }
</style>