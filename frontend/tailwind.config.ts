import type { Config } from "tailwindcss"
import daisyui from "daisyui"
import tailwidTypo from "@tailwindcss/typography"
import plugin from "tailwindcss/plugin"
import tailwindAnimate from "tailwindcss-animate"
import themes from "daisyui/src/theming/themes"

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			lexend: "var(--font-lexend)",
			ibm: "var(--font-ibm-plex-sans)",
		},
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			textShadow: {
				sm: "0 1px 2px var(--tw-shadow-color)",
				DEFAULT: "0 2px 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes.light,
					primary: "#08B9B8",
					secondary: "#DAF4F4",
					accent: "#079F9E",
					neutral: "#011C1C",
					"base-100": "#FCFCFC",
					".text-black": {
						color: "#050505",
					},
					".text-black-secondary": {
						color: "#575757",
					},
					".text-secondary": {
						color: "#72D7D6",
					},
					".text-accent": {
						color: "#079F9E",
					},
					"text-white": {
						color: "#FCFCFC",
					},
					".text-black-tertiary": {
						color: "#A4A4A4",
					},
					".btn": {
						minHeight: "2.5rem", // 40px
						height: "2.5rem", // 40px
					},
				},
			},
		],
	},
	plugins: [
		tailwidTypo,
		daisyui,
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({
						textShadow: value,
					}),
				},
				{ values: theme("textShadow") },
			)
		}),
		tailwindAnimate,
	],
} satisfies Config
