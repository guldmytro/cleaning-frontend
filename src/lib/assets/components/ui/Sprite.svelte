<script lang="ts">
    import type { SpriteId } from '$lib/types/sprite';
    import { sizes } from '$lib/types/sprite';

    export let id: SpriteId;
</script>

<svg width={sizes[id][0]} height={sizes[id][1]}>
    <use href={`/sprite.svg#${id}`}></use>
</svg>

<style>
    svg {
        width: 100%;
        max-width: 100%;
        flex-shrink: 0;
    }
</style>