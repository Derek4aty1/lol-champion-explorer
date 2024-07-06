<script lang="ts">
	import Slideshow, { type SlideshowImage } from '$components/Slideshow.svelte';
	let { data } = $props();

	let champion = $derived(data.splashChampion);
	let splashSkins: SlideshowImage[] = $derived(
		champion.skins.map((skin) => ({
			url: skin.splashUrl,
			alt: `Splash art for ${skin.name} skin`,
			label: skin.name
		}))
	);
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
		class="mx-6 my-8 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:mx-12 lg:flex-row lg:flex-nowrap"
	>
		<Slideshow images={splashSkins} class="w-full lg:w-1/2" />
		<div class="w-full lg:w-1/2">
			<h1 class="mb-2 text-3xl italic text-gold-4">{champion.name.toUpperCase()}, {champion.title.toUpperCase()}</h1>
			<p>{champion.lore}</p>
		</div>
	</div>
</section>
