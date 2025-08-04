/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        rasid: {
          blue: '#349ACE',
          orange: '#E7815D',
          red: '#FF5A00',
          green: '#44AF69',
          'blue-light': '#3DBDFF',
          'blue-opacity': 'rgba(52, 154, 206, 0.15)',
          'orange-opacity': 'rgba(231, 129, 93, 0.15)',
          'red-opacity': 'rgba(255, 90, 0, 0.15)',
          'orange-dark': '#EA5B3E',
          'gray-light': '#F4F3F7',
        },
        weather: {
          sunny: '#ffd700',
          cloudy: '#87ceeb',
          rainy: '#4682b4',
          snowy: '#f0f8ff',
        }
      },
      fontFamily: {
        sans: ['CustomFont', 'Inter', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        custom: ['CustomFont', 'sans-serif'],
        DEFAULT: ['CustomFont', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.svg')",
        'maze-pattern': "url('/images/maze-pattern.svg')",
      },
    },
  },
  plugins: [],
} 