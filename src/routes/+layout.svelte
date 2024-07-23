<script>
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import '../global.css';

	const { children } = $props();
</script>

<Header />

<main class="flex flex-1 flex-col p-4">
	{@render children()}
</main>

<Footer />
