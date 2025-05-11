import plugin from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        script: [
          '"Great Vibes"',
          '"cursive"',
          '"Gloock"',
          '"JetBrains Mono"',
          '"Montserrat"',
          '"Josefin Sans"',
        ],
      },
      colors: {
        vintagePink: "#C28CA9",
        palePink: "#D8B5C7",
        softPink: "#E695BD",
        highlightPink: "#FC5BAB",
        roseBeige: "#EFDADA",
        deepBlue: "#1D63AF",
        fallBlue: "#669fab",
        fallGreen: "#d2e7be",
        fallPink: "#f4aa9a",
        fallSky: "#c1e4e9",
        fallYellow: "#f8f3c4",
      },
    },
  },
  plugins: [plugin],
};
