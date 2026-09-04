import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// More options available here: https://svelte.dev/docs/kit/adapter-vercel
		}),
		alias: {
			$components: 'src/components'
		}
	}
};

export default config;
