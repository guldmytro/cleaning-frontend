<script lang="ts">
    import type { Result } from "$lib/types/result";
    import Glide from "@glidejs/glide";
    import { onMount, onDestroy } from "svelte";
    import BeforeAfter from "./BeforeAfter.svelte";
    import SliderArrow from "../ui/SliderArrow.svelte";
    import { afterNavigate } from "$app/navigation";

    export let results: Result[];

    let slider: HTMLDivElement;
    let glide: Glide;

    onMount(() => {
        if (!slider) return;
        glide = new Glide(slider, {
            type: "slider",
            perView: 1,
            dragThreshold: false,
            swipeThreshold: false,
            gap: 20,
            breakpoints: {
                991: {
                    gap: 10
                }
            }
        });

        glide.mount();
    });

    onDestroy(() => {
        glide?.destroy();
    });

    afterNavigate(() => {
        if (!slider) return;
        glide = new Glide(slider, {
            type: "slider",
            perView: 1,
            dragThreshold: false,
            swipeThreshold: false,
            gap: 20,
            breakpoints: {
                991: {
                    gap: 10
                }
            }
        });

        glide.mount();
    })
</script>

{#if Array.isArray(results) && results.length}
    <div class="glide" bind:this={slider}>
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                {#each results as result (result.photo_after)}
                    <li class="glide__slide img">
                        <BeforeAfter before={result.photo_before} after={result.photo_after} />
                    </li>
                {/each}
            </ul>
        </div>   
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                <SliderArrow direction="left" ariaLabel="previous slide" />
            </button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                <SliderArrow direction="right" ariaLabel="next slide" />
            </button>
        </div>
    </div>
{/if}