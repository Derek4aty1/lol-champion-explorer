<script lang="ts">
	export let data;
	const { allChampions } = data;
</script>

<svelte:head>
	<title>League of Legends Champion Explorer</title>
</svelte:head>

<section class="page-container">
	<h1 class="header-text">LEAGUE&nbsp;OF&nbsp;LEGENDS CHAMPION&nbsp;EXPLORER</h1>
	<div class="champion-list">
		{#each allChampions as { name, squareIconUrl }}
			<figure class="champion-figure">
				<a href="/{name}">
					<img class="square-icon" src={squareIconUrl} alt={`${name} square icon`} loading="lazy" />
				</a>
				<figcaption class="champion-caption">{name.toUpperCase()}</figcaption>
			</figure>
		{/each}
	</div>
</section>

<style>
	:root {
		--square-icon-size: 120px;
	}

	.page-container {
		display: contents;
	}

	.header-text {
		margin: 1rem 0;
		text-align: center;
		font-size: 2rem;
	}

	.champion-list {
		margin: 0 1rem;
		padding: 1rem;
		align-self: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		width: auto;
		min-width: var(--square-icon-size);
		max-width: calc((8 * var(--square-icon-size)) + 7rem); /* Max of 8 columns */
		background-image: var(--dark-blue-gradient);
		border-width: 1rem;
		border-color: var(--gray3);
	}

	.champion-figure {
		margin: 0;
		display: flex;
		flex-direction: column;
		min-width: var(--square-icon-size);
		max-width: var(--square-icon-size);
		text-align: center;
	}

	.champion-caption {
		margin-top: 0.25em;
		font-family: Beaufort;
		font-weight: bold;
	}

	.square-icon {
		border: 1px solid black;
		transition: 0.2s;
		min-width: var(--square-icon-size);
		min-height: var(--square-icon-size);
	}

	@media (hover: hover) {
		.square-icon:hover {
			transform: scale(1.05);
			border-color: var(--gold4);
		}
	}
</style>
