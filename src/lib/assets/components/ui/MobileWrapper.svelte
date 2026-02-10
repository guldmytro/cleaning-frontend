<script lang="ts">
    import type { CategoryArchive } from "$lib/types/category";
    import { page } from "$app/state";
    import { localizeHref } from "$lib/paraglide/runtime";
    import Sprite from "./Sprite.svelte";
    import { m } from "$lib/paraglide/messages";
    const categories: CategoryArchive[] = page?.data?.categories;
    import { fly, slide } from "svelte/transition";
    import Button from "./Button.svelte";
    import HeaderControls from "../global/HeaderControls.svelte";
    let { opened, onCl }: { opened: boolean, onCl: () => void } = $props();
    let currentIDX = $state<number | null>(null);
    
    const cities = page?.data?.cities;

</script>

{#if opened}
<div class="mobile-wrapper" transition:fly={{duration: 180, x: 100}}>
    <div class="mobile-content">
        <div class="mobile-menu">
            {#if Array.isArray(categories) && categories.length}
                <ul class="menu gr">
                    {#each categories as category, i}
                        <li class="menu-item">
                            <button class="menu-item__span" class:active={currentIDX === i} onclick={() => currentIDX = currentIDX === i ? null : i}>
                                {category.title}
                                <div class="menu-item__icon">
                                    <Sprite id="arrow-down" />
                                </div>
                            </button>
                            {#if Array.isArray(category.services) && category.services.length && currentIDX === i}
                                <ul class="submenu gr" transition:slide={{duration: 180}}>
                                    {#each category.services as service (service.slug)}
                                        <li class="submenu-item">
                                            <a href={localizeHref(`/${page.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)}>{service.short_title}</a>
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                            <a href={localizeHref(`/${page.data?.currentCitySlug}/services/${category.slug}`)} class="menu-item__link m">{category.title}</a>
                        </li>
                        {/each}
                    <li class="menu-item">
                        <a href={localizeHref(`/${page.data?.currentCitySlug}/contacts`)} class="menu-item__link">{m.contacts()}</a>
                    </li>
                </ul>
            {/if}
        </div>
        <div class="mobile-controls">
            <HeaderControls {cities} white={true} mobile={true} />
        </div>
        <div class="mobile-wrapper-footer">
            <Button onClick={() => onCl()} text={m.getQuote()} href={localizeHref(`/${page.data?.currentCitySlug}/contacts#form`)} size="default" style="default" full={true} />
        </div>
    </div>
</div>
{/if}

<style>
    .mobile-wrapper {
        display: none;
        padding-inline: var(--p-container);
        padding-top: 214px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100dvh;
        background-color: var(--c-theme);
        z-index: 9999;
    }

    .menu-item__link.m {
        display: none;
    }

    @media (max-width: 834px) {
        .mobile-wrapper {
            display: block;
        }
        
        .menu {
            row-gap: var(--s-v-1000);
        }
    
        .menu,
        .submenu {
            width: 100%;
            list-style: none;
        }
        
        .menu-item__link,
        .menu-item__span {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: var(--h3);
            font-weight: 600;
            line-height: 1.1;
            border: none;
            background-color: transparent;
        }
    
        .menu-item__icon {
            width: 22px;
            height: 11px;
            transition: transform 180ms ease;
        }

        .menu-item__span.active .menu-item__icon {
            transform: rotate(-180deg);
        }
    
        .submenu {
            padding-top: var(--s-v-700);
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--s-v-500);
        }

        .mobile-wrapper-footer {
            position: absolute;
            bottom: 64px;
            left: 0;
            right: 0;
            padding-inline: var(--p-container);
        }

        .mobile-controls {
            margin-top: var(--s-v-1100);
            display: flex;
            column-gap: 8px;
            padding-bottom: 200px;
        }

        .mobile-content {
            max-height: calc(100svh - 350px);
            overflow-y: auto;
        }
    }

    @media (max-width: 767px) {
        .menu {
            row-gap: var(--s-v-600);
        }

        .menu-item__span {
            display: none;
        }

        .menu-item__link.m {
            font-size: var(--h5);
            display: block;
        }

        .menu-item__link {
            font-size: var(--h5);
        }

        .mobile-controls {
            margin-top: var(--s-v-700);
        }

        .mobile-wrapper {
            padding-top: 160px;
        }
    }
</style>