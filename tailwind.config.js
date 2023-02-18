/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors : {
      'blue1' : '#4D6DE3',
      'blue2' : '#F1FCFD',
      'green2' : '#3EC70B',
      'green3' : '#2B7A0B',
      'white1' : '#FFFFFF',
      'grey1' : '#e5e7eb',
      'grey2' : '#A0A0A0',
      'black1' : '#000000',
      'white2':'#F5F5F5',
    },
    fontFamily:{
      'poppins':['Poppins']
    }
  },
  plugins: [],
}