<script lang="ts">
    import { page } from '$app/state';
    import Main from '$lib/assets/components/pages/home/Main.svelte';
    import Results from '$lib/assets/components/pages/service/detail/Results.svelte';
    import AdvancedForm from '$lib/assets/components/sections/AdvancedForm.svelte';
    import Categories from '$lib/assets/components/sections/Categories.svelte';
    import Reviews from '$lib/assets/components/sections/Reviews.svelte';
    import bg from '$lib/assets/img/bg.jpg';
    import { m } from '$lib/paraglide/messages';
    import { replaceStringWithCity } from '$lib/utils';
    import type { PageData } from './types';

    let title = $derived.by(() => {
        if (page.data?.currentCity) return replaceStringWithCity(m.homeTitle(), page?.data?.currentCity);
        return replaceStringWithCity(m.homeTitle(), '');
    });
    let { children, data }: { children:any, data: PageData } = $props();
</script>

<Main {bg} {title} description={m.homeDescription()} />
<Categories />
<Results results={data.results} />
<Reviews reviews={data.reviews} />
<AdvancedForm />