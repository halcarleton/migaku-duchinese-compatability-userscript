import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { build } from 'vite'

export default {
  compilerOptions: {
    customElement: true,
  },
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
