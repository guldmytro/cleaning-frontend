<script lang="ts">
    import type { City } from "$lib/types/city";
    import Container from "../global/Container.svelte";
    import HeaderControls from "../global/HeaderControls.svelte";
    import Socials from "../global/Socials.svelte";
    import Logo from "../ui/Logo.svelte";
    let { cities } : { cities: City[]} = $props();
    import { m } from "$lib/paraglide/messages";
    import type { CategoryArchive } from "$lib/types/category";
    import { page } from "$app/state";
    import { localizeHref } from "$lib/paraglide/runtime";
    const categories: CategoryArchive[] = page?.data?.categories;
</script>

<footer class="footer">
    <Container>
        <div class="footer-grid gr">
            <div class="footer-top">
                <div class="footer-info gr">
                    <Logo />
                    <Socials />
                    <div class="footer-info__controls">
                        <HeaderControls {cities} white={true} mobile={false} />
                    </div>
                </div>
                <div class="menus">
                    {#if Array.isArray(categories) && categories.length}
                        <ul class="menu">
                            {#each categories as category}
                                <li class="menu-item">
                                    <span class="menu-item__span">
                                        {category.title}
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
                        </ul>
                    {/if}
                </div>
            </div>
            <hr class="line">
            <div class="footer-bottom">
                <nav class="pr-links">
                    <a href={localizeHref(`/${page.data?.currentCitySlug}/legal-notice`)} class="pr-link">
                        {m.legalNotice()}
                    </a>
                    <a href={localizeHref(`/${page.data?.currentCitySlug}/privacy-policy`)} class="pr-link">
                        {m.privacyPolicy()}
                    </a>
                </nav>
            </div>
        </div>
    </Container>
</footer>

<style>
    .footer {
        padding-top: var(--s-v-1400);
        padding-bottom: var(--s-v-1000);
    }

    .footer-info {
        row-gap: var(--s-v-600);
    }

    .footer-info__controls {
        display: flex;
        column-gap: 4px;
    }

    .footer-grid {
        row-gap: var(--s-v-1000);
    }

    .footer-top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
        row-gap: var(--s-v-1000);
    }

    .line {
        padding: 0;
        border: none;
        height: 1px;
        width: 100%;
        background-color: var(--c-text);
        opacity: 0.1;
    }

    .pr-links {
        display: flex;
        column-gap: var(--s-h-400);
    }

    .pr-link {
        font-size: var(--p-s);
        font-weight: 600;
        line-height: 1;
    }

    .submenu,
    .menu {
        list-style: none;
    }

    .menu {
        display: flex;
        row-gap: var(--s-v-800);
        column-gap: 90px;
    }

    .submenu {
        margin-top: var(--s-v-500);
        row-gap: var(--s-v-300);
    }

    .submenu-item,
    .menu-item__span {
        font-size: var(--p-s);
        font-weight: 600;
    }
    
    .menu-item__span {
        opacity: .4;
    }

    @media (max-width: 834px) {
        .footer-top {
            flex-direction: column;
        }
    }

    @media (max-width: 767px) {
        .menu {
            flex-direction: column;
        }
    }
</style>