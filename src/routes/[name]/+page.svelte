<script lang="ts">
	export let data;

	$: skinIndex = data ? 0 : 0; // Reset when champ changes...
	$: champion = data?.splashChampion;
	$: previousChampName = data?.previousChampName;
	$: nextChampName = data?.nextChampName;
	$: skin = champion?.skins[skinIndex];

	function changeSkinSplash(event: MouseEvent) {
		const isMouseClick = event.screenX !== 0 && event.screenY !== 0;
		const imageWidth = (event.target as HTMLElement).clientWidth;
		const mouseX = event.offsetX;
		if (isMouseClick && mouseX < imageWidth / 2) {
			// Left side
			skinIndex = skinIndex === 0 ? champion.skins.length - 1 : skinIndex - 1;
		} else {
			// Right side
			skinIndex = (skinIndex + 1) % champion.skins.length;
		}
	}
</script>

<svelte:head>
	<!-- Preload previous, current, and next skins -->
	{#key skin}
		<link rel="preload" as="image" href={champion.skins[skinIndex === 0 ? champion.skins.length - 1 : skinIndex - 1].splashUrl} />
		<link rel="preload" as="image" href={champion.skins[skinIndex].splashUrl} />
		<link rel="preload" as="image" href={champion.skins[skinIndex === champion.skins.length - 1 ? 0 : skinIndex + 1].splashUrl} />
	{/key}
	<!-- <link rel="preload" as="image" href={champion.passive.imageUrl} />
	{#each champion.spells as spell}
		<link rel="preload" as="image" href={spell.imageUrl} />
	{/each} -->
	<title>{champion.name} - League of Legends Champion Explorer</title>
</svelte:head>

<section class="flex flex-col flex-auto justify-center items-center">
	<a href="/" class="ml-12 mt-8 mb-4 tall:mt-8 tall:ml-6 tall:mb-4 self-start ui-button">&laquo; All Champions</a>
	<div class="mx-8 my-4 tall:mx-6 flex tall:flex-col tall:flex-wrap gap-4 justify-center items-center">
		<figure class="flex flex-col items-center w-1/2 tall:w-full">
			<button type="button" on:click={changeSkinSplash} class="mx-4 w-fit tall:w-full min-w-[min(100%-2rem,1215px)] max-w-[1215px]">
				<img
					src={skin.splashUrl}
					alt={`Splash art for ${skin.name} skin`}
					class="aspect-[1215/717] bg-loading-200x200 bg-10% bg-center bg-no-repeat"
				/>
			</button>
			<figcaption class="mt-3 text-gray-1">{skin.name}</figcaption>
		</figure>
		<div class="w-1/2 tall:w-full">
			<h1 class="mb-2 italic text-3xl text-gold-4">{champion.name.toUpperCase()}, {champion.title.toUpperCase()}</h1>
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
