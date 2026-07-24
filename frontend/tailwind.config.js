/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f7f8f0',
          100: '#eef0dc',
          200: '#dde2bc',
          300: '#c6ce93',
          400: '#adb86a',
          500: '#8fa348',
          600: '#6b7a32',
          700: '#556128',
          800: '#434d22',
          900: '#38401e',
          950: '#1d220d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.06), 0 1px 3px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px 0 rgba(0,0,0,0.10), 0 2px 8px 0 rgba(0,0,0,0.06)',
        float: '0 16px 48px 0 rgba(0,0,0,0.12), 0 4px 12px 0 rgba(0,0,0,0.08)',
        glass: '0 4px 24px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'count-up': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};
