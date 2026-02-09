<script lang="ts">
    import type { PageProps } from './types';
    import { replaceStringWithCity } from '$lib/utils';
    import { page } from '$app/state';
    export let data: PageProps;

    $: title = replaceStringWithCity(data.service.title, page.data.currentCity);
    import MainRedesign from '$lib/assets/components/pages/service/detail/MainRedesign.svelte';
    import Body from '$lib/assets/components/pages/service/detail/Body.svelte';
    import Results from '$lib/assets/components/pages/service/detail/Results.svelte';
    import Reviews from '$lib/assets/components/sections/Reviews.svelte';
    import Faq from '$lib/assets/components/sections/Faq.svelte';
    import AdvancedForm from '$lib/assets/components/sections/AdvancedForm.svelte';
</script>

<MainRedesign {title} description={data.service.description} bg={data.service.image} />
<Body body={data.service.body} />
<Results results={data.service.results} />
<Reviews reviews={data.reviews} />
<AdvancedForm />
<Faq faq={data.service.faq} />