import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F1F1F1",
        foreground: "#333333",
        primary: {
          DEFAULT: "#FFFFFF",
          foreground: "#333333",
        },
        secondary: {
          DEFAULT: "#F3F3F3",
          foreground: "#555555",
        },
        accent: {
          DEFAULT: "#1EAEDB",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FF4444",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'hover': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;