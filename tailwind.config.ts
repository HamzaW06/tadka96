import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C0392B',
        'primary-dark': '#A93226',
        'primary-light': '#E74C3C',
        secondary: '#D4A017',
        'secondary-dark': '#B8860B',
        accent: '#E67E22',
        'accent-dark': '#D35400',
        'dark-bg': '#1A1A2E',
        'card-bg': '#2C2C44',
        'text-primary': '#FAFAFA',
        'text-secondary': '#C8C8C8',
        'warm-cream': '#FFF5E6',
        'cream-dark': '#F5E6D0',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #1A1A2E 0%, #2C2C44 50%, #1A1A2E 100%)',
        'spice-gradient': 'linear-gradient(135deg, #C0392B 0%, #E67E22 50%, #D4A017 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
