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
      boxShadow: {
        xs: "0 1px 2px 0 rgba(16, 24, 40, 0.05), 0 0 1px 0 rgba(16, 24, 40, 0.05)",
        sm: "0 2px 4px -1px rgba(16, 24, 40, 0.05), 0 1px 3px 0 rgba(16, 24, 40, 0.05)",
        md: "0 3px 6px -2px rgba(16, 24, 40, 0.05), 0 2px 5px 0 rgba(16, 24, 40, 0.05)",
        lg: "0 4px 8px -3px rgba(16, 24, 40, 0.05), 0 3px 7px 0 rgba(16, 24, 40, 0.05)",
        xl: "0 5px 10px -4px rgba(16, 24, 40, 0.05), 0 4px 9px 0 rgba(16, 24, 40, 0.05)",
        "2xl":
          "0 6px 12px -5px rgba(16, 24, 40, 0.05), 0 5px 11px 0 rgba(16, 24, 40, 0.05)",
        "3xl":
          "0 7px 14px -6px rgba(16, 24, 40, 0.05), 0 6px 13px 0 rgba(16, 24, 40, 0.05)",
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
