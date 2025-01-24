import { getLogoOptions, heroOptions, keySolutionOptions, servicesOptions } from "@/queries"
import Footer from "@/shared/common/Footer"
import Header from "@/shared/common/Header"
import getQueryClient from "@/utils/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import dynamic from "next/dynamic"

const MainBannerSection = dynamic(() => import("@/pages/MainBanner"))
const KeySolutionSection = dynamic(() => import("@/pages/KeySolution"))
const OurServices = dynamic(() => import("@/pages/OurServices"))
const OurProjects = dynamic(() => import("@/pages/OurProjects"))
const ContactUs = dynamic(() => import("@/pages/ContactUs"))

export default async function Home() {
	const queryClient = getQueryClient()

	await Promise.allSettled([
		await queryClient.prefetchQuery(getLogoOptions()),
		await queryClient.prefetchQuery(heroOptions()),
		await queryClient.prefetchQuery(keySolutionOptions()),
		await queryClient.prefetchQuery(servicesOptions()),
	])

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Header />
			<div className='flex-1'>
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
