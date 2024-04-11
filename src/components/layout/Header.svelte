<header>
	<nav class="site-nav">
		<a class="home-link" href="/">
			<img class="home-logo" src="/images/l-icon-high-res.png" alt="League of Legends Letter L logo" />
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

	.site-nav {
		display: flex;
	}

	.home-link {
		margin: 10px;
		display: flex;
		width: fit-content;
	}

	.home-logo {
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
