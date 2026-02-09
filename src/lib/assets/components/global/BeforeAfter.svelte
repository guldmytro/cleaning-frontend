<script lang="ts">
  export let before: string | null;
  export let after: string;

  import { onMount } from "svelte";

  let container: HTMLDivElement;
  let slider: HTMLDivElement;
  let isDragging = false;

  let clipX = 0; // координата шторки від лівого краю

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    isDragging = true;
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    let x: number;
    if (e instanceof MouseEvent) x = e.clientX;
    else x = e.touches[0].clientX;

    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    clipX = offsetX;

    slider.style.left = clipX - slider.offsetWidth / 2 + "px";
  };

  onMount(() => {
    const w = container.offsetWidth;
    clipX = w / 2;
    slider.style.left = clipX - slider.offsetWidth / 2 + "px";
  });
</script>

{#if before}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
    class="before-after"
    bind:this={container}
    onmouseup={stopDrag}
    onmouseleave={stopDrag}
    ontouchend={stopDrag}
    onmousemove={onDrag}
    ontouchmove={onDrag}
    >
    <img src={after} alt="after" class="after-img" loading="lazy">

        <img
            src={before}
            alt="before"
            class="before-img"
            style="clip-path: inset(0 calc(100% - {clipX}px) 0 0);"
            loading="lazy"
        >

        <div
            class="slider"
            bind:this={slider}
            onmousedown={startDrag}
            ontouchstart={startDrag}
        >
            <button type="button" aria-label="change size"></button>
        </div>
    </div>
{/if}

<style>
    .before-after {
        position: relative;
        width: 100%;
        height: 500px;
        overflow: hidden;
        border-radius: 10px;
        user-select: none;
    }

    .before-after img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .after-img {
        z-index: 1;
    }

    .before-img {
        z-index: 2;
    }

    .slider {
        position: absolute;
        top: 0;
        width: 2px;
        height: 100%;
        background: #fff;
        z-index: 3;
        cursor: ew-resize;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
    }

    .slider button {
        width: 8px;
        height: 110px;
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: var(--c-accent);
        border: none;
        transform: translate(-50%, -50%);
        cursor: ew-resize;
    }

    @media (max-width: 834px) {
        .before-after {
            height: clamp(350px, calc(227.3px + 32.68vw), 500px);
        }
    }
</style>
