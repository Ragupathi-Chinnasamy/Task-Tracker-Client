/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,}"],
  theme: {
    extend: {
      colors: {
        primary: "#5D3587",
        secondary: "#C8C2BC",
        tertiary: "#9A031E",
      },
      fontFamily: {
        montserrat: "Montserrat, sans-serif",
      },
      animation: {
        tilt: "tilt 10s infinite linear",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(1.5deg)",
          },
          "75%": {
            transform: "rotate(-1.5deg)",
          },
        },
      },
    },
  },

  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
