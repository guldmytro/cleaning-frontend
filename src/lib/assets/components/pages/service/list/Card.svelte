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

<li class="service" 
    style="background: linear-gradient(180deg, rgba(21, 25, 31, 0.10) 0%, rgba(21, 25, 31, 0.80) 100%), url({service.image}) no-repeat center / cover">
    <div class="service-content gr">
        <Headline title={service.short_title} level={2} levelStyle={4} href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)} />
        <LinkArrow href={localizeHref(`/${page?.data?.currentCitySlug}/services/${category.slug}/${service.slug}`)} ariaLabel={service.short_title} />
    </div>
</li>

<style>
    .service {
        display: grid;
        align-items: end;
        width: 100%;
        height: 380px;
        list-style: none;
        border-radius: 10px;
        padding: var(--s-h-400);
        color: var(--c-white);
    }

    .service-content {
        row-gap: var(--s-v-300);
    }

    @media (max-width: 834px) {
        .service {
            height: clamp(360px, calc(294.6px + 17.43vw), 440px);
        }
    }
</style>

