type Champion = {
	id: string; // Used for all Data Dragon API endpoints. Typically the same as name, but not always.
	name: string;
	squareIconUrl: string;
};

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

// https://developer.riotgames.com/docs/lol
export class DataDragonAPI {
	private static readonly BASE_URL: string = 'https://ddragon.leagueoflegends.com';
	public API_VERSION: string | null;

	constructor(apiVersion: string | null = null) {
		this.API_VERSION = apiVersion;
	}

	private async fetchApiVersion(): Promise<string> {
		try {
			const response = await fetch(`${DataDragonAPI.BASE_URL}/api/versions.json`);
			const versions = await response.json();
			return versions[0];
		} catch (error) {
			console.error('Failed to fetch API version:', error);
			throw new Error('Failed to fetch API version.');
		}
	}

	private async ensureApiVersion(): Promise<void> {
		if (!this.API_VERSION) {
			this.API_VERSION = await this.fetchApiVersion();
		}
	}

	async getAllChampions(): Promise<Champion[]> {
		await this.ensureApiVersion();

		const url = `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/data/en_US/champion.json`;
		const response = await fetch(url);
		const jsonData = await response.json();

		const allChampions: Champion[] = Object.values<Champion>(jsonData.data)
			.map(({ id, name }) => ({
				id,
				name,
				squareIconUrl: `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/img/champion/${id}.png`
			}))
			.sort((a, b) => a.name.localeCompare(b.name));

		return allChampions;
	}

	async getSplashChampion(id: string): Promise<SplashChampion> {
		await this.ensureApiVersion();

		const url = `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/data/en_US/champion/${id}.json`;
		const response = await fetch(url);
		const jsonData = await response.json();

		const splashChampion: SplashChampion = jsonData['data'][id];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		splashChampion.passive.imageUrl = `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/img/passive/${(splashChampion as any).passive['image']['full']}`;
		splashChampion.spells.forEach((spell) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spell.imageUrl = `${DataDragonAPI.BASE_URL}/cdn/${this.API_VERSION}/img/spell/${(spell as any)['image']['full']}`;
		});
		splashChampion.skins.forEach((skin) => {
			skin.splashUrl = `${DataDragonAPI.BASE_URL}/cdn/img/champion/splash/${id}_${skin.num}.jpg`;
			if (skin.name === 'default') {
				skin.name = splashChampion.name;
			}
		});

		return splashChampion;
	}
}
