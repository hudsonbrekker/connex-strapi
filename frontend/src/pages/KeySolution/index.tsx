"use client"

import SolutionCard from "@/components/SolutionCard"
import { keySolutionOptions } from "@/queries"
import { useGSAP } from "@gsap/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { gsap } from "gsap"
import { useLocale } from "next-intl"

gsap.registerPlugin(useGSAP)

const KeySolutionSection = () => {
	const locale = useLocale()
	const { data, isFetching } = useSuspenseQuery({
		...keySolutionOptions({ locale }),
		select: (data) => {
			return data.keySolution
		},
	})

	return (
		<section
			id='key_solution'
			className='flex w-full flex-col items-center gap-6 px-6 py-12 lg:gap-12 lg:px-0'
		>
			<div className='text-black flex flex-col items-start gap-2 lg:items-center lg:gap-4'>
				<div className='rounded-md bg-[#011C1C] px-2 py-1'>
					<p className='text-secondary font-ibm text-sm font-semibold lg:text-base'>Key Services</p>
				</div>
				<h2 className='text-2xl font-bold leading-[145%] md:text-5xl'>
					Power Up Your Business with Key Solutions
				</h2>
				<p className='text-black-secondary font-ibm text-lg leading-[150%] lg:text-xl'>
					We provide the ultimate experience for both our Partners and Users
				</p>
			</div>
			<div className='flex w-full max-w-[1440px] flex-wrap justify-center gap-4'>
				{!isFetching &&
					data &&
					data.solutionCard &&
					data.solutionCard.map((item, index) => (
						<SolutionCard
							key={index}
							item={item!}
						/>
					))}
			</div>
		</section>
	)
}

export default KeySolutionSection
