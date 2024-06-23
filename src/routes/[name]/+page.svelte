<script lang="ts">
	import SplashSlideshow, { type Skin } from '$components/SplashSlideshow.svelte';

	export let data;

	$: champion = data.splashChampion;
	$: skins = champion.skins.map((skin) => ({ name: skin.name, splashUrl: skin.splashUrl }) as Skin);
	$: previousChampName = data.previousChampName;
	$: nextChampName = data.nextChampName;
</script>

<svelte:head>
	<!-- <link rel="preload" as="image" href={champion.passive.imageUrl} />
	{#each champion.spells as spell}
		<link rel="preload" as="image" href={spell.imageUrl} />
	{/each} -->
	<title>{champion.name} - League of Legends Champion Explorer</title>
</svelte:head>

<section class="flex flex-auto flex-col items-center justify-center">
	<a href="/" class="ui-button mb-4 ml-6 mt-8 self-start lg:mb-4 lg:ml-12 lg:mt-8">&laquo; All Champions</a>
	<div
		class="mx-6 my-4 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:mx-12 lg:flex-row lg:flex-nowrap"
	>
		<SplashSlideshow {skins} class="w-full lg:w-1/2" />
		<div class="w-full lg:w-1/2">
			<h1 class="mb-2 text-3xl italic text-gold-4">{champion.name.toUpperCase()}, {champion.title.toUpperCase()}</h1>
			<p>{champion.lore}</p>
		</div>
	</div>
	<nav class="my-8 flex justify-center gap-4">
		{#if previousChampName}
			<a class="ui-button" href="/{previousChampName}">&laquo; {previousChampName}</a>
		{/if}
		{#if nextChampName}
			<a class="ui-button" href="/{nextChampName}">{nextChampName} &raquo;</a>
		{/if}
	</nav>
</section>
