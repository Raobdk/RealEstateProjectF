/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Landora Brand Colors
        primary: {
          DEFAULT: "#6139DB",
          foreground: "#FFFFFF",
        },
        background: "#FAFAFA",
        foreground: "#111111",
        secondary: {
          DEFAULT: "#3A3C40",
          foreground: "#FAFAFA",
        },
        muted: {
          DEFAULT: "#E7EAEF",
          foreground: "#3A3C40",
        },
        accent: {
          DEFAULT: "#E7EAEF",
          foreground: "#111111",
        },
        border: "#E7EAEF",
        input: "#E7EAEF",
        ring: "#6139DB",
        // Additional gray shades
        gray: {
          50: "#FAFAFA",
          100: "#E7EAEF",
          200: "#D1D5DB",
          300: "#9CA3AF",
          400: "#6B7280",
          500: "#3A3C40",
          600: "#111111",
          700: "#0A0A0A",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
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
    },
  },
  plugins: [],
};

