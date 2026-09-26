import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "#0B1121",
        electricBlue: "#00E5FF",
        cyan: "#00B4D8",
        emerald: "#059669",
        amber: "#F59E0B",
        red: "#EF4444"
      },
    },
  },
  plugins: [],
};
export default config;
