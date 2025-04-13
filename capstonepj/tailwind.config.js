/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
      },
      colors: {
        vintagePink: "#C28CA9",
        palePink: "#D8B5C7",
        roseBeige: "#EFDADA",
      },
    },
  },
  plugins: [],
};
