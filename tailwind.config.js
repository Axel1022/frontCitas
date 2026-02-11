/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        clinic: {
          bg: '#f6f8fc',
          card: '#ffffff',
          line: '#d7dfeb',
          primary: '#0e5bd7',
          text: '#1f2a37',
          soft: '#5b6b81',
        },
      },
      boxShadow: {
        clinic: '0 8px 24px rgba(15, 35, 95, 0.08)',
      },
    },
  },
  plugins: [],
};
