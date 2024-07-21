<script lang="ts">
	import { onMount } from 'svelte';

	let { championName, imageUrl }: { championName: string; imageUrl: string } = $props();

	let active = $state(false); // Easier to use this bool to track hovered/focused state rather than hover: or focus: tailwind classes here

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	function setActiveState(event: Event, state: boolean) {
		active = state;
	}

	function turnImageOpaque(event: Event) {
		const image = event.target as HTMLImageElement;
		image.style.opacity = '1';
	}
</script>

<figure
	onmouseover={(event) => setActiveState(event, true)}
	onmouseout={(event) => setActiveState(event, false)}
	onfocus={() => {}}
	onblur={() => {}}
	class="flex min-w-[120px] max-w-[120px] flex-col"
>
	<a
		href="/{championName}"
		onfocus={(event) => setActiveState(event, true)}
		onblur={(event) => setActiveState(event, false)}
		class="min-h-[120px] min-w-[120px] transition duration-200"
	>
		{#if mounted}
			<img
				src={imageUrl}
				alt={`${championName} square icon`}
				loading="lazy"
				onload={turnImageOpaque}
				class="border border-solid border-black opacity-0 transition duration-200
					   {active ? 'scale-105 border-gold-4' : ''}"
			/>
		{/if}
	</a>
	<figcaption class="mt-1 font-beaufort font-bold transition duration-200 {active ? 'text-gold-4' : ''}">
		{championName.toUpperCase()}
	</figcaption>
</figure>
