<script lang="ts">
    import type { City } from "$lib/types/city";
    import { getLocale, setLocale } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    import Select from "../ui/Select.svelte";
    import Sprite from "../ui/Sprite.svelte";

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

    let oppositeLocale = $derived(getLocale() === 'en' ? 'de' : 'en');
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

<div class="row">
    <Select 
        options={citiesOptions} 
        currentOption={currentCity} handleChange={(value) => switchCity(value)} 
        {white}
        small={true}
        icon="marker"
        {mobile} />

    <div class="group">
        <a href="tel:+41415050002" class="tel">
            <span class="tel__icon">
                <Sprite id="phone" />
            </span>
            <span class="tel__text">
                041 505 00 02
            </span>
        </a>
        <button type="button" class="locale" onclick={() => switchLang(oppositeLocale)}>
            <span class="locale__icon">
                <Sprite id="planet" />
            </span>
            <span class="locale__text">{oppositeLocale}</span>
        </button>
    </div>
</div>

<style>
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-block: 8px;
        column-gap: 8px;
    }

    .group {
        display: flex;
        column-gap: var(--s-h-100);
    }

    .locale {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
        border-radius: 6px;
        border: none;
        padding: 8px 12px;
        background-color: var(--c-white);
    }

    .locale__icon {
        width: 11px;
        flex-shrink: 0;
        transform: translateY(-1px);
    }

    .locale__text {
        font-size: var(--p-xs);
        font-weight: 'Inter';
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
    }

    .tel {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: var(--s-h-50);
    }

    .tel__icon {
        width: 12px;
    }

    .tel__text {
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        font-family: 'Inter';
    }
</style>