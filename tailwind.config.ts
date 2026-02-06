import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: "class",
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Base colors
        base: {
          900: "#000000",
          800: "#181919",
          700: "#38393A",
          600: "#545656",
          500: "#939394",
          400: "#b2b3b4",
          300: "#b9b3b8",
          200: "#e6e7e9",
          100: "#f0f013",
          50: "#F7F9FA",
          25: "#ffffff",
        },

        // Neutral colors
        neutral: {
          900: "#242a37",
          800: "#373e4f",
          700: "#485064",
          600: "#57637b",
          500: "#6b7188",
          400: "#7b8890",
          300: "#929BB0",
          200: "#b0b7c8",
          100: "#ced4e0",
          50: "#e8edf6",
          25: "#F8F9FC",
        },

        // Primary colors
        primary: {
          900: "#001659",
          800: "#1c29fd",
          700: "#2335a8",
          600: "#2940b4",
          500: "#3347be",
          400: "#5463c9",
          300: "#7379c2",
          200: "#b8a3bf",
          100: "#c3c7ec",
          50: "#e0f0ff",
          25: "#f3f4fb",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Secondary colors
        secondary: {
          900: "#005e8a",
          800: "#0a7aa0",
          700: "#0e81be",
          600: "#18a2d0",
          500: "#29b5de",
          400: "#6dbce1",
          300: "#8ec9e4",
          200: "#87b8eb",
          100: "#b5e0f2",
          50: "#e2f8fa",
          25: "#f1f8fd",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Functional - Info
        info: {
          900: "#222875",
          800: "#1e429f",
          700: "#1a56d6",
          600: "#1c64f2",
          500: "#3f83f8",
          400: "#76a9fa",
          300: "#a4cafe",
          200: "#c3ddfd",
          100: "#e1effe",
          50: "#ebf5ff",
        },

        // Functional - Success
        success: {
          900: "#014737",
          800: "#03543f",
          700: "#046c4e",
          600: "#057655",
          500: "#0e9f6e",
          400: "#31c48d",
          300: "#84e1bc",
          200: "#bcf0da",
          100: "#def7ec",
          50: "#f3faf7",
        },

        // Functional - Warning
        warning: {
          900: "#633112",
          800: "#723b13",
          700: "#8e4510",
          600: "#9f580a",
          500: "#c37803",
          400: "#e3a008",
          300: "#faca15",
          200: "#fce96a",
          100: "#fdf4b0",
          50: "#fdf9e6",
        },

        // Functional - Error
        error: {
          900: "#771d1d",
          800: "#9b1c1c",
          700: "#c81e1e",
          600: "#e02424",
          500: "#f05252",
          400: "#f98080",
          300: "#f8b4b4",
          200: "#fbd5d5",
          100: "#fce8e8",
          50: "#fdf2f2",
        },

        // Semantic colors (shadcn)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
