/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Lato', '-apple-system', 'sans-serif'],
        logo: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        cream: '#FFF8F0',
        ivory: '#FFFFF0',
        beige: '#F5E6D3',
        warmGold: '#C8A96E',
        deepGold: '#A67C52',
        blush: '#F2D4C2',
        charcoal: '#2C2C2C',
        softBrown: '#6B5B4F',
        lightGold: '#E8D5B7',
        paleRose: '#F9EDE6',
      },
      animation: {
        'float-slow': 'floatUp 12s ease-in-out infinite',
        'fall-slow': 'fallDown 10s linear infinite',
        'glow-pulse': 'glowPulse 6s ease-in-out infinite',
        'snow-fall': 'snowFall 14s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) rotate(360deg)', opacity: '0' },
        },
        fallDown: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(180deg)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.3)' },
        },
        snowFall: {
          '0%': { transform: 'translateY(-5vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '50%': { transform: 'translateY(50vh) translateX(20px)' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(100vh) translateX(-10px)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
