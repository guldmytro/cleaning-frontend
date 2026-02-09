<script lang="ts">
    import Container from "../global/Container.svelte";
    import Headline from "../ui/Headline.svelte";
    import { m } from "$lib/paraglide/messages";
    import Paragraph from "../ui/Paragraph.svelte";
    import Button from "../ui/Button.svelte";
    import { parseFaqMarkup } from "$lib/utils";
    import Accordeon from "../ui/Accordeon.svelte";

    export let faq: string | null = null;

    $: items = parseFaqMarkup(faq || '');
</script>


{#if Array.isArray(items) && items.length}
    <section class="faq">
        <Container>
            <div class="faq-row">
                <div class="col gr">
                    <div class="faq-header gr">
                        <Headline title={m.faqTitle()} level={2} levelStyle={2} />
                        <Paragraph text={m.faqSubtitle()} size="p" weight="400" />
                    </div>
                    <Button text={m.faqButton()} href="#" style="default" size="default" />
                </div>
                <div class="faq-list">
                    <Accordeon {items} />
                </div>
            </div>
        </Container>
    </section>    
{/if}

<style>
    .col {
        row-gap: var(--s-v-500);
    }

    .faq-header {
        row-gap: var(--s-v-400);
    }

    .faq-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: var(--s-h-400);
        align-items: start;
    }

    @media (max-width: 991px) {
        .faq-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            row-gap: var(--s-v-1000);
        }
    }
</style>