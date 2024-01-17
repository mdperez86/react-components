import * as colors from "./src/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors,
      keyframes: {
        pingpong: {
          "0%,100%": { width: "30%", transform: "translateX(-70%)" },
          "50%": { width: "30%", transform: "translateX(300%)" },
        },
      },
      animation: {
        pingpong: "pingpong 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
