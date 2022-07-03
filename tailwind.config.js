/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["index.html", "./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: 'Nunito sans, sans-serif'
            },
            colors: {
                gray: {
                    200: 'hsl(0, 0%, 98%)',
                    400: 'hsl(0, 0%, 52%)'
                },
                blue: {
                    700: 'hsl(209, 23%, 22%)',
                    800: 'hsl(207, 26%, 17%)',
                    900: 'hsl(200, 15%, 8%)'
                }
            }
        },
    },
    plugins: [],
}