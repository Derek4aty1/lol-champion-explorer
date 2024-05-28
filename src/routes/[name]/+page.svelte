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
	<a
		href="/"
		class="ui-button mb-4 ml-12 mt-8 self-start
			   smartwatch:mb-4 smartwatch:ml-6 smartwatch:mt-8
			   portrait:mb-4 portrait:ml-6 portrait:mt-8">&laquo; All Champions</a
	>
	<div
		class="mx-12 my-4 flex items-center justify-center gap-x-8 gap-y-4
			   smartwatch:mx-6 smartwatch:flex-col smartwatch:flex-wrap
			   portrait:mx-6 portrait:flex-col portrait:flex-wrap"
	>
		<SplashSlideshow {skins} class="w-1/2 smartwatch:w-full portrait:w-full" />
		<div class="w-1/2 smartwatch:w-full portrait:w-full">
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
