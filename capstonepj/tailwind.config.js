/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', "cursive", '"Gloock"'],
      },
      colors: {
        vintagePink: "#C28CA9",
        palePink: "#D8B5C7",
        softPink: "#E695BD",
        highlightPink: "#FC5BAB",
        roseBeige: "#EFDADA",
        deepBlue: "#1D63AF",
      },
    },
  },
  plugins: [],
};
