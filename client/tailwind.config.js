/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#0D7A5F",
          light: "#EAF7F4",
          dark: "#084C3B",
        },
        accent: {
          DEFAULT: "#22C55E",
          light: "#DCFCE7",
          dark: "#16A34A",
        },
        dark: {
          DEFAULT: "#111827",
          light: "#1F2937",
          dark: "#0B0F19",
        },
        light: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
        }
      },
    },
  },
  plugins: [],
};

