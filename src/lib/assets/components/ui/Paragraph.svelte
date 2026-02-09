<script lang="ts">
    export let size: 'p' | 'p-s' | 'p-xs';
    export let weight: '400' | '600';
    export let lineHeight: 'normal' | 'short' = 'normal';
    export let text: string;
</script>

{#if text}
    <p class="p size-{size} weight-{weight} lh-{lineHeight}">{@html text}</p>
{/if}


<style>
    .size-p {
        font-size: var(--p);
    }

    .size-p-s {
        font-size: var(--p-s);
    }

    .size-p-xs {
        font-size: var(--p-xs);
    }

    .weight-400 {
        font-weight: 400;
    }

    .weight-600 {
        font-weight: 600;
    }

    .lh-normal {
        line-height: 1.2;
    }

    .lh-short {
        line-height: 1.1;
    }
</style>
