<script lang="ts">
    import Headline from "../ui/Headline.svelte";
    import Paragraph from "../ui/Paragraph.svelte";

    export let title: string;
    export let description: string;
    export let maxWidths: [number, number];
</script>

<div class="section-header">
    <div class="headline-wrapper" style="max-width: {maxWidths[0]}px">
        <Headline {title} level={2} levelStyle={2} />
    </div>
    <div class="p-wrapper" style="max-width: {maxWidths[1]}px">
        <Paragraph text={description} size="p" weight="400" />
    </div>
</div>

<style>
    .section-header {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-400);
    }
</style>