<script lang="ts">
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
		class="mx-6 mb-4 flex max-w-full flex-wrap justify-center gap-4 self-center border-[1rem] border-gray-3 bg-dark-blue-gradient p-4 lg:max-w-[66%]"
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
			<figure class="flex min-w-[120px] max-w-[120px] flex-col">
				<a href="/{name}">
					<img
						src={squareIconUrl}
						alt={`${name} square icon`}
						loading="lazy"
						class="min-h-[120px] min-w-[120px] border border-solid border-black bg-throbber-white bg-50% bg-center bg-no-repeat transition-transform duration-200 hover:scale-105 hover:border-gold-4"
					/>
				</a>
				<figcaption class="mt-1 font-beaufort font-bold">{name.toUpperCase()}</figcaption>
			</figure>
		{/each}
		{#if filteredChampions.length === 0}
			<p>No champions found...</p>
		{/if}
	</div>
</section>
