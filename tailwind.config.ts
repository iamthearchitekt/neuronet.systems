
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
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        matrix: ["'Courier New'", "monospace"],
        led: ["Digital-7 Mono", "Orbitron", "'Courier New'", "monospace"],
      },
      colors: {
        border: "#8fd9e8",
        input: "#8fd9e8",
        ring: "#8fd9e8",
        background: "#000000",
        foreground: "#ffffff",
        festival: {
          50: "#e6f3ff",
          100: "#cce7ff",
          200: "#99cfff",
          300: "#66b7ff",
          400: "#339fff",
          500: "#0087ff",
          600: "#006acc",
          700: "#004d99",
          800: "#003366",
          900: "#001a33",
        },
        accent: {
          DEFAULT: "#8fd9e8",
          foreground: "#000000",
        },
        primary: {
          DEFAULT: "#8fd9e8",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ff0055",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#111111",
          foreground: "#aaaaaa",
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(-5px, -5px)" },
          "60%": { transform: "translate(5px, 5px)" },
          "80%": { transform: "translate(5px, -5px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(400%)" },
        },
        "complete-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 hsl(var(--accent) / 0)" },
          "50%": { boxShadow: "0 0 24px 4px hsl(var(--accent) / 0.9)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-out": "fade-out 0.5s ease-out forwards",
        "pulse-subtle": "pulse-subtle 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "matrix-rain": "matrix-rain 10s linear infinite",
        "glitch": "glitch 0.5s infinite",
        "scan-line": "scan-line 4s linear infinite",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #8fd9e822 1px, transparent 1px), linear-gradient(to bottom, #8fd9e822 1px, transparent 1px)",
        "noise": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADdElEQVR4nO2aTYhNYRjHf9fIx0AzNSX5KKFkRUpSaqYmNoqFj42PBWJhoWZjQVamkIUUNbtZWClZGBtlIRsLH0k+JiXJx4xmmGs61el0333ve+45Z+69+a3O6bzP+3+e/7n3nPd5ngMFChQoUGCckQyxzRTgIDAHWAy0AH1AL/AB6JTRXWPG5Vr3ANNjC02LJqANeAMMA6NG9jf6GWhVG13ruFhmdOo2Ga9TDQV4nKNRs4EXCY2n0XPVtu6YB/QnNJ5G/cC8uCZWAkMxDKcasrKaGZhsDFmulRtTI9YQT9+Bl7KvGcBEGXsS5zKNMbLd6Oq0aI9iZpGs+bTG+oGjwCVgJvAdWBfiVy+cNbpSrtbxbSZL9qxFb4Fmoy+tXkW0PZuWmX7jZ6/PQJpsfFsZYHyfOA785XQZkNRMp/GxM8RImmyEWc2FiQH7JnPcEzJYbIwMZmRGPnbFGIjykVFmZlxmyFhPjIEom/lixsZdNhyJMRBlM5+MMe9iGYiy+WD8ePd5ljOtDRkZmVw2CiPZ0lyI/1wzmyJswUeE/XVLyGCesX3vMxA1eFx3/aKMDlbbzaY9kYYJ5oXQDUwKGJwlnzR7fEZcL5sKh5y20zpNz8kY4zoN2myNjTm6Yd9tnAow0Sq73SAje2wGDjnmH+vkvyS54aAfcPbP7Jdla9wJ7JHvtwQ0t1Y2gtOAN5K5lwcY2S7bUNdAnPVV2rvFQw1H3O01I/7qOxTnIkZC3t7OLPT3nB9iIvvltS1u9K/UkOsQNQz+zy6JknDXkwHpJx4ZsYE6xHVDlhwwq3ZHwvyJaI4l+eR9h1xXeq/ZL1XnEklxJCp6XUvyuSMb5GqJrQFJfB+wT5Kvljyc3+qN7imSvO5KVFS8CPgoG6jb0hOsS8n4qHzqlTxT4dO2WT71eAyNl0+DKfl0UtVbPt1uZxSZnxWfwqo+Y5VKo8rIkBhyjQx58hmdQMuYTNLX/FbJ7FY1ZGVnvdGqOzY6mV3fkiSrUXcccrLAYafh6fS9XBt3bPasxjhGusYZG+UuZVpUyx3eCeVa77t5lT5y35I4G7O5oEYqPqcBx4Cr8u/a52lIvMm1LhevVaKW6sO2WhXwZk2VOFVq9b1OgQIFCqRDUDlpnFCuknRbqqz+AYlisjX/oCK6AAAAAElFTkSuQmCC')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
