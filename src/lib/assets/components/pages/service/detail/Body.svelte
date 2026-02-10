<script lang="ts">
    import Container from "$lib/assets/components/global/Container.svelte";
    import Headline from "$lib/assets/components/ui/Headline.svelte";
    import Paragraph from "$lib/assets/components/ui/Paragraph.svelte";
    import Sprite from "$lib/assets/components/ui/Sprite.svelte";
    import { parseBodyMarkup } from "$lib/utils";
    export let body: string;

    $: parts = parseBodyMarkup(body);
    $: textSide = parts.find(part => part?.type === 'textSide');
    $: listSide = parts.find(part => part?.type === 'listSide');

    import { replaceStringWithCity } from "$lib/utils";

    import { page } from "$app/state";

    let city = $derived(page.data?.currentCity);
</script>

{#if body && textSide && listSide}
    <section class="body">
        <Container>
            <div class="body-row">
                <div class="text-side">
                    <Headline title={replaceStringWithCity(textSide.title, city)} level={2} levelStyle={2} />
                    {#if Array.isArray(textSide.paragraphs) && textSide.paragraphs.length}
                        <div class="text-side__content">
                            {#each textSide.paragraphs as text}
                                <Paragraph text={replaceStringWithCity(text, city)} size="p" weight="400" />
                            {/each}
                        </div>
                    {/if}
                </div>
                {#if Array.isArray(listSide.items) && listSide.items.length}
                    <div class="list-side">
                        <Headline title={replaceStringWithCity(listSide.title, city)} level={3} levelStyle={4} />
                        <ul class="list">
                            {#each listSide.items as text}
                                <li class="list-item">
                                    <span class="list-item__checked">
                                        <Sprite id="checked" />
                                    </span>
                                    <Paragraph text={replaceStringWithCity(text, city)} size="p" weight="400" />
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        </Container>
    </section>    
{/if}

<style>
    .body-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: var(--s-h-400);
        align-items: start;
    }

    .text-side {
        max-width: 550px;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-700);
    }

    .text-side__content {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-600);
        max-width: 450px;
    }

    .list-side {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-600);
        background-color: var(--c-white);
        border-radius: 10px;
        padding-inline: var(--s-h-400);
        padding-block: var(--s-v-1000);
    }

    .list {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-400);
        list-style: none;
    }

    .list-item {
        position: relative;
        padding-left: 30px;
    }

    .list-item__checked {
        position: absolute;
        left: 0;
        top: 4px;
        display: inline-block;
        width: 16px;
        height: 12px;
    }

    @media (max-width: 991px) {
        .body-row {
            grid-template-columns: minmax(0, 1fr);
            row-gap: var(--s-v-1000);
        }
    }
</style>
