import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		// Cursors, colors, and gradients coming from LoL branding pages - https://brand.riotgames.com/en-us/league-of-legends/fundamentals
		extend: {
			cursor: {
				'lol-pointer': 'url(/images/cursor.png), auto',
				'lol-pointer-select': 'url(/images/cursor-select.png), auto',
				'lol-pointer-legacy': 'url(/images/cursor-legacy.png), auto',
				'lol-pointer-legacy-select': 'url(/images/cursor-legacy-select.png), auto'
			},
			fontFamily: {
				spiegel: 'Spiegel',
				beaufort: 'Beaufort'
			},
			colors: {
				blue: {
					1: '#cdfafa',
					2: '#0ac8b9',
					3: '#0397ab',
					4: '#005a82',
					5: '#0a323c',
					6: '#091428',
					7: '#0a1428'
				},
				gold: {
					1: '#f0e6d2',
					2: '#c8aa6e',
					3: '#c8aa6e', // Same as gold2
					4: '#c89b3c',
					5: '#785a28',
					6: '#463714',
					7: '#32281e'
				},
				gray: {
					1: '#a09b8c',
					'1-5': '#5b5a56',
					2: '#3c3c41',
					3: '#1e2328',
					cool: '#1e282d'
				},
				'hextech-black': '#010a13'
			},
			backgroundImage: (theme) => ({
				'blue-gradient': `linear-gradient(to right, ${theme('colors.blue.4')}, ${theme('colors.blue.2')})`,
				'dark-blue-gradient': `linear-gradient(to right, ${theme('colors.blue.6')}, ${theme('colors.blue.7')})`,
				'gold-gradient': `linear-gradient(to right, ${theme('colors.gold.5')}, ${theme('colors.gold.4')})`
			}),
			backgroundSize: {
				'10%': '10%',
				'20%': '20%',
				'30%': '30%',
				'40%': '40%',
				'50%': '50%',
				'60%': '60%',
				'70%': '70%',
				'80%': '80%',
				'90%': '90%',
				'100%': '100%'
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus']);
		})
	]
};
