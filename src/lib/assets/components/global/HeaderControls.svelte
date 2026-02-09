<script lang="ts">
    import type { City } from "$lib/types/city";
    import { getLocale, setLocale } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    import Select from "../ui/Select.svelte";

    const langs = [
        {
            value: 'de',
            label: 'DE'
        },
        {
            value: 'en',
            label: 'EN'
        }
    ];
    
    let currentLanguage = langs.find(l => l.value === getLocale()) || langs[0];

    function switchLang(lang: string) {
        if (lang !== 'en' && lang !== 'de') return;
        setLocale(lang);
    }

    let { cities, white, mobile = false } : { cities: City[], white: boolean, mobile: boolean} = $props();


    const citiesOptions: {
        value: string;
        label: string;
        // svelte-ignore state_referenced_locally
        }[] = cities.map((city) => {
        return {
            label: city.title,
            value: city.slug
        }
    });

    const currentCity = $derived(page.params?.city ? citiesOptions.find(city => city.value === page.params.city) || citiesOptions[0] : citiesOptions[0]);


    async function switchCity(city: string) {
        const segments = page.url.pathname.split('/').filter(Boolean);

        const locales = ['en', 'de'];
        let cityIndex = 0;

        if (locales.includes(segments[0])) {
            cityIndex = 1;
        }

        segments[cityIndex] = city;

        const newPath = '/' + segments.join('/') + '/';

        await goto(newPath);
    }
</script>

<Select 
    options={citiesOptions} 
    currentOption={currentCity} handleChange={(value) => switchCity(value)} 
    {white}
    {mobile} />
<Select 
    options={langs} 
    currentOption={currentLanguage} handleChange={(value) => switchLang(value)} 
    {white}
    {mobile} />