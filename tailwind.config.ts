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
        background: "var(--bg)",
        foreground: "var(--text)",
        accent: "var(--accent)",
        card: "var(--card)",
        "card-secondary": "var(--card-secondary)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        "input-bg": "var(--input-bg)",
        "navbar-bg": "var(--navbar-bg)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
        light: "var(--border-light)",
      },
      fontFamily: {
        'display': ['DM Serif Display', 'serif'],
        'mono': ['DM Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;