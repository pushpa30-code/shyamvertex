/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FFD000', // Vibrant Yellow
                secondary: '#FF6A00', // Bright Orange
                dark: '#0A0A0A', // Deep Black
                charcoal: '#121212', // Dark Charcoal
                accent: '#BFBFBF', // Secondary Text
                surface: '#1E1E1E', // Slightly lighter charcoal for cards
                'yellow-glow': '#FFE347',
                'orange-glow': '#FF8A33',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
