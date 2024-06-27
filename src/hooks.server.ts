import { redirect, type Handle } from '@sveltejs/kit';
import { championStore, type Champion } from '$lib/stores/champion-store';

let allChampions: Champion[] = [];
championStore.subscribe((champions) => {
	allChampions = champions;
});

export const handle: Handle = async ({ event, resolve }) => {
	const url = new URL(event.url);
	const path = url.pathname;
	const pathSegments = path.split('/');

	// [championName] route
	if (pathSegments.length === 2) {
		const potentialChampion = decodeURIComponent(pathSegments[1]);
		const normalizedPotentialChampion = normalizeName(potentialChampion);
		const correctCaseName = allChampions.find(
			(champion) => normalizeName(champion.name) === normalizedPotentialChampion
		)?.name;

		if (correctCaseName && correctCaseName !== potentialChampion) {
			pathSegments[1] = encodeURIComponent(correctCaseName);
			const correctedPath = pathSegments.join('/');
			const searchParams = url.search;
			const hash = url.hash;

			throw redirect(307, `${correctedPath}${searchParams}${hash}`);
		}
	}

	return await resolve(event);
};

// Removes non-alphanumeric characters and converts to lower case
function normalizeName(name: string): string {
	const normalizedName = name.replace(/[^a-z0-9]/gi, '').toLowerCase();
	return normalizedName;
}
