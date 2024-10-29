import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    svelte(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        author: "https://github.com/halcarleton",
        description:
          "Modifies the DuChinese graded reader UI to make it compatible with the Migaku extension.",
        license: "Apache 2.0",
        namespace: "https://github.com/halcarleton",
        include: ["https://duchinese.net/lessons/*"],
      },
    }),
  ],
});
