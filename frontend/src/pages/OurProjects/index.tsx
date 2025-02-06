"use client"

import { ComponentSharedHighlightCard } from "@/__generated__/graphql"
import MarqueeSlider from "@/components/MarqueeSlider"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { projectsOptions } from "@/queries"
import { ComponentSharedWithImage } from "@/types"
import { CMS_URL } from "@/types/constants"
import { useGSAP } from "@gsap/react"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useWindowSize } from "@uidotdev/usehooks"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const OurProjects = () => {
	const locale = useLocale()
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const [currentHighlight, setCurrentHighlight] = useState<
		ComponentSharedWithImage<ComponentSharedHighlightCard> | undefined | null
	>(null)
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const size = useWindowSize()

	const { data, isFetching } = useSuspenseQuery({
		...projectsOptions({ pagination: { limit: 50 }, locale }),
		select: (data) => {
			return data.project
		},
	})

	const nextPage = () => {
		if (data && data.hightlightList) {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % data.hightlightList.length)
		}
	}

	const previousPage = () => {
		if (data && data.hightlightList) {
			setCurrentIndex(
				(prevIndex) => (prevIndex - 1 + data.hightlightList.length) % data.hightlightList.length,
			)
		}
	}

	const mappingColor = (slug: string) => {
		const src = slug.slice(0, 2)

		switch (src) {
			case "CM":
				return "text-[#72D7D6] bg-[#023636]"
			case "CS":
				return "text-[#84AAFD] bg-[#002B8B]"
			case "MO":
				return "text-[#FCCC59] bg-[#6D500A]"
			case "QA":
				return "text-[#F7A080] bg-[#69270F]"
			case "LC":
				return "text-[#06D597] bg-[#023F2C]"
			default:
				return "text-[#FCCC59] bg-[#6D500A]"
		}
	}

	useEffect(() => {
		if (!isFetching && data) {
			setCurrentHighlight(data.hightlightList[currentIndex])
		}
	}, [data, isFetching, currentIndex])

	useGSAP(
		() => {
			const leaveAnimation = (batch: Element[]) =>
				gsap.to(batch, {
					opacity: 0,
					y: 100,
					stagger: 0.2,
					duration: 1,
				})

			const enterAnimation = (batch: Element[]) =>
				gsap.to(batch, {
					opacity: 1,
					y: 0,
					stagger: 0.2,
					duration: 1,
				})

			ScrollTrigger.batch(".projects", {
				start: "top 80%",
				end: "bottom 20%",
				onEnter: enterAnimation,
				// onLeave: leaveAnimation,
				onEnterBack: enterAnimation,
				onLeaveBack: leaveAnimation,
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section
			ref={sectionRef}
			id='our_projects'
			className='relative mt-10 flex flex-col items-start gap-11 px-4 pb-16 pt-12 lg:mt-24 lg:items-center lg:pb-32 lg:pt-24'
		>
			<div className='absolute inset-0 z-0 h-full w-full bg-[rgba(183,234,234,0.15)] bg-[linear-gradient(to_right,rgba(183,234,234,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(183,234,234,0.5)_1px,transparent_1px)] bg-[size:120px_85px]'></div>
			<div className='z-10 flex flex-col items-start gap-4 lg:hidden'>
				<div className='rounded-md bg-[#011C1C] px-2 py-1'>
					<p className='text-secondary text-sm font-semibold'>Highlighted Project</p>
				</div>
				<h2 className='text-2xl font-bold leading-[145%]'>Project & Responsibilities</h2>
			</div>

			<div className='projects z-10 grid w-full max-w-[1440px] grid-cols-1 items-center md:grid-cols-3'>
				<div className='flex w-full justify-center'>
					{!isFetching && data && currentHighlight && (
						<Card className='z-20 w-[90%] rounded-[32px] border-none bg-[#050505] md:w-full'>
							<CardHeader className='pb-2 lg:pb-4'>
								<AspectRatio ratio={1}>
									<Image
										src={CMS_URL + currentHighlight.image.url}
										alt={`${currentHighlight.image.name}-${currentHighlight.image.documentId}`}
										fill
										className='rounded-2xl object-cover'
									/>
								</AspectRatio>
							</CardHeader>
							<CardContent className='pb-4 text-white'>
								<h2 className='text-secondary card-title'>{currentHighlight.projectName}</h2>
							</CardContent>
							<CardFooter className='justify-between gap-2'>
								<div className='flex gap-2'>
									{(currentHighlight.category as string[]).map((cate, index) => (
										<div
											key={index}
											className={cn(
												"flex min-h-10 items-center rounded-md bg-[#023636] px-2 text-[#72D7D6]",
												mappingColor(cate),
											)}
										>
											<p className='lg:prose-base xl:prose-lg'>{cate}</p>
										</div>
									))}
								</div>
								<div className='flex gap-4'>
									<button
										className='btn btn-secondary h-7 min-h-0 px-1'
										onClick={previousPage}
									>
										{size.width && (
											<ChevronLeft
												color='#056B6A'
												size={size.width <= 768 ? 20 : 30}
											/>
										)}
									</button>
									<button
										className='btn btn-secondary h-7 min-h-0 px-1'
										onClick={nextPage}
									>
										{size.width && (
											<ChevronRight
												color='#056B6A'
												size={size.width <= 768 ? 20 : 30}
											/>
										)}
									</button>
								</div>
							</CardFooter>
						</Card>
					)}
				</div>

				<div className='relative col-span-2 ml-0 flex flex-col items-start justify-center gap-4 md:ml-[-60px]'>
					<div className='hidden flex-col items-start gap-4 pl-24 lg:flex'>
						<div className='rounded-md bg-[#011C1C] px-2 py-1'>
							<p className='text-secondary font-semibold'>Highlighted Project</p>
						</div>
						<h2 className='text-5xl font-bold leading-[145%]'>Project & Responsibilities</h2>
					</div>

					<div className='mt-[-32px] flex w-full flex-col gap-6 overflow-hidden rounded-2xl bg-[#50CDCC] pb-4 pt-14 md:mt-0 md:pt-4'>
						{!isFetching && data && data.projectCarousel && (
							<>
								{size.width && (
									<>
										<MarqueeSlider
											items={data.projectCarousel
												.filter((item) => item?.name.includes("top"))
												.map((val) => {
													return {
														url: val!.url,
														name: val!.name,
													}
												})}
											aspect={1}
											paddingRight={size.width <= 768 ? 16 : 24}
											className='w-[56px] md:w-[115px]'
											direction='left'
										/>
										<MarqueeSlider
											items={Array.from({ length: 5 })
												.flatMap(() => data.projectCarousel)
												.filter((item) => item?.name.includes("bottom"))
												.map((val) => {
													return {
														url: val!.url,
														name: val!.name,
													}
												})}
											aspect={1}
											paddingRight={size.width <= 768 ? 16 : 24}
											className='w-[56px] md:w-[115px]'
											direction='right'
										/>
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default OurProjects
