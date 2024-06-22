import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
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
                success: {
                    DEFAULT: "hsl(var(--success))",
                },
            },
            backgroundImage: {
                "gradient-image": "url('../public/images/gradient-background.jpg')"
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
                "zoom-in": {
                    from: { transform: "translateY(50px)", opacity: "0.5" },
                    to: { transform: "translateY(0px)", opacity: "1" }
                },
                "zoom-out": {
                    from: { transform: "translateY(0px)", opacity: "1" },
                    to: { transform: "translateY(50px)", opacity: "0.5" }
                },
                "like": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.3)" },
                    "100%": { transform: "scale(1)" }
                },
                "ring-expand": {
                    "0%": { transform: "scale(0)", opacity: "1" },
                    "100%": { transform: "scale(1.3)", opacity: "0" }
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "zoom-in": "zoom-in 0.6s ease-out",
                "zoom-out": "zoom-out 0.6s ease-out",
                "like": "like 0.7s ease-in-out",
                "ring-expand": "ring-expand 1s ease-in-out forwards",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("autoprefixer"),
    ],
} satisfies Config

export default config