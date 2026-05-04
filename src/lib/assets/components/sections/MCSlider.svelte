<script lang="ts">
    import type { ServiceMenu } from "$lib/types/service";
    import type { CategoryArchive } from "$lib/types/category";
    import Card from "../pages/service/list/Card.svelte";
    import Glide from "@glidejs/glide";
    let { services, category } : { services: ServiceMenu[], category: CategoryArchive } = $props();
    import SliderArrow from "../ui/SliderArrow.svelte";

    let slider: HTMLDivElement;
    let glide: Glide;

    import { onMount, onDestroy } from "svelte";
    import { afterNavigate } from "$app/navigation";

    onMount(() => {
        if (!slider) return;
        glide = new Glide(slider, {
            type: "slider",
            perView: 4,
            dragThreshold: false,
            swipeThreshold: false,
            gap: 20,
            breakpoints: {
                1059: {
                    gap: 10,
                    perView: 3
                },
                790: {
                    gap: 10,
                    perView: 2
                },
                575: {
                    gap: 10,
                    perView: 1
                },
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

{#if Array.isArray(services) && services.length}
    <div class="glide" bind:this={slider}>
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                {#each services as service (service.slug)}
                    <li class="glide__slide">
                        <Card {service} {category} isSlide={true} />   
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