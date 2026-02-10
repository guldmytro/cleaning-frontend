<script lang="ts">
    import type { PageProps } from "./types";
    import Main from "$lib/assets/components/pages/contacts/Main.svelte";
    import AdvancedForm from "$lib/assets/components/sections/AdvancedForm.svelte";

    import { page } from "$app/state";
    import { replaceStringWithCity } from "$lib/utils";
    import SeoHead from "$lib/assets/components/global/SeoHead.svelte";
    export let data: PageProps;
</script>

<SeoHead seo={data.seo} />
<Main />
<AdvancedForm />