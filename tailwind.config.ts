import type { Config } from "tailwindcss";

export default {
  prefix: "ov-",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: "#f6fbfc",
          100: "#eaf6f7",
          200: "#cfe8eb",
          300: "#9fd0d8",
          400: "#63afbc",
          500: "#3f8b9c",
          600: "#336f80",
          700: "#2e5b69",
          800: "#2d4c57",
          900: "#293f48"
        }
      },
      boxShadow: {
        panel: "0 16px 40px rgba(22, 56, 68, 0.14)"
      }
    }
  },
  plugins: []
} satisfies Config;
