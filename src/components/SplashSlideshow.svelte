<script context="module" lang="ts">
	export type SplashSkin = {
		name: string;
		splashUrl: string;
	};
</script>

<script lang="ts">
	type Props = {
		skins: SplashSkin[];
		class?: string;
	};
	let { skins, class: className = '' }: Props = $props();
	let currentSkinIndex = $state(0);
	let currentSkin = $derived(skins[currentSkinIndex]);

	function changeSkinSplash(event: MouseEvent, next: boolean) {
		const mouseClick = !(event.screenX == 0 && event.screenY == 0);
		if (mouseClick) {
			const target = event.target as HTMLElement;
			target?.blur();
		}

		if (next) {
			currentSkinIndex = (currentSkinIndex + 1) % skins.length;
		} else { // previous
			currentSkinIndex = currentSkinIndex === 0 ? skins.length - 1 : currentSkinIndex - 1;
		}
	}
</script>

<svelte:head>
	<!-- Preload previous, current, and next skins -->
	{#key currentSkin}
		<link
			rel="preload"
			as="image"
			href={skins[currentSkinIndex === 0 ? skins.length - 1 : currentSkinIndex - 1].splashUrl}
		/>
		<link rel="preload" as="image" href={skins[currentSkinIndex].splashUrl} />
		<link
			rel="preload"
			as="image"
			href={skins[currentSkinIndex === skins.length - 1 ? 0 : currentSkinIndex + 1].splashUrl}
		/>
	{/key}
</svelte:head>

<figure class={className}>
	<div class="relative min-w-full">
		<!-- Previous and next skin button pseudo elements for gradient transitions -->
		<button
			type="button"
			onclick={(event) => changeSkinSplash(event, false)}
			class="absolute left-0 top-1/2 z-[1] h-full w-1/3 -translate-y-1/2 pl-4 text-left opacity-70 transition duration-200
                   after:absolute after:left-0 after:top-0 after:z-[2] after:h-full after:w-full
                   after:bg-gradient-to-r after:from-gray-3 after:to-transparent after:opacity-0 after:transition after:duration-200 after:content-['']
                   hocus:opacity-100 after:hocus:opacity-100"
		>
			<span class="relative z-[3]">&#10094;</span>
		</button>
		<img
			src={currentSkin.splashUrl}
			alt={`Splash art for ${currentSkin.name} skin`}
			class="aspect-[1215/717] w-full max-w-[1215px] bg-throbber-white bg-20% bg-center bg-no-repeat"
		/>
		<button
			type="button"
			onclick={(event) => changeSkinSplash(event, true)}
			class="absolute right-0 top-1/2 z-[1] h-full w-1/3 -translate-y-1/2 pr-4 text-right opacity-70 transition duration-200
                   after:absolute after:left-0 after:top-0 after:z-[2] after:h-full after:w-full
                   after:bg-gradient-to-l after:from-gray-3 after:to-transparent after:opacity-0 after:transition after:duration-200 after:content-['']
                   hocus:opacity-100 after:hocus:opacity-100"
		>
			<span class="relative z-[3]">&#10095;</span>
		</button>
	</div>
	<figcaption class="mt-3 text-gray-1">{currentSkin.name}</figcaption>
</figure>
