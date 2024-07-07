<script context="module" lang="ts">
	export type SlideshowImage = {
		url: string;
		alt: string;
		label: string;
	};
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Props = {
		images: SlideshowImage[];
		class?: string;
		autoplay?: boolean;
		durationMs?: number;
	};
	let { images, class: className = '', autoplay = true, durationMs = 5000 }: Props = $props();

	let currentImageIndex = $state(0);
	let imageXOffset = $derived(-100 * currentImageIndex);
	let autoplayIntveralId: number | null = $state(null);
	let softTransition = $state(true);

	onMount(() => {
		if (autoplay) startAutoplay();
	});

	onDestroy(() => {
		if (autoplay) stopAutoplay();
	});

	function previousImage(event: MouseEvent) {
		currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
		softTransition = currentImageIndex === images.length - 1 ? false : true; // Wrapping around
		blurIfMouseClick(event);
	}

	function nextImage(event: MouseEvent) {
		currentImageIndex = (currentImageIndex + 1) % images.length;
		softTransition = currentImageIndex === 0 ? false : true; // Wrapping around
		if (autoplay && currentImageIndex === images.length - 1) stopAutoplay(); // Reached last image
		blurIfMouseClick(event);
	}

	/** Enabling opacity change on focus for mobile users, so blurring previous and next buttons on desktop mouse click */
	function blurIfMouseClick(event: MouseEvent) {
		if (!event) return;
		
		const mouseClick = !(event.screenX == 0 && event.screenY == 0);
		if (mouseClick) {
			const button = event.target as HTMLElement;
			button?.blur();
		}
	}

	function startAutoplay() {
		if (autoplayIntveralId !== null || currentImageIndex === images.length - 1) return;

		autoplayIntveralId = setInterval(nextImage, durationMs);
	}

	function stopAutoplay() {
		if (autoplayIntveralId === null) return;

		clearInterval(autoplayIntveralId);
		autoplayIntveralId = null;
	}
</script>

<svelte:head>
	<!-- Preload previous, current, and next images -->
	{#key currentImageIndex}
		<link
			rel="preload"
			as="image"
			href={images[currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1].url}
		/>
		<link rel="preload" as="image" href={images[currentImageIndex].url} />
		<link
			rel="preload"
			as="image"
			href={images[currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1].url}
		/>
	{/key}
</svelte:head>

<div
	class="{className} relative overflow-hidden"
	role="region"
	aria-label="Image slideshow"
	onmouseenter={stopAutoplay}
	onmouseleave={startAutoplay}
>
	<div
		class="relative flex gap-4 transition-transform ease-in-out {softTransition ? 'duration-500' : 'duration-0'}"
		style="transform: translateX(calc({imageXOffset}% - {currentImageIndex} * 1rem));"
	>
		{#each images as image}
			<img
				class="aspect-[1215/717] min-w-full bg-throbber-white bg-20% bg-center bg-no-repeat"
				src={image.url}
				alt={image.alt}
				loading="lazy"
			/>
		{/each}
	</div>
	<p class="mt-3 text-center italic text-gray-1">{images[currentImageIndex].label}</p>
	<div class="absolute bottom-8 left-0 h-1 w-full bg-gray-2">
		<div
			class="tranistion-width h-full bg-blue-4 {softTransition ? 'duration-500' : 'duration-0'}"
			style="width: {((currentImageIndex + 1) / images.length) * 100}%;"
		></div>
	</div>
	<div class="absolute top-1/2 flex w-full -translate-y-[calc(50%+18px)] transform justify-between">
		<button class="bg-black p-2 text-white opacity-50 hocus:opacity-100" onclick={previousImage}>&#10094;</button>
		<button class="bg-black p-2 text-white opacity-50 hocus:opacity-100" onclick={nextImage}>&#10095;</button>
	</div>
</div>
