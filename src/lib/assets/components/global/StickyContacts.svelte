<script lang="ts">
    import Sprite from "../ui/Sprite.svelte";
    import { page } from "$app/state";
    import { localizeHref } from "$lib/paraglide/runtime";
    import { m } from "$lib/paraglide/messages";
</script>

<div class="contact-block">
    <a href="https://wa.me/41763947975" class="contact-item">
        <span class="icon-wa">
            <Sprite id="whatsapp" />
        </span>
    </a>
    <hr class="contact-divider">
    <a href="tel:+41763947975" class="contact-item">
        <span class="icon-phone">
            <Sprite id="phone" />
        </span>
    </a>
    <hr class="contact-divider">
    <a href="mailto:office@swiss-worx.ch" class="contact-item">
        <span class="icon-letter">
            <Sprite id="letter" />
        </span>
    </a>
    <a href={localizeHref(`/${page?.data?.currentCitySlug}/contacts#form`)} class="contact-item">
        <span class="contact-item__page-link">{m.getQuote()}</span>
    </a>
</div>

<style>
    .contact-block {
        position: fixed;
        right: 0;
        bottom: 10svh;
        background-color: var(--c-accent);
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        z-index: 999;
    }
    
    .contact-item {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--c-white);
    }

    .icon-wa {
        width: 22px;
    }

    .icon-phone {
        width: 18px;
    }

    .icon-letter {
        width: 20px;
    }

    .contact-divider {
        padding: 0;
        border: none;
        background-color: #fff;
        height: 1px;
        opacity: 0.4;
        width: 35px;
        margin: 0 auto;
    }

    .contact-item:has(.contact-item__page-link) {
        display: none;
    }

    @media (max-width: 575px) {
        .contact-block {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            left: 0;
            bottom: 0;
            border-radius: 0;
        }

        .contact-divider {
            display: none;
        }

        .contact-item {
            position: relative;
            width: 100%;
            height: 60px;
            background-color: var(--c-white);
            color: var(--c-accent);
        }

        .contact-item:first-child::after {
            content: '';
            display: block;
            width: 1px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100%;
            background-color: #D8E9E7;
            z-index: 2;
        }

        .contact-item:has(.icon-letter) {
            display: none;
        }

        .contact-item:has(.contact-item__page-link) {
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            background-color: var(--c-accent);
            color: var(--c-white);
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            line-height: 1;
            font-family: 'Inter';
        }
    }
</style>