import { DataDragonAPI } from '$lib/services/data-dragon-api.ts';
import { championStore, type Champion } from '$lib/stores/champion-store.ts';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ params }) {
	const api = new DataDragonAPI();
	const allChampions = await getAllChampions(api);

	const championNameParam = params.championName;
	const championIndex = allChampions.findIndex((champion) => champion.name === championNameParam);

	if (championIndex === -1) {
		error(404, 'Not Found');
	}

	const championId = allChampions[championIndex].id;
	const championResponse = await api.getChampion(championId);
	const apiVersion = api.API_VERSION;
	const champion = Object.values(championResponse.data)[0];

	const splashChampion: SplashChampion = {
		id: champion.id,
		name: champion.name,
		title: champion.title,
		lore: champion.lore,
		passive: {
			name: champion.passive.name,
			description: champion.passive.description,
			imageUrl: `${DataDragonAPI.BASE_URL}/cdn/${apiVersion}/img/passive/${champion.passive.image.full}`
		},
		spells: champion.spells.map((spell) => ({
			id: spell.id,
			name: spell.name,
			description: spell.description,
			imageUrl: `${DataDragonAPI.BASE_URL}/cdn/${apiVersion}/img/spell/${spell.image.full}`
		})),
		skins: champion.skins.map((skin) => ({
			id: skin.id,
			num: skin.num,
			name: skin.name === 'default' ? champion.name : skin.name,
			chromas: skin.chromas,
			splashUrl: `${DataDragonAPI.BASE_URL}/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`
		}))
	};

	return {
		splashChampion
	};
}

/** Attempts to retrieve all champions from championStore. If store is empty, retrieves all champions from the API and stores them in the store. */
async function getAllChampions(api: DataDragonAPI): Promise<Champion[]> {
	let allChampions = get(championStore);
	if (allChampions.length === 0) {
		const allChampionsResponse = await api.getAllChampions();
		allChampions = Object.values(allChampionsResponse.data).map((champion) => ({
			id: champion.id,
			name: champion.name
		}));
		championStore.set(allChampions);
	}
	return allChampions;
}

type SplashChampion = {
	id: string;
	name: string;
	title: string;
	lore: string;
	passive: {
		name: string;
		description: string;
		imageUrl: string;
	};
	spells: {
		id: string;
		name: string;
		description: string;
		imageUrl: string;
	}[];
	skins: {
		id: string;
		num: number;
		name: string;
		chromas: boolean;
		splashUrl: string;
	}[];
};
