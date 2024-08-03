const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",	
    content: ["./src/**/*.{vue,html,js}", "./formkit.theme.ts"],
    darkMode: "selector",
    theme: {
        colors: {
            primary: colors.amber,
        },
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {},
    },
    plugins: [],
};
