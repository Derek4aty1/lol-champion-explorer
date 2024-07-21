<script lang="ts">
	import PortraitCard from '$components/PortraitCard.svelte';

	let { data } = $props();

	let allChampions = $derived(data.homePageChampions);
	let filter = $state('');
	let filteredChampions = $derived(
		allChampions.filter((champion) => champion.name.trim().toLowerCase().includes(filter.trim().toLowerCase()))
	);
</script>

<svelte:head>
	<title>League of Legends Champion Explorer</title>
</svelte:head>

<section class="contents">
	<h1 class="my-4 text-4xl">LEAGUE&nbsp;OF&nbsp;LEGENDS CHAMPION&nbsp;EXPLORER</h1>
	<div
		class="mx-6 mb-4 flex max-w-full flex-wrap justify-center gap-4 place-self-center border-[1rem] border-gray-3 bg-dark-blue-gradient p-4 lg:max-w-[66%]"
	>
		<div class="flex w-full justify-center">
			<input
				type="search"
				placeholder="Search..."
				bind:value={filter}
				class="w-[66%] bg-gold-1 p-2 text-hextech-black placeholder-gray-1 lg:w-96"
			/>
		</div>
		{#each filteredChampions as { name, squareIconUrl }}
			<PortraitCard championName={name} imageUrl={squareIconUrl} />
		{/each}
		{#if filteredChampions.length === 0}
			<p>No champions found...</p>
		{/if}
	</div>
</section>
