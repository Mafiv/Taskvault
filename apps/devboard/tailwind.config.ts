import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui-components/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/feature-x/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/feature-y/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
