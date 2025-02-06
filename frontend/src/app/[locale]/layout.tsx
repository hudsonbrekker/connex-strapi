import { GlobalDocument, GlobalQuery, GlobalQueryVariables } from "@/__generated__/graphql"
import { execute } from "@/graphql/execute"
import { routing } from "@/i18n/routing"
import Providers from "@/lib/providers/provider"
import { CMS_URL } from "@/types/constants"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import ReactLenis from "lenis/react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, Lexend } from "next/font/google"
import { notFound } from "next/navigation"

import "./globals.css"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const lexend = Lexend({
	preload: true,
	variable: "--font-lexend",
	subsets: ["latin"],
})

const ibmPlex = IBM_Plex_Sans({
	preload: true,
	variable: "--font-ibm-plex-sans",
	weight: ["400", "600", "700"],
	subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
	const seoData = await execute<GlobalQuery, GlobalQueryVariables>(GlobalDocument)()

	const title = seoData.global?.defaultSeo?.metaTitle
	const des = seoData.global?.defaultSeo?.metaDescription
	const favIconURL = seoData.global?.favicon?.url

	return {
		title: title,
		description: des,
		authors: [{ name: "Glohow JSC", url: "https://www.glohow.com/" }],
		keywords: ["agency", "connex", "user"],
		// Icons
		icons: {
			icon: favIconURL ? `${CMS_URL}${favIconURL}` : "src/app/favicon.ico",
		},
	}
}

export const generateViewport = () => ({
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: "no",
})

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const locale = (await params).locale
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	return (
		<html
			lang={locale}
			suppressHydrationWarning
		>
			<ReactLenis root>
				<body
					className={`${lexend.variable} ${ibmPlex.variable} relative flex min-h-screen flex-col antialiased`}
				>
					<Providers>{children}</Providers>
				</body>
			</ReactLenis>
		</html>
	)
}
