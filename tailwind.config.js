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
        // Neutral surfaces retinted mint (were warm cream/beige/rose).
        cream: '#F3FAF3',
        ivory: '#F6FCF7',
        beige: '#DCEEDC',
        // Mint ramp built around the brand colour #c4e1c5. Same hue throughout;
        // only lightness varies so each step can do its job (see index.css).
        lightGold: '#E5F1E5', // tinted surfaces and washes
        warmGold: '#C4E1C5', // brand mint (exact) — fills, icons, decoration
        deepGold: '#6FB972', // hover/active state for mint fills
        goldInk: '#265E28', // mint TEXT and focus borders on light surfaces (AA)
        blush: '#D9EFDA',
        charcoal: '#2C2C2C',
        softBrown: '#5E6B60', // muted secondary text, retinted cool sage (was warm brown)
        paleRose: '#EAF6EA',
        emeraldDark: '#0F3D2E', // dark emerald — footer background
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
