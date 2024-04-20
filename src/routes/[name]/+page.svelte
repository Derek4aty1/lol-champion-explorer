<script lang="ts">
	export let data;

	$: skinIndex = data ? 0 : 0; // Reset when champ changes...
	$: champion = data?.splashChampion;
	$: previousChampName = data?.previousChampName;
	$: nextChampName = data?.nextChampName;
	$: skin = champion?.skins[skinIndex];

	function previousSkinSplash() {
		skinIndex = skinIndex === 0 ? champion.skins.length - 1 : skinIndex - 1;
	}

	function nextSkinSplash() {
		skinIndex = (skinIndex + 1) % champion.skins.length;
	}
</script>

<svelte:head>
	<!-- Preload previous, current, and next skins -->
	{#key skin}
		<link
			rel="preload"
			as="image"
			href={champion.skins[skinIndex === 0 ? champion.skins.length - 1 : skinIndex - 1].splashUrl}
		/>
		<link rel="preload" as="image" href={champion.skins[skinIndex].splashUrl} />
		<link
			rel="preload"
			as="image"
			href={champion.skins[skinIndex === champion.skins.length - 1 ? 0 : skinIndex + 1].splashUrl}
		/>
	{/key}
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
		<figure class="relative flex w-1/2 flex-col items-center smartwatch:w-full portrait:w-full">
			<div class="relative min-w-full">
				<button
					type="button"
					on:click={previousSkinSplash}
					class="absolute left-0 top-1/2 h-full w-1/2 -translate-y-1/2 transform rounded-r pl-4 text-left opacity-70 transition duration-200
						   hover:bg-gradient-to-r hover:from-gray-3 hover:to-transparent hover:opacity-100"
				>
					&#10094;
				</button>
				<img
					src={skin.splashUrl}
					alt={`Splash art for ${skin.name} skin`}
					class="aspect-[1215/717] w-full min-w-full max-w-[1215px] bg-loading-spinner-white bg-20% bg-center bg-no-repeat smartwatch:w-full portrait:w-full"
				/>
				<button
					type="button"
					on:click={nextSkinSplash}
					class="absolute right-0 top-1/2 h-full w-1/2 -translate-y-1/2 transform rounded-l pr-4 text-right opacity-70 transition duration-200
						   hover:bg-gradient-to-l hover:from-gray-3 hover:to-transparent hover:opacity-100"
				>
					&#10095;
				</button>
			</div>
			<figcaption class="mt-3 text-gray-1">{skin.name}</figcaption>
		</figure>
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
