<script lang="ts">
    import Sprite from "./Sprite.svelte";
    import { slide } from "svelte/transition";

    type AccordeonItem = {
        title: string;
        text: string;
    }
    let activeItem = $state<number | null>(null);
    let { items } : { items: AccordeonItem[] } = $props();
    import { replaceStringWithCity } from "$lib/utils";
    import { page } from "$app/state";
</script>

{#if Array.isArray(items) && items.length}
    <ul class="accordeon">
        {#each items as item, i (item.title)}
            <li class="accordeon-item">
                <button type="button" class="accordeon-btn" class:active={activeItem === i} onclick={() => activeItem = activeItem === i ? null : i}>
                    <span class="accordeon-btn__text">
                        {replaceStringWithCity(item.title, page.data?.currentCity || '')}
                    </span>
                    <span class="accordeon-btn__icon">
                        <Sprite id="arrow-down" />
                    </span>
                </button>
                {#if activeItem === i}
                    <div class="accordeon-content" transition:slide={{duration: 180}}>
                        {replaceStringWithCity(item.text, page.data?.currentCity || '')}
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
{/if}

<style>
    .accordeon {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-250);
        list-style: none;
    }

    .accordeon-item {
        position: relative;
        background-color: var(--c-white);
        padding-bottom: var(--s-v-700);
        border-radius: 10px;
        overflow: hidden;
    }

    .accordeon-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--s-v-700);
        padding-bottom: 0;
        width: 100%;
        border: none;
        font-weight: 600;
        font-size: var(--h5);
        line-height: 1.1;
        background-color: transparent;
        text-align: left;
        column-gap: 20px;
    }

    .accordeon-btn::before {
        content: '';
        display: block;
        position: absolute;
        inset: 0;
    }

    .accordeon-btn__icon {
        margin-top: 2px;
        width: 14px;
        height: 7px;
        transition: transform 180ms ease;
    }

    .accordeon-btn.active .accordeon-btn__icon {
        transform: rotate(-180deg);
    }

    .accordeon-content {
        font-size: var(--p);
        line-height: 1.2;
        padding-top: var(--s-v-300);
        padding-inline: var(--s-v-700);
    }
</style>