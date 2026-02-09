<script lang="ts">
    import Sprite from "./Sprite.svelte";
    import { fly } from "svelte/transition";
    import { slide } from "svelte/transition";
    import { afterNavigate } from "$app/navigation";

    type Option = {
        label: string;
        value: string;
    }

    let { options, currentOption, white, mobile, handleChange } : { 
        options: Option[], 
        currentOption: Option,
        white: boolean,
        mobile: boolean,
        handleChange: (value: string) => void
    } = $props();
    
    let opened = $state(false);
    
    function changeOption(value: string) {
        handleChange(value);
        opened = false;
    }

    afterNavigate(() => {
        opened = false;
    })
</script>

<div class="select-box" class:white class:mobile>
    <button type="button" class="current-option" class:opened onclick={() => opened = !opened}>
        <span class="current-option__text">{currentOption.label}</span>
        <span class="current-option__icon">
            <Sprite id="arrow-down" />
        </span>
    </button>
    {#if opened}
        <div class="options" transition:fly={{duration: 180, y: 20}}>
            {#each options as opt (opt.value)}
                <button type="button" class="option" onclick={() => changeOption(opt.value)} disabled={currentOption.value === opt.value}>
                    <span class="option__text">{opt.label}</span>
                </button>
            {/each}
        </div>

    {/if}
</div>

<style>
    .select-box {
        position: relative;
        width: fit-content;
    }

    /* .select-box.mobile {
        display: contents;
    } */

    .current-option {
        display: flex;
        align-items: center;
        padding: 16px;
        column-gap: 8px;
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        border-radius: 6px;
        border: none;
        background-color: var(--c-theme);
    }

    .white .current-option {
        background-color: var(--c-white);
    }

    .mobile .current-option {
        width: fit-content;
        padding: 20px;
    }

    .current-option__icon {
        width: 8px;
        will-change: transform;
        transition: transform 180ms ease;
    }

    .current-option.opened .current-option__icon {
        transform: translateY(-1px) rotate(-180deg);
    }

    .options {
        position: absolute;
        right: 0;
        margin-left: -999px;
        top: calc(100% + 8px);
        display: grid;
        padding: 11px 12px;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-100);
        border-radius: 6px;
        background-color: var(--c-theme);
    }

    .white .options {
        background-color: var(--c-white);
    }
    
    .mobile .options {
        right: unset;
        left: 0;
        margin-left: unset;
        margin-right: -99999px;
        max-width: calc(100svw - var(--p-container) * 2);
        display: flex;
        padding: 4px;
        flex-flow: row wrap;
        gap: var(--s-v-100);
    }

    .mobile .option {
        padding: 20px;
        border-radius: 4px;
    }

    .option {
        padding: 8px 12px;
        font-size: var(--p-xs);
        border-radius: 6px;
        font-weight: 600;
        border: none;
        background-color: transparent;
        transition: background-color 180ms ease;
        will-change: background-color;
    }

    .option:disabled,
    .option:hover {
        background-color: var(--c-white);
    }

    .white .option:disabled,
    .white .option:hover {
        background-color: var(--c-theme);
    }
</style>