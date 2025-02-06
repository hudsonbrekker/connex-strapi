import {
	getLogoOptions,
	heroOptions,
	keySolutionOptions,
	projectsOptions,
	servicesOptions,
} from "@/queries"
import Footer from "@/shared/common/Footer"
import Header from "@/shared/common/Header"
import getQueryClient from "@/utils/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getLocale } from "next-intl/server"
import dynamic from "next/dynamic"

const MainBannerSection = dynamic(() => import("@/pages/MainBanner"))
const KeySolutionSection = dynamic(() => import("@/pages/KeySolution"))
const OurServices = dynamic(() => import("@/pages/OurServices"))
const OurProjects = dynamic(() => import("@/pages/OurProjects"))
const ContactUs = dynamic(() => import("@/pages/ContactUs"))

export default async function Home() {
	const queryClient = getQueryClient()
	const lang = await getLocale()

	await Promise.allSettled([
		await queryClient.prefetchQuery(getLogoOptions()),
		await queryClient.prefetchQuery(heroOptions({ locale: lang })),
		await queryClient.prefetchQuery(keySolutionOptions({ locale: lang })),
		await queryClient.prefetchQuery(servicesOptions({ locale: lang })),
		await queryClient.prefetchQuery(projectsOptions({ locale: lang })),
	])

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Header />
			<div className='flex-1 bg-base-100'>
				<MainBannerSection />
				<KeySolutionSection />
				<OurServices />
				<OurProjects />
				<ContactUs />
			</div>
			<Footer />
		</HydrationBoundary>
	)
}
