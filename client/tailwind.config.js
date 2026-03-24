/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#bfc7d2',
                secondary: '#66dd8b',
                tertiary: '#e9c349',
                background: '#111316',
                surface: '#111316',
                'surface-dim': '#111316',
                'surface-bright': '#37393d',
                'surface-container-lowest': '#0c0e11',
                'surface-container-low': '#1a1c1f',
                'surface-container': '#1e2023',
                'surface-container-high': '#282a2d',
                'surface-container-highest': '#333538',
                'surface-variant': '#333538',
                'primary-container': '#101820',
                'secondary-container': '#25a55a',
                'tertiary-container': '#cca730',
                outline: '#8e9195',
                'outline-variant': '#44474b',
                'on-surface': '#e2e2e6',
                'on-surface-variant': '#c5c6cb',
                'on-primary': '#29313a',
                'on-primary-container': '#79818c',
                'on-secondary': '#003919',
                'on-tertiary': '#3c2f00',
            },
            fontFamily: {
                headline: ['Manrope', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                label: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                glow: '0 0 30px rgba(191, 199, 210, 0.15)',
            },
        },
    },
    plugins: [],
};
