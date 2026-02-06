/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dark backgrounds
                cyber: {
                    bg: '#0a0014',
                    'bg-light': '#120024',
                    card: '#1a0033',
                    'card-hover': '#240044',
                },
                // Neon purple/magenta accents
                neon: {
                    purple: '#9333ea',
                    magenta: '#d946ef',
                    pink: '#f0abfc',
                    blue: '#8b5cf6',
                    glow: '#c026d3',
                },
                // Text colors
                text: {
                    primary: '#f5f3ff',
                    secondary: '#c4b5fd',
                    muted: '#8b5cf6',
                },
                // Status colors (neon style)
                status: {
                    high: '#ef4444',
                    'high-glow': '#dc262680',
                    medium: '#eab308',
                    'medium-glow': '#ca8a0480',
                    low: '#22c55e',
                    'low-glow': '#16a34a80',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'neon': '0 0 20px rgba(147, 51, 234, 0.5)',
                'neon-lg': '0 0 40px rgba(147, 51, 234, 0.4)',
                'neon-pink': '0 0 20px rgba(217, 70, 239, 0.5)',
                'glow': '0 0 30px rgba(192, 38, 211, 0.3)',
                'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
            },
            backgroundImage: {
                'gradient-cyber': 'linear-gradient(135deg, #1a0033 0%, #0a0014 100%)',
                'gradient-neon': 'linear-gradient(90deg, #9333ea 0%, #d946ef 100%)',
                'gradient-card': 'linear-gradient(145deg, #1a0033 0%, #120024 100%)',
            },
            borderRadius: {
                'card': '12px',
            },
            animation: {
                'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
                'glow': 'glow 1.5s ease-in-out infinite alternate',
            },
            keyframes: {
                'pulse-neon': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                'glow': {
                    '0%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' },
                    '100%': { boxShadow: '0 0 30px rgba(217, 70, 239, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
