<script>
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import '../global.css';

	const { children } = $props();
</script>

<Header />

<main class="contents">
	{@render children()}
</main>

<Footer />
