import type { Config } from "tailwindcss";

import * as colors from "./src/colors";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors,
      fontSize: {
        "display-xs": ["1.5rem", "2rem"],
        "display-sm": ["1.875rem", "2.375rem"],
        "display-md": ["2.25rem", "2.75rem"],
        "display-lg": ["3rem", "3.75rem"],
        "display-xl": ["3.75rem", "4.5rem"],
        "display-2xl": ["4.5rem", "5.625rem"],

        xs: ["0.75rem", "1.125rem"],
        sm: ["0.875rem", "1.25rem"],
        md: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.875rem"],
      },
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
} satisfies Config;
