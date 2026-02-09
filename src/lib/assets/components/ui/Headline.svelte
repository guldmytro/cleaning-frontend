<script lang="ts">
    export let level = 1;
    export let title: string;
    export let levelStyle : number = 0;
    export let href : string | null = null;
    export let invert: boolean = false;
</script>

{#if title && String(title).trim().length}
    <svelte:element this={`h${Math.min(Math.max(level, 1), 6)}`} class={`headline headline-style-${Math.min(Math.max(levelStyle, 0), 6)}`} 
        class:invert>
        {#if href}<a class="headline__link" {href}>{@html title}</a>{:else}{@html title}{/if}
    </svelte:element>
{/if}

<style>
    .headline,
    :global(.headline) {
        font-weight: 600;
        letter-spacing: -0.03em;
        line-height: 1.1;
    }

    .invert {
        color: var(--c-white);
    }

    .headline__link {
        color: inherit;
        text-decoration: none;
    }

    :global(h1),
    .headline-style-1 {
        font-size: var(--h1);
    }
    
    :global(h2),
    .headline-style-2 {
        font-size: var(--h2);
    }

    :global(h3),
    .headline-style-3 {
        font-size: var(--h3);
    }

    :global(h4),
    .headline-style-4 {
        font-size: var(--h4);
    }

    :global(h5),
    :global(.h5),
    .headline-style-5 {
        font-size: var(--h5);
    }
</style>
    