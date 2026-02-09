<script lang="ts">
    import type { PageProps } from "./types";
    import Main from "$lib/assets/components/pages/category/Main.svelte"; 
    export let data: PageProps;
</script>

<Main category={data.category} services={data.services} />

