/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        body: '#F8F8F8',
        primary: '#355F8B',
        secondary: '#D08181',
        blue: '#3591C5',
        green: '#7FC0C5',
        teal: '#5E9BAE',
        dark: {
          green: '#52797C',
          blue: '#283C43'
        },
        gray: {
          900: '#000000',
          700: '#444444',
          600: '#888888',
          500: '#D5D5D5',
          300: '#EEEEEE',
          100: '#F5F6F6'
        }
      }
    }
  },
  safelist: [
    {
      pattern: /(text|ring)-(black|blue|secondary|green|teal|dark-green)/
    }
  ],
  plugins: [require('@tailwindcss/forms')]
}
