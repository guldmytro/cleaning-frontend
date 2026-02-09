<script lang="ts">
    import type { CategoryArchive } from "$lib/types/category";
    import { page } from "$app/state";
    import { localizeHref } from "$lib/paraglide/runtime";
    import Sprite from "./Sprite.svelte";
    import { m } from "$lib/paraglide/messages";
    const categories: CategoryArchive[] = page?.data?.categories;

</script>

{#if Array.isArray(categories) && categories.length}
    <ul class="menu">
        {#each categories as category}
            <li class="menu-item">
                <span class="menu-item__span">
                    {category.title}
                    <div class="menu-item__icon">
                        <Sprite id="arrow-down" />
                    </div>
                </span>
                {#if Array.isArray(category.services) && category.services.length}
                    <ul class="submenu gr">
                        {#each category.services as service (service.slug)}
                            <li class="submenu-item">
                                <a href={localizeHref(`/${page.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)}>{service.short_title}</a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
            {/each}
        <li class="menu-item">
            <a href={localizeHref(`/${page.data?.currentCitySlug}/contacts`)} class="menu-item__link">{m.contacts()}</a>
        </li>
    </ul>
{/if}

<style>
    .menu,
    .submenu {
        list-style: none;
    }

    .menu {
        display: flex;
        flex-flow: row nowrap;
        column-gap: var(--s-h-300);
    }

    .menu-item {
        position: relative;
    }

    .menu-item__link,
    .menu-item__span {
        position: relative;
        column-gap: 8px;
        display: flex;
        align-items: center;
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        isolation: isolate;
    }

    .menu-item__span::before {
        content: '';
        display: block;
        position: absolute;
        top: -20px;
        bottom: -20px;
        left: 0;
        right: 0;
        z-index: -1;
    }

    .menu-item__icon {
        width: 8px;
        transition: transform 180ms ease;
    }

    .submenu {
        opacity: 0;
        position: absolute;
        pointer-events: none;
        padding: 11px 12px;
        background-color: #EEF2F7;
        row-gap: var(--s-v-100);
        border-radius: 6px;
        left: 0;
        margin-right: -999px;
        top: calc(100% + 18px);
        transform: translateY(10px);
        transition: opacity 180ms ease, transform 180ms ease;
        will-change: background-color, transform;
    }

    .menu-item:hover .submenu {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0);
    }

    .menu-item:hover .menu-item__icon {
        transform: rotate(-180deg);
    }

    .submenu-item a {
        display: block;
        padding: 8px 12px;
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        border-radius: 6px;
        transition: background-color 180ms ease;
        will-change: background-color;
    }

    .submenu-item a:hover {
        background-color: var(--c-white);
    }
</style>