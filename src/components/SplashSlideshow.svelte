<script context="module" lang="ts">
	export type Skin = {
		name: string;
		splashUrl: string;
	};
</script>

<script lang="ts">
	export let skins: Skin[];
	$: skinIndex = skins ? 0 : 0; // Reset when skins change...
	$: currentSkin = skins[skinIndex];

	function previousSkinSplash() {
		skinIndex = skinIndex === 0 ? skins.length - 1 : skinIndex - 1;
	}

	function nextSkinSplash() {
		skinIndex = (skinIndex + 1) % skins.length;
	}
</script>

<svelte:head>
	<!-- Preload previous, current, and next skins -->
	{#key currentSkin}
		<link rel="preload" as="image" href={skins[skinIndex === 0 ? skins.length - 1 : skinIndex - 1].splashUrl} />
		<link rel="preload" as="image" href={skins[skinIndex].splashUrl} />
		<link rel="preload" as="image" href={skins[skinIndex === skins.length - 1 ? 0 : skinIndex + 1].splashUrl} />
	{/key}
</svelte:head>

<figure class={$$restProps.class || ''}>
	<div class="relative min-w-full">
		<!-- Previous and next skin button pseudo elements for gradient transitions -->
		<button
			type="button"
			on:click={previousSkinSplash}
			class="absolute left-0 top-1/2 z-[1] h-full w-1/3 -translate-y-1/2 transform rounded-r pl-4 text-left opacity-70 transition duration-200
                   after:absolute after:left-0 after:top-0 after:z-[2] after:h-full after:w-full
                   after:bg-gradient-to-r after:from-gray-3 after:to-transparent after:opacity-0 after:transition after:duration-200 after:content-['']
                   hover:opacity-100 after:hover:opacity-100"
		>
			<span class="relative z-[3]">&#10094;</span>
		</button>
		<img
			src={currentSkin.splashUrl}
			alt={`Splash art for ${currentSkin.name} skin`}
			class="aspect-[1215/717] w-full min-w-full max-w-[1215px] bg-loading-spinner-white bg-20% bg-center bg-no-repeat smartwatch:w-full portrait:w-full"
		/>
		<button
			type="button"
			on:click={nextSkinSplash}
			class="absolute right-0 top-1/2 z-[1] h-full w-1/3 -translate-y-1/2 transform rounded-l pr-4 text-right opacity-70 transition duration-200
                   after:absolute after:left-0 after:top-0 after:z-[2] after:h-full after:w-full
                   after:bg-gradient-to-l after:from-gray-3 after:to-transparent after:opacity-0 after:transition after:duration-200 after:content-['']
                   hover:opacity-100 after:hover:opacity-100"
		>
			<span class="relative z-[3]">&#10095;</span>
		</button>
	</div>
	<figcaption class="mt-3 text-gray-1">{currentSkin.name}</figcaption>
</figure>
