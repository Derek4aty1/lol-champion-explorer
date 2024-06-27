import { writable } from 'svelte/store';

export type Champion = {
	id: string; // Used for most API calls - typically the same as the name, but not always
	name: string;
};

export const championStore = writable<Champion[]>([]);
