const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{vue,html,js}", "./formkit.theme.ts"],
    darkMode: "selector",
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {
            colors: {
                primary: colors.amber,
            },
        },
    },
    plugins: [],
};
