<script>
	import Header from '../components/layout/Header.svelte';
	import Footer from '../components/layout/Footer.svelte';
	import '../global.css';
</script>

<Header />

<main style="display: contents;">
	<slot />
</main>

<Footer />
