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
      },
      boxShadow: {
        signIn: "4px 4px 4px 0 rgba(0,0,0,0.25)",
        select: "0 1px 3px 0 rgba(166, 175, 195, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
