import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark' : '#172939',
        'light' : '#FDFDFD'
      },
      colors: {
        white: {
          100 : "#FFF",
          200 : '#D1D7DE'
        },
        primary: {100 :'#36424C'},
        secondary : {100:'#A2B3BB'},
        yellow: {
          100 : "#FDA314",
          200 : "#e89510",
        }
      },
    },
  },
  plugins: [
    require('tailwindcss-3d'),
    // ...
  ],
}
export default config
