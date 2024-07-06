// https://developer.riotgames.com/docs/lol
export class DataDragonAPI {
	public static readonly BASE_URL: string = 'https://ddragon.leagueoflegends.com';
	public API_VERSION: string | null;

	constructor(apiVersion: string | null = null) {
		this.API_VERSION = apiVersion;
	}

	private async fetchApiVersion(): Promise<string> {
		try {
			const response = await fetch(`${DataDragonAPI.BASE_URL}/api/versions.json`);
			const versions = await response.json();
			return versions[0];
		} catch (err) {
			throw new Error('Failed to fetch API version.');
		}
	}

	private async ensureApiVersion(): Promise<void> {
		if (!this.API_VERSION) {
			this.API_VERSION = await this.fetchApiVersion();
		}
	}

	async getAllChampions(): Promise<AllChampionsResponse> {
		await this.ensureApiVersion();

		const url = `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/data/en_US/champion.json`;
		const response = await fetch(url);
		const allChampionsResponse: AllChampionsResponse = await response.json();

		return allChampionsResponse;
	}

	async getChampionById(id: string): Promise<ChampionResponse> {
		await this.ensureApiVersion();

		const url = `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/data/en_US/champion/${id}.json`;
		const response = await fetch(url);
		const championResponse: ChampionResponse = await response.json();

		return championResponse;
	}
}

type AllChampionsResponse = {
	type: string;
	format: string;
	version: string;
	data: {
		[key: string]: {
			version: string;
			id: string;
			key: string;
			name: string;
			title: string;
			blurb: string;
			info: {
				attack: number;
				defense: number;
				magic: number;
				difficulty: number;
			};
			image: {
				full: string;
				sprite: string;
				group: string;
				x: number;
				y: number;
				w: number;
				h: number;
			};
			tags: string[];
			partype: string;
			stats: {
				hp: number;
				hpperlevel: number;
				mp: number;
				mpperlevel: number;
				movespeed: number;
				armor: number;
				armorperlevel: number;
				spellblock: number;
				spellblockperlevel: number;
				attackrange: number;
				hpregen: number;
				hpregenperlevel: number;
				mpregen: number;
				mpregenperlevel: number;
				crit: number;
				critperlevel: number;
				attackdamage: number;
				attackdamageperlevel: number;
				attackspeedperlevel: number;
				attackspeed: number;
			};
		};
	};
};

type ChampionResponse = {
	type: string;
	format: string;
	version: string;
	data: {
		[key: string]: {
			id: string;
			key: string;
			name: string;
			title: string;
			image: {
				full: string;
				sprite: string;
				group: string;
				x: number;
				y: number;
				w: number;
				h: number;
			};
			skins: {
				id: string;
				num: number;
				name: string;
				chromas: boolean;
			}[];
			lore: string;
			blurb: string;
			allytips: string[];
			enemytips: string[];
			tags: string[];
			partype: string;
			info: {
				attack: number;
				defense: number;
				magic: number;
				difficulty: number;
			};
			stats: {
				hp: number;
				hpperlevel: number;
				mp: number;
				mpperlevel: number;
				movespeed: number;
				armor: number;
				armorperlevel: number;
				spellblock: number;
				spellblockperlevel: number;
				attackrange: number;
				hpregen: number;
				hpregenperlevel: number;
				mpregen: number;
				mpregenperlevel: number;
				crit: number;
				critperlevel: number;
				attackdamage: number;
				attackdamageperlevel: number;
				attackspeedperlevel: number;
				attackspeed: number;
			};
			spells: {
				id: string;
				name: string;
				description: string;
				tooltip: string;
				leveltip: {
					label: string[];
					effect: string[];
				};
				maxrank: number;
				cooldown: number[];
				cooldownBurn: string;
				cost: number[];
				costBurn: string;
				dataValues: unknown;
				effect: (number[] | null)[];
				effectBurn: (string | null)[];
				vars: unknown[];
				costType: string;
				maxammo: string;
				range: number[];
				rangeBurn: string;
				image: {
					full: string;
					sprite: string;
					group: string;
					x: number;
					y: number;
					w: number;
					h: number;
				};
				resource: string;
			}[];
			passive: {
				name: string;
				description: string;
				image: {
					full: string;
					sprite: string;
					group: string;
					x: number;
					y: number;
					w: number;
					h: number;
				};
			};
			recommended: unknown[];
		};
	};
};
