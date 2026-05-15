/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors: {
        'indo_gray': '#272727',
        'indo_green': '#00e380',
        'indo_blue': '#0071bc',
      },
      fontFamily:{
        roboto:['Roboto', 'sans-serif'],
        times:['Times New Roman', 'serif'],
        poppins: ["Poppins", "sans-serif"],
        Opensans: ["Open Sans", "sans-serif"],
      },
      keyframes:{
        "browse-in": {
                    "0%": {
                        transform: "scale(0.8) translateZ(0px)",
                        zIndex: "-1"
                    },
                    "10%": {
                        transform: "scale(0.8) translateZ(0px)",
                        zIndex: "-1",
                        opacity: "0.7",
                    },
                    "80%": {
                        transform: "scale(1.05) translateZ(0px)",
                        zIndex: "999",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "scale(1) translateZ(0px)",
                        zIndex: "999"
                    },
                },
      },
      animation:{
        browsein: 'browse-in 0.4s ease-in-out 0.25s 1',
      }
    },
    
  },
  plugins: [],
}