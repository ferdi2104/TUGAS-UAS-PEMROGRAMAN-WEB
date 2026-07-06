/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#60A5FA',
        'primary-dark': '#3B82F6',
        secondary: '#34D399',
        'secondary-dark': '#10B981',
        accent: '#A78BFA',
        danger: '#F87171',
        warning: '#FBBF24',
        surface: '#1A2332',
        'surface-light': '#1E293B',
        dark: '#0B1121',
        'dark-2': '#111827',
        light: '#F1F5F9',
        muted: '#94A3B8',
        border: '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
        glow: 'glow 2s ease-in-out infinite alternate',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(96, 165, 250, 0.2), 0 0 20px rgba(96, 165, 250, 0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(96, 165, 250, 0.4), 0 0 40px rgba(96, 165, 250, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
