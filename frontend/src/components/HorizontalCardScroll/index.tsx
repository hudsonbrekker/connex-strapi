"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const KeySolutionCard = () => {
	// const containerRef = useRef<HTMLDivElement | null>(null)
	// const scrollRef = useRef<HTMLDivElement | null>(null)

	// useGSAP(
	// 	() => {
	// 		const container = containerRef.current
	// 		const scrollContent = scrollRef.current

	// 		const lenis = new Lenis({
	// 			duration: 1.2,
	// 			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	// 			orientation: "vertical",
	// 			autoRaf: false,
	// 			smoothWheel: true,
	// 		})

	// 		const animateLenis = (time: number) => {
	// 			lenis.raf(time)
	// 			requestAnimationFrame(animateLenis)
	// 		}
	// 		requestAnimationFrame(animateLenis)

	// 		if (container && scrollContent) {
	// 			const totalScrollWidth = scrollContent.scrollWidth - container.offsetWidth + 200

	// 			gsap.to(scrollRef.current, {
	// 				x: -totalScrollWidth,
	// 				ease: "none",
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: "bottom bottom",
	// 					end: () => `+=${totalScrollWidth ?? 0}`,
	// 					scrub: true,
	// 					pin: true,
	// 					anticipatePin: 1,
	// 				},
	// 			})
	// 		}
	// 		// Cleanup on unmount
	// 		return () => lenis.destroy()
	// 	},
	// 	{ scope: containerRef },
	// )

	return (
		<div className='md:w-[470px] lg:w-[720px]'>
			<div className='relative ml-6 w-[140px]'>
				<AspectRatio ratio={1}>
					<Image
						src={`https://placehold.co/140x140/png`}
						alt={`solution-card`}
						fill
						className='h-full w-full rounded-xl object-cover shadow-md'
					/>
				</AspectRatio>
			</div>
			<div className='mt-[-3rem] rounded-xl bg-[#050505] p-7 px-7 pb-7 pt-[74px] text-white shadow-xl md:min-h-[280px] lg:min-h-[420px]'>
				<h2 className='text-4xl font-bold leading-[150%]'>Community management</h2>
				<p className='text-2xl leading-[150%]'>
					Based on our product insight, we plan & propose a SNS operational strategy according to
					local cultures & trends
				</p>
			</div>
		</div>

		/* <div className='relative w-full'>
				<div
					ref={scrollRef}
					className='absolute flex h-full min-w-[200px] gap-6 px-8'
				>
					{Array.from({ length: 6 }).map((_, index) => (
						<KeySolutionCard key={index} />
					))}
				</div>
			</div> */
	)
}

export default KeySolutionCard
