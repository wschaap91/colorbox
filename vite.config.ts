import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        devSourcemap: true,
    },
    plugins: [vue()],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@c": fileURLToPath(new URL("./src/components", import.meta.url)),
            "@v": fileURLToPath(new URL("./src/views", import.meta.url)),
            "@s": fileURLToPath(new URL("./src/stores", import.meta.url)),
            "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
            "@l": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        },
    },

    build: {
        sourcemap: true,
    },
});
