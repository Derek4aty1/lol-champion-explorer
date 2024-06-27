<script>
	import { page } from '$app/stores';

	const emotes = [
		'/images/and-i-was-thinking-emote-256x256.webp',
		'/images/amused-and-confused-emote-256x256.webp',
		'/images/does-not-compute-emote-256x256.webp'
	];

	let errorImage = emotes[Math.floor(Math.random() * emotes.length)];
</script>

<section class="m-4 flex flex-auto flex-col items-center justify-center">
	<img class="min-h-[256px] min-w-[256px]" src={errorImage} alt="Error emote" />
	<h1 class="text-5xl">
		{$page.status}: {$page?.error?.message}
	</h1>
	<a class="ui-button mt-6" href="/">Return to Home</a>
</section>
