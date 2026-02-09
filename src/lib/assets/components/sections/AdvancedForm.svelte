<script lang="ts">
    import Container from "../global/Container.svelte";
    import Headline from "../ui/Headline.svelte";
    import Paragraph from "../ui/Paragraph.svelte";
    import { m } from "$lib/paraglide/messages";
    import FormStages from "./FormStages.svelte";
    export let title : string | null = null;
</script>

<section class="form-section">
    <Container>
        <div class="form-section-header">
            <div class="h-wrapper">
                <Headline level={2} levelStyle={2} title={title || m.formTitle()} />
            </div>
            <div class="p-wrapper">
                <Paragraph text={m.formSubtitle()} size="p" weight="400" />
            </div>
        </div>
        <FormStages />
    </Container>
</section>

<style>
    .form-section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        column-gap: var(--s-h-300);
        margin-bottom: var(--s-v-1000);
    }
    
    .h-wrapper {
        max-width: 520px;
    }

    .p-wrapper {
        max-width: 560px;
    }

    @media(max-width: 1099px) {
        .form-section-header {
            flex-direction: column;
            align-items: flex-start;
            row-gap: var(--s-v-400);
        }
    }
</style>