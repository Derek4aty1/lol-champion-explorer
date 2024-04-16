<header>
	<nav>
		<a class="home-link" href="/">
			<img src="/images/l-icon-128x128.png" alt="League of Legends Letter L logo" />
		</a>
		<a class="github-link" href="https://github.com/Derek4aty1/lol-champion-explorer" target="_blank">
			<img src="/images/github-logo-white.svg" alt="Github logo" />
		</a>
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 9999;
		background-image: var(--gold-gradient);
	}

	nav {
		display: flex;
	}

	.home-link,
	.github-link {
		margin: 10px;
		display: flex;
		width: fit-content;
	}

	.github-link {
		margin-left: auto;
	}

	img {
		width: 30px;
		height: 30px;
		transition: 0.2s;
	}

	@media (hover: hover) {
		img:hover {
			transform: scale(1.1);
		}
	}
</style>
