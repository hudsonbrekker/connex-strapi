"use client"

import MarqueeSlider from "@/components/MarqueeSlider"
import { cn } from "@/lib/utils"
import { heroOptions } from "@/queries"
import { CMS_URL } from "@/types/constants"
import { useGSAP } from "@gsap/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import gsap from "gsap"
import DOMPurify from "isomorphic-dompurify"
import { useLocale } from "next-intl"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const MainBannerSection = () => {
	const locale = useLocale()

	const sectionRef = useRef<HTMLDivElement | null>(null)
	const { data, isFetching } = useSuspenseQuery({
		...heroOptions({ locale }),
		select: (data) => {
			return data.hero
		},
	})

	const [htmlContent, setHtmlContent] = useState<string>("")

	const { contextSafe } = useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: { trigger: sectionRef.current, once: true },
			})

			tl.addLabel("start")

			tl.from(
				".left-content",
				{
					autoAlpha: 0,
					duration: 1,
					x: -50,
				},
				0.1,
			)

			tl.from(
				".banner-img",
				{
					autoAlpha: 0,
					duration: 1,
					x: 50,
				},
				0.1,
			)

			const boxs = gsap.utils.toArray(".number-text")

			boxs.forEach((box, index) => {
				tl.from(
					box as gsap.TweenTarget,
					{
						autoAlpha: 0,
						y: 50,
						delay: 0.2 + index * 0.1,
					},
					0.1,
				)
			})

			tl.addLabel("end")
		},
		{ scope: sectionRef },
	)

	const onScrollTo = contextSafe((idString: string, duration: number) => {
		gsap.to(window, { duration, scrollTo: idString })
	})

	useEffect(() => {
		if (!isFetching && data) {
			setHtmlContent(data.description)
		}
	}, [data, isFetching])

	return (
		<section
			ref={sectionRef}
			id='main_banner'
			className={cn(
				"flex w-full flex-col items-center justify-center gap-8 overflow-hidden bg-[#FCFCFC] py-8 text-primary md:gap-12 lg:py-12",
			)}
		>
			<div className='grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 2xl:px-0'>
				{!isFetching && data && (
					<div className='left-content flex flex-col items-start justify-center gap-4 md:gap-8'>
						<h1 className='text-black text-2xl font-bold leading-[145%] lg:text-5xl'>
							{data.title}
						</h1>
						<p
							className='text-black-secondary font-ibm text-lg lg:text-xl'
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
						></p>
						<div className='flex w-full justify-center gap-4 md:justify-start'>
							<button
								className='text-accent btn btn-secondary h-10 min-h-0 flex-1 px-4 py-2 md:flex-none'
								onClick={() => onScrollTo("#our_services", 2)}
							>
								Our service
							</button>
							<button
								className='btn btn-primary h-10 min-h-0 flex-1 px-4 py-2 text-base-100 md:flex-none'
								onClick={() => onScrollTo("#contact_us", 1)}
							>
								Contact us
							</button>
						</div>
					</div>
				)}

				<div className='banner-img relative flex h-[258px] justify-center lg:h-[604px]'>
					{!isFetching && data && (
						<Image
							src={CMS_URL + data.heroImage.url}
							alt='image-banner'
							fill
							priority
							draggable='false'
							className='object-contain'
						/>
					)}
				</div>
			</div>
			{!isFetching && data && data.logo.length > 0 && (
				<MarqueeSlider
					items={Array.from({ length: 6 })
						.flatMap(() => data.logo)
						.map((item) => {
							if (item) {
								return { url: item.url, name: item.name }
							}
							return { url: "", name: "" }
						})}
					className='w-[72px] xl:w-[120px]'
				/>
			)}
			<div />

			<div className='relative flex min-h-[290px] w-full flex-col items-center gap-12 border border-x-0 border-y-[#72D7D6] pt-12'>
				<div className='absolute inset-0 h-full w-full bg-[rgba(8,185,184,0.04)] bg-[radial-gradient(#95E1E0_2px,transparent_2px)] opacity-[0.6] [background-size:32px_32px]'></div>
				<p className='z-10 text-center text-2xl font-semibold lg:text-5xl'>
					Our number speak for themselves
				</p>
				{!isFetching && data && data.ourNumber && (
					<div className='z-10 flex w-full flex-col items-center justify-center gap-4 border-t border-t-[#72D7D6] lg:flex-row'>
						{data.ourNumber.map((info, index) => {
							return (
								<div
									className={cn(
										"flex h-full w-full flex-col items-center gap-4 border-[#72D7D6] pb-6 pt-3 lg:w-[310px] lg:pb-12 lg:pt-8",
										index < data.ourNumber.length - 1
											? "border-b lg:border-b-0 lg:border-l"
											: "border-0 lg:border-l lg:border-r",
									)}
									key={index}
								>
									<p className='number-text text-accent prose text-6xl font-semibold leading-[150%] lg:text-7xl'>{`${info?.number}${info?.body ?? ""}`}</p>
									<p className='number-content text-lg lg:text-xl'>{info?.title}</p>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</section>
	)
}

export default MainBannerSection
