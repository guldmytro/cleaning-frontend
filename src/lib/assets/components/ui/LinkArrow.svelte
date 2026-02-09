<script lang="ts">
    import Sprite from "./Sprite.svelte";

    export let href: string;
    export let ariaLabel: string;
</script>

<a {href} class="link-arrow" aria-label={ariaLabel}>
    <Sprite id="arrow" />
</a>

<style>
    .link-arrow {
        display: flex;
        width: 37px;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--c-white);
        overflow: hidden;
        color: var(--c-text);
    }
</style>