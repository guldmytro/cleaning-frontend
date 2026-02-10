<script lang="ts">
    import type { Result } from "$lib/types/result";
    import Container from "$lib/assets/components/global/Container.svelte";
    import SectionHeader from "$lib/assets/components/global/SectionHeader.svelte";
    import Button from "$lib/assets/components/ui/Button.svelte";
    import Field from "$lib/assets/components/ui/Field.svelte";
    import Headline from "$lib/assets/components/ui/Headline.svelte";
    import { m } from "$lib/paraglide/messages";
    import BeforeAfterSlider from "$lib/assets/components/global/BeforeAfterSlider.svelte";

    let { results } : { results: Result[] } = $props();
    let phone = $state('');
    let name = $state('');
    
</script>

{#if Array.isArray(results) && results.length}
    <section class="results">
        <Container>
            <div class="results-row">
                <div class="results-col gr">
                    <SectionHeader 
                        title={m.resultsTitle()} 
                        description={m.resultsSubtitle()}
                        maxWidths={[550, 550]} />
                    <form class="form-simple gr">
                        <div class="form-simple-header">
                            <Headline title={m.resultsFormTitle()} 
                            level={3} levelStyle={5} />
                        </div>
                        <div class="form-simple__fields">
                            <Field 
                                name="phone" 
                                placeholder="+41 79 123 45 67" 
                                label={m.phone()} 
                                required={true}
                                value={phone}
                                type="tel"
                                handleInput={(value) => phone = value}
                                />
                            <Field 
                                name="name" 
                                placeholder="+41 79 123 45 67" 
                                label={m.name()} 
                                required={true}
                                value={name}
                                type="text"
                                handleInput={(value) => name = value}
                                />
                            <Button type="button" size="small" style="default" text={m.send()}/>
                        </div>
                    </form>
                </div>
                <BeforeAfterSlider {results} />
            </div>
        </Container>
    </section>
{/if}

<style>
    .results-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
        column-gap: var(--s-h-400);
    }

    .results-col {
        row-gap: var(--s-v-800);
        position: relative;
        z-index: 200;
    }

    .form-simple {
        row-gap: var(--s-v-500);
        padding: var(--s-v-900) var(--s-h-400);
        background-color: var(--c-white);
        border-radius: 10px;
    }

    .form-simple-header {
        max-width: 350px;
    }

    .form-simple__fields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
        align-items: end;
    }

    @media (max-width: 991px) {
        .results-col {
            display: contents;
        }

        .results-row {
            display: flex;
            flex-flow: column nowrap;
            row-gap: var(--s-v-1000);
        }

        .form-simple {
            order: 3;
            margin-top: calc(var(--s-v-1000) * (-1) - 30px);
            z-index: 40;
            width: 100%;
            max-width: 630px;
        }

        .form-simple__fields {
            grid-template-columns: 1fr 1fr auto;
        }
    }

    @media (max-width: 575px) {
        .form-simple__fields {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>