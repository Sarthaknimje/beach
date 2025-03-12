/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#1E3A8A',
        'beach-sand': '#F3C677',
        'safe-green': '#10B981',
        'moderate-yellow': '#FBBF24',
        'danger-red': '#DC2626',
      },
      animation: {
        'wave': 'wave 3s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
} 