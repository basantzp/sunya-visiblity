import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          dark: "#0C0A09",
          surface: "#141210",
          card: "#181512",
          border: "#292420",
          cream: "#F7F4EE",
          muted: "#A8A29E",
          accent: "#C5A059", // Refined matte antique brass/gold, not gaudy yellow
          accentMuted: "#8C6E33",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
