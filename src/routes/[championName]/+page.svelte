<script lang="ts">
	import AbilityCard from '$components/AbilityCard.svelte';
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
	let abilities = $derived([champion.passive, ...champion.spells]);
	let activeAbilityIndex = $state(0);

	let loreTextElement: HTMLElement | null = $state(null);
	$effect.pre(() => {
		if (loreTextElement) {
			loreTextElement.style.opacity = '0';
		}
	});

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	function turnHTMLElementOpaque(event: CustomEvent & { currentTarget: EventTarget & HTMLElement }) {
		event.currentTarget.style.opacity = '1';
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
				<p bind:this={loreTextElement} in:fade={{ delay: 1250, duration: 1250 }} onintroend={turnHTMLElementOpaque}>
					{@html champion.lore}
				</p>
			{/if}
		</div>
	</div>
</section>

<section class="flex flex-auto flex-col items-center justify-center px-6 py-8 lg:px-12">
	<hr class="w-full border-gold-4" />

	<div class="flex w-full flex-col items-center justify-center">
		<h1 class="my-8 w-full text-3xl italic text-gold-1">ABILITIES</h1>
		<div class="grid w-fit grid-cols-5 gap-x-4">
			{#each abilities as ability, index}
				<AbilityCard {index} {ability} bind:activeAbilityIndex />
			{/each}
		</div>
		<p class="mt-8 min-h-24 max-w-full lg:max-w-[50%]">
			{#if mounted}
				{@html parseHTMLStyling(abilities[activeAbilityIndex].description)}
			{/if}
		</p>
	</div>
</section>
