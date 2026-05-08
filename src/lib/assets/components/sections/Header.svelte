<script lang="ts">
    import type { City } from "$lib/types/city";
    import Container from "../global/Container.svelte";
    import Logo from "../ui/Logo.svelte";
    import { localizeHref } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import Button from "../ui/Button.svelte";
    import { m } from "$lib/paraglide/messages";
    import HeaderControls from "../global/HeaderControls.svelte";
    import HeaderMenu from "../ui/HeaderMenu.svelte";
    import MobileMenuBtn from "../ui/MobileMenuBtn.svelte";
    import MobileWrapper from "../ui/MobileWrapper.svelte";
    import { afterNavigate } from "$app/navigation";
    let { cities } : { cities: City[]} = $props();

    let opened = $state(false);

    afterNavigate(() => {
        opened = false;
    })
</script>



<header class="header">
    <div class="toper">
        <Container>
            <div class="toper-row">
                <HeaderControls {cities} white={true} mobile={false} />
            </div>
        </Container>
    </div>
    <Container>
        <div class="header-row">
            <Logo />
            <HeaderMenu />
            <div class="button-wrapper">
                <Button href={localizeHref(`/${page?.data?.currentCitySlug}/contacts#form`)} size="small" style="default" text={m.getQuote()} />
            </div>
            <MobileMenuBtn {opened} toggleMenu={(st: boolean) => opened = st} />
        </div>
    </Container>
</header>

<MobileWrapper {opened} onCl={() => opened = false} />

<style>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999999;
    }

    .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px clamp(
            28px,
            calc(28px + (4 * ((100vw - var(--b-tablet_px)) / (var(--b-desktop) - var(--b-tablet))))),
            32px); 
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.70);
        backdrop-filter: blur(5px);
    }

    .toper {
        margin-bottom: clamp(12px, 1.2vw + 8px, 24px);
        background: rgba(255, 255, 255, 0.70);
        backdrop-filter: blur(5px);
        position: relative;
        z-index: 2;
    }

    @media (max-width: 834px) {
        :global(.header-row .menu) {
            display: none;
        }

        .button-wrapper {
            display: none;
        }

        .header-row {
            padding-inline: clamp(
                16px,
                calc(16px + (12 * ((100vw - var(--b-mobide_px)) / (var(--b-tablet) - var(--b-mobide))))),
                28px);
            padding-block: clamp(
                12px,
                calc(12px + (8 * ((100vw - var(--b-mobide_px)) / (var(--b-tablet) - var(--b-mobide))))),
                20px);
        }
    }
</style>