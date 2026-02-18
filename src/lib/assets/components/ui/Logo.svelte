<script lang="ts">
    import { localizeHref } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import Sprite from "./Sprite.svelte";
</script>

<a href={localizeHref('/' + page?.data?.currentCitySlug || '')} class="logo-link">
    <Sprite id="logo" />
</a>

<style>
    .logo-link {
        width: 115px;
        padding-bottom: 7px;
    }
</style>