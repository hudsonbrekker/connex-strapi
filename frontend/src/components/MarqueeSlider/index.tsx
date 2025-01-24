"use client"

import { cn } from "@/lib/utils"
import { CMS_URL } from "@/types/constants"
import { horizontalLoop } from "@/utils/helper/horizontalLoop"
import { useGSAP } from "@gsap/react"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { gsap } from "gsap"
import Image from "next/image"
import { HTMLAttributes, useRef } from "react"

gsap.registerPlugin(useGSAP)

type MarqueeSliderProps = {
	items: { url: string; name: string }[]
	direction?: "left" | "right"
	speed?: number
	paddingRight?: number
	aspect?: number
} & HTMLAttributes<HTMLDivElement>

const MarqueeSlider = ({
	items,
	direction = "left",
	speed = 0.3,
	paddingRight = 32,
	aspect = 225 / 145,
	...props
}: MarqueeSliderProps) => {
	const marqueeRef = useRef<HTMLDivElement | null>(null)
	const boxesRef = useRef<HTMLDivElement[]>([])

	useGSAP(
		() => {
			if (marqueeRef.current && boxesRef.current.length > 0) { 
				// const marquee = marqueeRef.current
				// const boxes = boxesRef.current
				// Calculate the total width of all items

				// const items = Array.from(marquee.children) as HTMLElement[]

				// // Duplicate items for seamless looping
				// items.forEach((item) => {
				// 	const clone = item.cloneNode(true) as HTMLElement
				// 	marquee.appendChild(clone); // Append clone for left scrolling
				// 	marquee.insertBefore(item.cloneNode(true), marquee.firstChild); // Prepend clone for scrolling right
				// })

				// const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0)

				// // Determine the scroll direction 
				// const scrollDistance = direction === "left" ? totalWidth : -totalWidth

				// gsap.to(marquee, {
				// 	x: scrollDistance, // Scroll to the left
				// 	duration: speed, // Speed of animation
				// 	ease: "none", // Linear movement
				// 	repeat: -1, // Infinite loop,
				// })

				horizontalLoop(boxesRef.current, {
					repeat: -1,
					reversed: direction === "right",
					speed: speed,
					paddingRight,
				})
			}
		},
		{ scope: marqueeRef },
	)

	return (
		<div
			ref={marqueeRef}
			className='inline-flex w-full items-center gap-8'
		>
			{items.map((item, index) => (
				<div
					key={index}
					ref={(el) => {
						boxesRef.current[index] = el!
					}}
					{...props}
					className={cn("marquee-item w-[225px] flex-shrink-0", props.className)}
				>
					<AspectRatio ratio={aspect}>
						<Image
							src={CMS_URL + item.url}
							alt={item.name}
							fill
							draggable='false'
							className='rounded-xl object-contain'
						/>
					</AspectRatio>
				</div>
			))}
		</div>
	)
}

export default MarqueeSlider
