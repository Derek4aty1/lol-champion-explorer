import { DataDragonAPI } from '$lib/services/data-dragon-api.js';

export async function load() {
	const api = new DataDragonAPI();

	return {
		allChampions: await api.getAllChampions()
	};
}
