<script lang="ts">
	import { m } from "$lib/paraglide/messages";
    import Button from "./Button.svelte";
    import Sprite from "./Sprite.svelte";

	let { files = $bindable<File[]>() } = $props();

	let inputRef: HTMLInputElement;
	let isDragging = $state(false);

	const MAX_SIZE = 10 * 1024 * 1024; // 10MB
	const ACCEPTED = ['image/jpeg', 'image/png'];

	// preview urls (cleaned automatically)
	let previews = $derived(
		files.map((file: any) => ({
			file,
			url: URL.createObjectURL(file)
		}))
	);

	$effect(() => {
		return () => {
			previews.forEach((p: any) => URL.revokeObjectURL(p.url));
		};
	});

	function validate(selected: FileList | null) {
		if (!selected) return [];

		return Array.from(selected).filter((file) => {
			if (!ACCEPTED.includes(file.type)) return false;
			if (file.size > MAX_SIZE) return false;
			return true;
		});
	}

	function addFiles(selected: FileList | null) {
		const valid = validate(selected);
		files = [...files, ...valid];
	}

	function removeFile(index: number) {
		files = files.filter((_, i) => i !== index);
	}

	function openDialog() {
		inputRef.click();
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		addFiles(e.dataTransfer?.files ?? null);
	}
</script>

<div class="upload">
    <p class="upload__label">{m.stage2Photo()}</p>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class={`dropzone ${isDragging ? 'dragging' : ''}`}
		ondragover={() => (isDragging = true)}
		ondragleave={() => (isDragging = false)}
		ondrop={onDrop}
	>
		<input
			bind:this={inputRef}
			type="file"
			accept="image/png,image/jpeg"
			multiple
			hidden
			onchange={(e) => addFiles((e.target as HTMLInputElement).files)}
		/>
		<p class="title">{@html m.stage2PhotoTitle()}</p>
		<p class="subtitle">{m.stage2PhotoSubtitle()}</p>
        <Button type="button" text="Browse" size="extra-small" style="ghost" onClick={() => openDialog()} />
	</div>

	{#if files.length}
		<div class="preview">
			{#each previews as p, i}
				<div class="thumb">
					<button class="remove" type="button" onclick={() => removeFile(i)}>
                        <span class="icon">
                            <Sprite id="remove" />
                        </span>
                    </button>
					<img src={p.url} alt={p.file.name} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.upload {
		display: flex;
		flex-direction: column;
	}

    .upload__label {
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        margin-bottom: var(--s-v-250);
    }

	.dropzone {
        position: relative;
		display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--c-theme);
        flex-grow: 1;
        padding: 10px var(--s-h-300);
        border-radius: 5px;
		text-align: center;
	}

    .dropzone::before {
        content: '';
        display: block;
        position: absolute;
        inset: 10px;
        border: 1px dashed #616D76;
        border-radius: 5px;
        pointer-events: none;
    }

	.dropzone.dragging {
		background: #e2e8f0;
		border-color: #94a3b8;
	}

	.title {
		font-size: var(--p-s);
		font-weight: 600;
	}

	.subtitle {
		margin-top: var(--s-v-100);
        margin-bottom: var(--s-v-300);
        font-size: var(--p-xs);
        font-weight: 600;
        line-height: 1;
        color: #616D76;
	}

	.preview {
        padding-top: var(--s-v-250);
		display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 6px;
	}

	.thumb {
        position: relative;
		width: 100%;
        aspect-ratio: 1;
        border-radius: 5px;
        overflow: hidden;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.remove {
        display: flex;
        justify-content: center;
        align-items: center;
		position: absolute;
		background: linear-gradient(0deg, rgba(238, 243, 247, 0.60) 0%, rgba(238, 243, 247, 0.60) 100%);
		border: none;
		color: #FF0000;
		cursor: pointer;
        inset: 0;
        opacity: 0;
        transition: opacity 180ms ease;
	}

    .icon {
        width: 19px;
        height: 19px;
    }

    .remove:hover {
        opacity: 1;
    }

	@media (max-width: 991px) {
		.dropzone {
			height: 245px;
		}

		.preview {
			display: flex;
			flex-flow: row wrap;
		}

		.thumb {
			width: 81px;
			height: 81px;
		}
	}

	@media (max-width: 575px) {
		.dropzone {
			height: 190px;
		}
	}
</style>
