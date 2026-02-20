<script lang="ts">
    import Paragraph from "./Paragraph.svelte";

    export let type: 'text' | 'tel' | 'email';
    export let label: string;
    export let value: string;
    export let name: string;
    export let placeholder: string;
    export let required: boolean;
    export let handleInput: (value: string) => void;
    export let rows = 0;
    export let helpText: string | null = null;
</script>

<div class="label-wrapper">
    <label class="label">
        <span class="label__text">{label}{#if required}&nbsp;*{/if}</span>
        {#if rows}
            <textarea
                class="label__field" 
                {name} 
                {placeholder} 
                {required}
                {rows}
                bind:value={value}
                oninput={() => handleInput(value)}></textarea>
        {:else}
            <input class="label__field" 
                {name} {type} {placeholder}
                {required}
                bind:value={value}
                oninput={() => handleInput(value)}>
        {/if}
    </label>
    {#if helpText}
        <div class="label-wrapper-text">
            <Paragraph text={helpText} size="p-xs" weight="400" />
        </div>
    {/if}
</div>

<style>
    .label {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-250);
    }

    .label__text {
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
    }

    .label__field {
        padding: 20px;
        font-size: var(--p-xs);
        border-radius: 5px;
        border-color: transparent;
        font-weight: normal;
        line-height: 1;
        background-color: var(--c-theme);
        border: none;
        resize: none;
        font-family: inherit;
    }

    .label__field:focus {
        outline: none;
    }

    .label-wrapper {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-200);
    }

    .label-wrapper-text {
        opacity: 0.7;
    }
</style>