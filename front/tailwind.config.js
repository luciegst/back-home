/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,vue,js,ts}'],
  theme: {
    colors: {
      'dark-blue': '#556970',
      'dark-green': '#607C68',
      white: '#ffffff',
      black: '#000000',
      'light-grey': '#f3f4f6'
    },
    extend: {
      gridTemplateColumns: {
        'grid-auto-fit': 'repeat(auto-fit, minmax(400px, 0fr))'
      }
    }
  },
  plugins: []
}
