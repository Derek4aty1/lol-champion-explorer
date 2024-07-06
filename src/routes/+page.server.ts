import { DataDragonAPI } from '$lib/services/data-dragon-api.ts';
import { championStore, type Champion } from '$lib/stores/champion-store.ts';

export async function load() {
	const api = new DataDragonAPI();
	const allChampionsResponse = await api.getAllChampions();

	const allChampions = Object.values(allChampionsResponse.data);
	const apiVersion = api.API_VERSION;

	const champions: Champion[] = allChampions.map((champion) => ({
		id: champion.id,
		name: champion.name
	}));
	championStore.set(champions);

	const homePageChampions: HomePageChampion[] = champions
		.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
		.map((champion) => ({
			id: champion.id,
			name: champion.name,
			squareIconUrl: `${DataDragonAPI.BASE_URL}/cdn/${apiVersion}/img/champion/${champion.id}.png`
		}));
	return {
		homePageChampions
	};
}

type HomePageChampion = {
	id: string;
	name: string;
	squareIconUrl: string;
};
