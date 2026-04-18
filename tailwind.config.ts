import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        reef: '#0E7490',
        foam: '#EFFBFF',
        sand: '#F4E7D3',
        coral: '#F97316',
        kelp: '#1F5F4A',
        night: '#08121F',
        storm: '#0F172A',
      },
      boxShadow: {
        float: '0 30px 80px -45px rgba(8, 18, 31, 0.55)',
      },
      animation: {
        rise: 'rise 0.7s ease-out both',
        drift: 'drift 14s linear infinite',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
