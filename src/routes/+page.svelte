<script lang="ts">
	export let data;
	const { allChampions } = data;

	let filter = '';
	$: filtered = allChampions.filter((champion) => champion.name.trim().toLowerCase().includes(filter.trim().toLowerCase()));
</script>

<svelte:head>
	<title>League of Legends Champion Explorer</title>
</svelte:head>

<section class="contents">
	<h1 class="my-4 text-4xl">LEAGUE&nbsp;OF&nbsp;LEGENDS CHAMPION&nbsp;EXPLORER</h1>
	<div
		class="mx-4 mb-4 flex w-auto min-w-[calc(var(--square-icon-size)+4rem)] max-w-[calc((8*var(--square-icon-size))+7rem+4rem)] flex-wrap justify-center
			   gap-4 self-center border-[1rem]
			   border-gray-3 bg-dark-blue-gradient p-4"
	>
		<div class="flex w-full justify-center">
			<input
				type="search"
				placeholder="Search..."
				bind:value={filter}
				class="p-2 w-[min(100%,2.5*var(--square-icon-size))] bg-gold-1 text-hextech-black placeholder-gray-1"
			/>
		</div>
		{#each filtered as { name, squareIconUrl }}
			<figure class="flex min-w-[var(--square-icon-size)] max-w-[var(--square-icon-size)] flex-col">
				<a href="/{name}">
					<img
						src={squareIconUrl}
						alt={`${name} square icon`}
						loading="lazy"
						class="max-h-[var(--square-icon-size)] min-h-[var(--square-icon-size)]
							   min-w-[var(--square-icon-size)] max-w-[var(--square-icon-size)]
							   border border-solid border-black
							   bg-loading-spinner-white bg-50% bg-center bg-no-repeat
							   transition-transform duration-200 hover:scale-105 hover:border-gold-4"
					/>
				</a>
				<figcaption class="mt-1 font-beaufort font-bold">{name.toUpperCase()}</figcaption>
			</figure>
		{/each}
		{#if filtered.length === 0}
			<p>No champions found...</p>
		{/if}
	</div>
</section>

<style>
	:root {
		--square-icon-size: 120px;
	}
</style>
