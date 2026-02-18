<script lang="ts">
    import { page } from "$app/state";
    import Container from "$lib/assets/components/global/Container.svelte";
    import Headline from "$lib/assets/components/ui/Headline.svelte";
    import { normalizeMediaURL } from "$lib/utils";
    import { env } from "$env/dynamic/public";
    import Paragraph from "$lib/assets/components/ui/Paragraph.svelte";
    import Button from "$lib/assets/components/ui/Button.svelte";
    const PUBLIC_LOCAL_API_URL = env.PUBLIC_LOCAL_API_URL!;
    import { m } from "$lib/paraglide/messages";
</script>

{#if page.data?.currentCityObj && page.data?.currentCityObj.section_title && page.data?.currentCityObj.section_description && page.data?.currentCityObj.map}
<section class="banner">
    <Container>
        <div class="banner-row">
            <div class="col">
                <Headline 
                    title={page.data?.currentCityObj.section_title}
                    level={2}
                    levelStyle={2}
                />
                <Paragraph text={page.data?.currentCityObj.section_description} size="p" weight="400" />
                <Button href="#form" text={m.getQuote()} size="default" style="default" white={true} />
            </div>
            <div
            class="img-wrapper"
            style="
                background:
                linear-gradient(270deg, rgba(160,255,238,0) 82.09%, #A0FFEE 100%),
                url({normalizeMediaURL(page?.data?.currentCityObj.map, PUBLIC_LOCAL_API_URL)}) 50% / cover no-repeat,
                #A0FFEE;
            "
            ></div>
            <div class="img-wrapper_mobile"
            style="
                background: 
                    linear-gradient(180deg, rgba(160, 255, 238, 0.00) 70.47%, #A0FFEE 100.03%), 
                    url({normalizeMediaURL(page?.data?.currentCityObj.map, PUBLIC_LOCAL_API_URL)}) 50% / contain no-repeat,
                    #A0FFEE;
                background-blend-mode: normal, multiply, normal;
            "></div>
        </div>
    </Container>
</section>
{/if}

<style>
    .banner-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        background-color: #A0FFEE;
        border-radius: 10px;
        overflow: hidden;
        min-height: 520px;
    }

    .col {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-500);
        align-self: center;
        padding-left: var(--s-h-600);
        padding-block: var(--s-v-1200);
    }

    .img-wrapper {
        width: 100%;
        height: 100%;
        background-blend-mode: normal, multiply, normal;
    }

    .img-wrapper_mobile {
        display: none;
    }

    @media (max-width: 991px) {
        .banner-row {
            grid-template-columns: minmax(0, 1fr);
        }

        .img-wrapper {
            display: none;
        }

        .img-wrapper_mobile {
            display: block;
            width: 100%;
            height: clamp(350px, 52vw, 516px);
            order: -1;
        }

        .col {
            padding-top: var(--s-v-700);
            padding-inline: var(--s-h-600);
        }
    }

    @media (max-width: 575px) {
        .col {
            padding-inline: var(--s-h-400);
        }
    }
</style>