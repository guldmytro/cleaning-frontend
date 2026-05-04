<script lang="ts">
    import { page } from '$app/state';
    import SeoHead from '$lib/assets/components/global/SeoHead.svelte';
    import Main from '$lib/assets/components/pages/home/Main.svelte';
    import Results from '$lib/assets/components/pages/service/detail/Results.svelte';
    import AdvancedForm from '$lib/assets/components/sections/AdvancedForm.svelte';
    import Reviews from '$lib/assets/components/sections/Reviews.svelte';
    import SpecialCleaning from '$lib/assets/components/sections/SpecialCleaning.svelte';
    import MaintenanceCleaning from '$lib/assets/components/sections/MaintenanceCleaning.svelte';
    import bg from '$lib/assets/img/bg.jpg';
    import { m } from '$lib/paraglide/messages';
    import { replaceStringWithCity } from '$lib/utils';
    import type { PageProps } from './types';

    let title = $derived.by(() => {
        if (page.data?.currentCity) return replaceStringWithCity(m.homeTitle(), page?.data?.currentCity);
        return replaceStringWithCity(m.homeTitle(), '');
    });
    let { children, data }: { children:any, data: PageProps } = $props();

    let specialCleaning = $derived(page.data.categories.fi)
</script>

<SeoHead seo={data.seo} />
<Main {bg} {title} description={m.homeDescription()} />
<MaintenanceCleaning />
<SpecialCleaning />
<Results results={data.results} />
<Reviews reviews={data.reviews} />
<AdvancedForm />