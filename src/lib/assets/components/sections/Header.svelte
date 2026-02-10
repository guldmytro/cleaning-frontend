<script lang="ts">
    import type { City } from "$lib/types/city";
    import Container from "../global/Container.svelte";
    import Logo from "../ui/Logo.svelte";
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
    <Container>
        <div class="header-row">
            <Logo  />
            <HeaderMenu />
            <div class="header-controls">
                <HeaderControls {cities} white={false} mobile={false} />
            </div>
            <MobileMenuBtn {opened} toggleMenu={(st: boolean) => opened = st} />
        </div>
    </Container>
</header>

<MobileWrapper {opened} onCl={() => opened = false} />

<style>
    .header {
        position: fixed;
        top: clamp(30px, calc(28.46px + 0.184vw), 32px);
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

    .header-controls {
        display: flex;
        flex-flow: row nowrap;
        column-gap: 8px;
    }

    @media (max-width: 834px) {
        :global(.header-row .menu) {
            display: none;
        }

        .header {
            top: clamp(20px, calc(11.83px + 2.179vw), 30px);
        }

        .header-controls {
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