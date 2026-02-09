<script lang="ts">
    let { opened, toggleMenu }: { opened: Boolean, toggleMenu: (st: boolean) => void } = $props();

</script>

<button type="button" class="mobile-menu-btn" class:opened onclick={() => toggleMenu(!opened)} aria-label="open close menu">
    <span></span>
</button>

<style>
    .mobile-menu-btn {
        display: none;
        background-color: var(--c-theme);
    }

    @media(max-width: 834px) {
        .mobile-menu-btn {
            display: flex;
            align-items: center;
            border: none;
            background-color: var(--c-theme);
            width: 50px;
            height: 50px;
            border-radius: 6px;
            padding: 14px 13px;
        }

        .mobile-menu-btn span {
            position: relative;
            height: 1px;
            width: 100%;
            border-radius: 20px;
            background-color: var(--c-text);
            transition: background-color 180ms ease;
            will-change: background-color;
        }

        .mobile-menu-btn span::before,
        .mobile-menu-btn span::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--c-text);
            border-radius: 20px;
            transition: transform 180ms ease;
            will-change: transform;
        }

        .mobile-menu-btn span::before {
            transform: translateY(-6px);
        }

        .mobile-menu-btn span::after {
            transform: translateY(6px);
        }

        .mobile-menu-btn.opened span {
            background-color: transparent;
        }

        .mobile-menu-btn.opened span::before {
            transform: rotate(45deg);
        }

        .mobile-menu-btn.opened span::after {
            transform: rotate(-45deg);
        }
    }
</style>