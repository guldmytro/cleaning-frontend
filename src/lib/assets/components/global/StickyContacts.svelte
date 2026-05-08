<script lang="ts">
    import Sprite from "../ui/Sprite.svelte";

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
        z-index: 100;
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
</style>