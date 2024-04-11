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
	<title>{champion.name} - League of Legends Champion Explorer</title>
	{#each champion.skins as skin}
		<link rel="preload" as="image" href={skin.splashUrl} />
	{/each}
	<link rel="preload" as="image" href={champion.passive.imageUrl} />
	{#each champion.spells as spell}
		<link rel="preload" as="image" href={spell.imageUrl} />
	{/each}
</svelte:head>

<div class="base-container">
	<a class="all-champions button" href="/">&laquo; All Champions</a>
	<div class="champion-container">
		<figure class="splash-container">
			<button class="splash-link" type="button" on:click={changeSkinSplash}>
				<img class="splash-image" src={skin.splashUrl} alt={`Splash art for ${skin.name} skin`} />
			</button>
			<figcaption>{skin.name}</figcaption>
		</figure>
		<div class="lore-container">
			<h1 class="champion-header">{champion.name.toUpperCase()}, {champion.title.toUpperCase()}</h1>
			<p class="lore-text">{champion.lore}</p>
		</div>
	</div>
	<nav class="champion-nav-container">
		{#if previousChampName}
			<a class="previous-champion button" href="/{previousChampName}">&laquo; {previousChampName}</a>
		{/if}
		{#if nextChampName}
			<a class="next-champion button" href="/{nextChampName}">{nextChampName} &raquo;</a>
		{/if}
	</nav>
</div>

<style>
	.base-container {
		display: flex;
		flex-direction: column;
		flex: auto;
		justify-content: center;
		align-items: center;
	}

	.button {
		padding: 0.5rem;
		text-align: center;
		text-decoration: none;
		color: var(--gold1);
		background-color: var(--gray2);
	}

	@media (hover: hover) {
		.button:hover {
			background-color: var(--gray3);
		}
	}

	.all-champions {
		margin: 1rem 0 1rem 3rem;
		align-self: flex-start;
	}

	.champion-container {
		margin: 1rem 2rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	.splash-container {
		margin: 0;
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 50%;
	}

	.splash-link {
		margin: 0 1rem;
		padding: 0;
		display: flex;
	}

	.splash-image {
		max-width: 100%;
	}

	figcaption {
		margin-top: 0.75rem;
		font-style: italic;
		color: var(--gray1);
	}

	.lore-container {
		width: 50%;
		height: 100%;
		min-height: 100%;
	}

	.champion-header {
		margin: 0 0 0.5rem 0;
		text-align: center;
		color: var(--gold4);
	}

	.lore-text {
		margin: 0;
		line-height: 1.5;
	}

	.champion-nav-container {
		display: flex;
		justify-content: center;
	}

	.previous-champion,
	.next-champion {
		margin: 1rem 0.5rem;
		min-width: 5rem;
	}

	@media (width <= 1024px) {
		.all-champions {
			margin: 2rem 0 1rem 2rem;
		}

		.champion-container {
			flex-direction: column;
			flex-wrap: wrap;
		}

		.splash-container {
			width: 100%;
		}

		.splash-link {
			margin: 0;
		}

		.lore-container {
			width: 100%;
		}
	}
</style>
