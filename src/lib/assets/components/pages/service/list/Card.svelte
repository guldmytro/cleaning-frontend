<script lang="ts">
    import type { ServiceArchive } from "$lib/types/service";
    import type { CategoryDetail } from "$lib/types/category";
    import { page } from "$app/state";
    import { localizeHref } from "$lib/paraglide/runtime";
    import Headline from "$lib/assets/components/ui/Headline.svelte";
    import LinkArrow from "$lib/assets/components/ui/LinkArrow.svelte";
    export let service: ServiceArchive;
    export let category: CategoryDetail;
</script>

<li class="service">
    <img src={service.image} alt={service.short_title} loading="lazy">
    <div class="service-content gr">
        <Headline title={service.short_title} level={2} levelStyle={4} href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)} />
        <LinkArrow href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)} ariaLabel={service.short_title} />
    </div>
</li>

<style>
    .service {
        position: relative;
        display: grid;
        align-items: end;
        width: 100%;
        height: 380px;
        list-style: none;
        border-radius: 10px;
        padding: var(--s-h-400);
        color: var(--c-white);
        overflow: hidden;
        isolation: isolate;
    }

    .service::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(21, 25, 31, 0.10) 0%, rgba(21, 25, 31, 0.80) 100%);
        z-index: 1;
    }

    .service img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
        transition: transform 800ms ease;
    }

    .service:hover img {
        transform: scale(1.1);
    }

    .service-content {
        row-gap: var(--s-v-300);
        position: relative;
        z-index: 2;
    }

    :global(.service .headline__link) {
        position: relative;
    }

    :global(.service .headline__link::before) {
        content: '';
        display: block;
        position: absolute;
        top: -9999px;
        left: -9999px;
        right: -9999px;
        bottom: -9999px;
    }

    @media (max-width: 834px) {
        .service {
            height: clamp(360px, calc(294.6px + 17.43vw), 440px);
        }
    }
</style>

