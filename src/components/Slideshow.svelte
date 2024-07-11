<script context="module" lang="ts">
	export type SlideshowImage = {
		url: string;
		alt: string;
		label: string;
	};
</script>

<script lang="ts">
	import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import { onMount } from 'svelte';

	type Props = {
		images: SlideshowImage[];
		class?: string;
		autoplay?: boolean;
		durationMs?: number;
	};
	let { images, class: className = '', autoplay = true, durationMs = 5000 }: Props = $props();

	let currentImageIndex = $state(0);
	let currentImageLabel = $derived(images[currentImageIndex].label);
	let progressBarWidthStyle = $derived(`${((currentImageIndex + 1) / images.length) * 100}%`);
	let firstImageLoaded = $state(false);

	onMount(() => {
		const image = document.getElementById('image-0') as HTMLImageElement;
		if (image.complete) {
			firstImageLoaded = true;
		} else {
			image.onload = () => {
				firstImageLoaded = true;
			};
		}
	});

	let emblaApi: EmblaCarouselType;
	let options: EmblaOptionsType = { loop: true, duration: 20 };
	let plugins = autoplay
		? [Autoplay({ delay: durationMs, stopOnInteraction: false, stopOnMouseEnter: true, stopOnLastSnap: true })]
		: [];

	function onEmblaInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		emblaApi.on('select', () => (currentImageIndex = emblaApi.selectedScrollSnap()));
	}

	function previousImage(event: MouseEvent) {
		emblaApi.scrollPrev();
		blurIfMouseClick(event);
	}

	function nextImage(event: MouseEvent) {
		emblaApi.scrollNext();
		blurIfMouseClick(event);
	}

	/** Enabling opacity change on focus for mobile users, so removing focus from previous and next buttons on desktop mouse click */
	function blurIfMouseClick(event: MouseEvent) {
		if (!event) return;

		const mouseClick = !(event.screenX == 0 && event.screenY == 0);
		if (mouseClick) {
			const button = event.target as HTMLElement;
			button?.blur();
		}
	}
</script>

<svelte:head>
	<!-- All images are lazy loaded except readily available previous, current, and next images. This saves bandwidth as loading all images at once is unnecessary if the user navigates away before seeing them all. -->
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
</svelte:head>

<!-- svelte-ignore event_directive_deprecated -->
<div
	use:emblaCarouselSvelte={{ options, plugins }}
	on:emblaInit={onEmblaInit}
	class="embla-root relative overflow-hidden transition-opacity duration-[1250ms] {className}"
	style={firstImageLoaded ? 'opacity: 1;' : 'opacity: 0;'}
>
	<div class="relative flex gap-4">
		{#each images as image, i}
			<img
				src={image.url}
				alt={image.alt}
				loading="lazy"
				id="image-{i}"
				class="aspect-[1215/717] min-w-0 flex-shrink-0 flex-grow-0 basis-full
					   {i === images.length - 1 ? 'mr-4' : ''}"
			/>
		{/each}
	</div>
	<p class="mt-3 text-center italic text-gray-1">{currentImageLabel}</p>
	<div class="absolute bottom-8 left-0 h-1 w-full bg-gray-2">
		<div class="tranistion-width h-full bg-blue-4 duration-500" style="width: {progressBarWidthStyle};"></div>
	</div>
	<div class="absolute top-1/2 flex w-full -translate-y-[calc(50%+18px)] transform justify-between">
		<button class="bg-black p-2 text-white opacity-50 hocus:opacity-100" on:click={previousImage}>&#10094;</button>
		<button class="bg-black p-2 text-white opacity-50 hocus:opacity-100" on:click={nextImage}>&#10095;</button>
	</div>
</div>
