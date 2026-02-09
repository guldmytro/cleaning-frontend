<script lang="ts">
    import { localizeHref } from "$lib/paraglide/runtime";
</script>

<a href={localizeHref('/')} class="logo-link">
    <strong>Swiss</strong>Worx
</a>

<style>
    .logo-link {
        color: var(--c-accent);
        font-size: 20px;
        line-height: 1; 
    }

    .logo-link strong {
        font-weight: 600;
    }
</style>