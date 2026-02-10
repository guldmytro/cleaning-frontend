<script lang="ts">
    import type { PageProps } from "./types";
    import Main from "$lib/assets/components/pages/category/Main.svelte";
    import SeoHead from "$lib/assets/components/global/SeoHead.svelte";
    export let data: PageProps;
</script>

<SeoHead seo={data.seo} />
<Main category={data.category} services={data.services} />

