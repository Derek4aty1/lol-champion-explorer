<script lang="ts">
	import Slideshow, { type SlideshowImage } from '$components/Slideshow.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const ABILITY_LABELS = ['Passive', 'Q', 'W', 'E', 'R'];

	let { data } = $props();

	let champion = $derived(data.splashChampion);
	let splashSkins: SlideshowImage[] = $derived(
		champion.skins.map((skin) => ({
			url: skin.splashUrl,
			alt: `Splash art for ${skin.name} skin`,
			label: skin.name
		}))
	);
	let abilities = $derived([champion.passive, ...champion.spells]);
	let currentAbilityIndex = $state(0);

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

	function parseHTMLStyling(htmlString: string) {
		// Only replace 2(+) consecutive <br> tags with a single <br>
		const parsedString = htmlString.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');
		return parsedString;
	}
</script>

<svelte:head>
	{#each abilities as ability}
		<link rel="preload" as="image" href={ability.imageUrl} />
	{/each}
	<title>{champion.name} - League of Legends Champion Explorer</title>
</svelte:head>

<section
	class="flex min-h-fit flex-auto flex-col items-center justify-center px-6 pt-8 lg:min-h-[calc(100svh-64px)] lg:px-12 lg:py-0"
>
	<a href="/" class="ui-button mb-8 place-self-start">&laquo; All Champions</a>
	<div class="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:flex-row lg:flex-nowrap">
		<Slideshow images={splashSkins} class="w-full lg:w-1/2" />
		<div class="w-full lg:w-1/2">
			<!-- TODO: revisit once transitions are fixed -->
			{#if mounted}
				<h1 in:fly={{ y: 50, duration: 1250 }} class="mb-2 text-3xl italic text-gold-4">
					{champion.name.toUpperCase()}, {champion.title.toUpperCase()}
				</h1>
				<p bind:this={loreTextElement} in:fade={{ delay: 1250, duration: 1250 }} onintroend={turnLoreTextElementOpaque}>
					{@html champion.lore}
				</p>
			{/if}
		</div>
	</div>
</section>

<section class="flex flex-auto flex-col items-center justify-center px-6 py-8 lg:px-12">
	{#if mounted}
		<hr class="w-full border-gold-4" />

		<div class="flex w-full flex-col items-center justify-center">
			<h1 class="my-8 w-full text-3xl italic text-gold-1">ABILITIES</h1>
			<div class="grid w-fit grid-cols-5 gap-x-4">
				{#each abilities as ability, index}
					<button
						onclick={() => (currentAbilityIndex = index)}
						class="flex-start flex max-w-[128px] flex-col items-center transition duration-200
						       hover:scale-105 {currentAbilityIndex === index ? '' : 'brightness-50'}"
					>
						<figure class="flex flex-col items-center">
							<figcaption class="text-center text-gold-4">{ABILITY_LABELS[index]}</figcaption>
							<img src={ability.imageUrl} alt="Icon for {ability.name} ability" class="m-2 max-h-[64px] max-w-[64px]" />
							<figcaption class="text-balance">{ability.name}</figcaption>
						</figure>
					</button>
				{/each}
			</div>
			<p class="mt-8 min-h-24 max-w-full lg:max-w-[50%]">
				{@html parseHTMLStyling(abilities[currentAbilityIndex].description)}
			</p>
		</div>
	{/if}
</section>
