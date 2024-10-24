/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'high-voltage-yellow': '#FFD700',
        'warning-orange': '#FFA500',
        'industrial-black': '#111111',
        'industrial-dark': '#1A1A1A',
        'industrial-gray': '#333333',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'voltage': '0 0 25px var(--high-voltage-yellow)',
        'industrial': '0 0 15px rgba(255, 215, 0, 0.2)',
        'glow': '0 0 30px rgba(255, 215, 0, 0.4)',
      },
      backgroundImage: {
        'voltage-gradient': 'linear-gradient(45deg, var(--high-voltage-yellow), var(--warning-orange))',
        'industrial-gradient': 'linear-gradient(135deg, var(--industrial-black), var(--industrial-dark))',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};