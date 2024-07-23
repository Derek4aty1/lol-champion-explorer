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

<section class="flex flex-col place-items-center">
	<h1 class="mb-8 w-full text-4xl">LEAGUE&nbsp;OF&nbsp;LEGENDS CHAMPION&nbsp;EXPLORER</h1>
	<div
		class="grid grid-cols-2 justify-items-center gap-8 border-[1rem] border-gray-3 bg-dark-blue-gradient p-8
			   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9"
	>
		<input
			type="search"
			placeholder="Search..."
			bind:value={filter}
			class="col-span-2 w-[66%] bg-gold-1 p-2 text-hextech-black placeholder-gray-1
				   sm:col-span-3 md:col-span-4 lg:col-span-5 lg:w-96 xl:col-span-7 2xl:col-span-9"
		/>
		{#each filteredChampions as { name, squareIconUrl }}
			<PortraitCard championName={name} imageUrl={squareIconUrl} />
		{/each}
		{#if filteredChampions.length === 0}
			<p class="col-span-full w-full text-center">No champions found...</p>
		{/if}
	</div>
</section>
