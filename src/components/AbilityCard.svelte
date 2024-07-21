<script lang="ts">
	const ABILITY_LABELS = ['Passive', 'Q', 'W', 'E', 'R'];

	type Ability = {
		name: string;
		description: string;
		imageUrl: string;
	};

	type Props = {
		index: number;
		ability: Ability;
		activeAbilityIndex: number;
	};

	let { index, ability, activeAbilityIndex = $bindable() }: Props = $props();

	if (index < 0 || index >= ABILITY_LABELS.length) {
		throw new Error(`Ability index ${index} is out of range. Must be between 0 and ${ABILITY_LABELS.length - 1}.`);
	}
</script>

<button
	onclick={() => (activeAbilityIndex = index)}
	class="flex-start flex max-w-[128px] flex-col items-center transition duration-200
           hover:scale-105 {activeAbilityIndex === index ? '' : 'brightness-50'}"
>
	<figure class="flex flex-col items-center">
		<figcaption class="text-center text-gold-4">{ABILITY_LABELS[index]}</figcaption>
		<img src={ability.imageUrl} alt="Icon for {ability.name} ability" class="m-2 max-h-[64px] max-w-[64px]" />
		<figcaption class="text-balance">{ability.name}</figcaption>
	</figure>
</button>
