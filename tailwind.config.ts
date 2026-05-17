import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        panel: "#171722",
        accent: "#7b61ff"
      }
    }
  },
  plugins: []
} satisfies Config;
