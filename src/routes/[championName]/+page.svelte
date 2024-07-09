<script lang="ts">
	import Slideshow, { type SlideshowImage } from '$components/Slideshow.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let { data } = $props();

	let champion = $derived(data.splashChampion);
	let splashSkins: SlideshowImage[] = $derived(
		champion.skins.map((skin) => ({
			url: skin.splashUrl,
			alt: `Splash art for ${skin.name} skin`,
			label: skin.name
		}))
	);

	let loreTextElement: HTMLElement | null = $state(null);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	$effect.pre(() => {
		if (loreTextElement) {
			loreTextElement.style.opacity = '0';
		}
	});

	function turnLoreTextElementOpaque() {
		if (loreTextElement) {
			loreTextElement.style.opacity = '1';
		}
	}
</script>

<svelte:head>
	<!-- <link rel="preload" as="image" href={champion.passive.imageUrl} />
	{#each champion.spells as spell}
		<link rel="preload" as="image" href={spell.imageUrl} />
	{/each} -->
	<title>{champion.name} - League of Legends Champion Explorer</title>
</svelte:head>

<section class="flex flex-auto flex-col items-center justify-center">
	<a class="ui-button ml-6 mt-8 self-start lg:ml-12 lg:mt-8" href="/">&laquo; All Champions</a>
	<div
		class="flex w-full flex-col flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-8 lg:flex-row lg:flex-nowrap lg:px-12"
	>
		<Slideshow images={splashSkins} class="w-full lg:w-1/2" />
		<div class="w-full lg:w-1/2">
			<!-- TODO: revisit once transitions are fixed -->
			{#if mounted}
				<h1 in:fly={{ y: 50, duration: 1250 }} class="mb-2 text-3xl italic text-gold-4">
					{champion.name.toUpperCase()}, {champion.title.toUpperCase()}
				</h1>
				<p bind:this={loreTextElement} in:fade={{ delay: 1250, duration: 1250 }} onintroend={turnLoreTextElementOpaque}>
					{champion.lore}
				</p>
			{/if}
		</div>
	</div>
</section>
