import { DataDragonAPI } from '$lib/services/data-dragon-api.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const api = new DataDragonAPI();
	const allChampions = await api.getAllChampions();

	const championName = params.name;
	const championIndex = allChampions.findIndex((champion) => champion.name.toLowerCase() === championName.toLowerCase());

	if (championIndex === -1) {
		error(404, `${championName} champion not found...`);
	}

	const previousChampIndex = championIndex > 0 ? championIndex - 1 : allChampions.length - 1;
	const previousChampName = allChampions[previousChampIndex].name;
	const nextChampIndex = championIndex < allChampions.length - 1 ? championIndex + 1 : 0;
	const nextChampName = allChampions[nextChampIndex].name;

	const champId = allChampions[championIndex].id;
	const splashChampion = await api.getSplashChampion(champId);

	params.name = splashChampion.name;

	return {
		splashChampion,
		previousChampName,
		nextChampName
	};
}
