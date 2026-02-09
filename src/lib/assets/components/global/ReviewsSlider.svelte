<script lang="ts">
    import type { Review } from "$lib/types/review";
    import Glide from "@glidejs/glide";
    import { onMount, onDestroy } from "svelte";
    import SliderArrow from "../ui/SliderArrow.svelte";
    import ReviewEl from "./ReviewEl.svelte";

    export let reviews: Review[];

    let slider: HTMLDivElement;
    let glide: Glide;

    onMount(() => {
        if (!slider) return;
        glide = new Glide(slider, {
            type: "slider",
            perView: 2,
            gap: 20,
            bound: true,
            breakpoints: {
                767: {
                    perView: 1,
                    gap: 10,
                }
            }
        });

        glide.mount();
    });

    onDestroy(() => {
        glide?.destroy();
    });
</script>

<div class="glide" bind:this={slider}>
    <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
            {#each reviews as review}
                <li class="glide__slide img">
                    <ReviewEl {review}  />
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