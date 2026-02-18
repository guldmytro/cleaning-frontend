<script lang="ts">
    export let text: string;
    export let size: 'default' | 'small' | 'extra-small';
    export let style: 'default' | 'ghost';
    export let href: string | null = null;
    export let type: 'button' | 'submit' = 'submit';
    export let full: boolean = false;
    export let onClick: any = null;
    export let disabled: boolean = false;

</script>

{#if href}
    <a {href} class="btn size-{size} style-{style}" class:full onclick={(e: any) => onClick ? onClick(e) : null}>
        {text}
    </a>
{:else}
    <button {type} class="btn size-{size} style-{style}" class:full onclick={(e: any) => onClick ? onClick(e) : null} {disabled}>
        {text}
    </button>
{/if}

<style>
    .btn {
        display: inline-block;
        width: fit-content;
        text-transform: uppercase;
        border-radius: 6px;
        line-height: 1;
        font-weight: 600;
        border: 1px solid var(--c-accent);
    }

    .size-default {
        padding: 24px 28px;
        font-size: var(--fz-button-text);
    }
    
    .size-small {
        padding: 20px 24px;
        font-size: 12px;
    }

    .size-extra-small {
        padding: 12px 16px;
        font-size: 9px;
    }
    
    .style-default {
        color: var(--c-text);
        background-color: var(--c-accent);
        transition: background-color 180ms ease, opacity 180ms ease;
        will-change: background-color, opacity;
    }

    .style-default:hover {
        background-color: var(--c-accent-hover);
    }

    .style-ghost {
        color: var(--c-text);
        background-color: transparent;
        transition: background-color 180ms ease, color 180ms ease;
        will-change: background-color color;
    }

    .style-ghost:hover {
        color: var(--c-white);
        background-color: var(--c-accent);
    }

    .full {
        width: 100%;
        text-align: center;
    }

    :disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>