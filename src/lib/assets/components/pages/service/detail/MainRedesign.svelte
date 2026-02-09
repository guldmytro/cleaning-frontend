<script lang="ts">
    import Container from "$lib/assets/components/global/Container.svelte";
    import Button from "$lib/assets/components/ui/Button.svelte";
    import Headline from "$lib/assets/components/ui/Headline.svelte";
    import Paragraph from "$lib/assets/components/ui/Paragraph.svelte";
    import Rate from "$lib/assets/components/ui/Rate.svelte";
    import { m } from "$lib/paraglide/messages";

    export let title : string;
    export let description: string;
    export let bg: string;
</script>

<main class="service">
    <Container>
        <div class="service-row">
            <div class="col gr">
                <div class="section-header gr">
                    <div class="section-header__content gr">
                        <Headline {title} level={1} levelStyle={2} />
                        <Paragraph text={description} size="p" weight="400" />
                    </div>
                    <Button href="/" size="default" style="default" text={m.getQuote()} />
                </div>
                <div class="section-footer">
                    <Rate title="4.8" />
                    <Rate title="100+" description={m.completedOrders()} />
                </div>
            </div>
            <img class="service-image" src={bg} alt={title}>
        </div>
    </Container>
</main>

<style>
    .service-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: var(--s-h-400);
        padding-top: 150px;
    }

    .col {
        max-width: 530px;
        align-self: center;
        row-gap: var(--s-v-1000);
    }

    .section-header {
        row-gap: var(--s-v-600);
    }

    .section-header__content {
        row-gap: var(--s-v-500);
    }

    .section-footer {
        display: flex;
        column-gap: var(--s-h-500);
    }

    .service-image {
        width: 100%;
        aspect-ratio: 59 / 66;
        border-radius: 6px;
        object-fit: cover;
    }

    @media (max-width: 1049px) {
        .service-row {
            padding-top: 235px;
            grid-template-columns: minmax(0, 1fr);
            row-gap: var(--s-v-1200);
        }

        .service-image {
            max-height: 860px;
        }
    }

    @media (max-width: 834px) {
        .service-row {
            padding-top: clamp(195px, calc(162.3px + 8.715vw), 235px);
        }
    }
</style>


