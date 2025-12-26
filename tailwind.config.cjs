/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        dark: '#0F0F0F',
        light: '#F9FAFB',
        gray: {
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
