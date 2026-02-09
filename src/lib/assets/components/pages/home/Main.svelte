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

<main class="service" 
      style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.90) 100%), url({bg})">
    <Container>
        <div class="service-row">
            <div class="section-header">
                <Headline {title} level={1} levelStyle={1} />
                <div class="section-header__subtitle">
                    <Paragraph text={description} size="p" weight="400" />
                </div>
            </div>
            <div class="section-footer">
                <Button href="/" size="default" style="default" text={m.getQuote()} />
                <div class="rating">
                    <Rate title="4.8" />
                    <Rate title="100+" description={m.completedOrders()} />
                </div>
            </div>
        </div>
    </Container>
</main>

<style>
    .service {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .service-row {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        align-items: flex-start;
        height: 100svh;
        min-height: 800px;
        color: var(--c-white);
        row-gap: var(--s-v-600);
        padding-bottom: var(--s-v-1300);
    }

    .section-header {
        max-width: 805px;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-500);
    }

    .section-header__subtitle {
        max-width: 551px;
    }

    .section-footer {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .rating {
        display: flex;
        flex-flow: row nowrap;
        column-gap: var(--s-h-600);
        align-items: flex-start;
    }

    @media (max-width: 834px) {
        .section-footer {
            flex-direction: column;
            row-gap: var(--s-v-1100);
        }
    }

    @media (max-width: 767px) {
        .service-row {
            min-height: unset;
        }
    }
</style>


