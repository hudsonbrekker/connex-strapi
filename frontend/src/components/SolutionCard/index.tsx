import { ComponentSharedCard } from "@/__generated__/graphql"
import { cn } from "@/lib/utils"
import { CMS_URL } from "@/types/constants"
import Image from "next/image"
import React, { useEffect, useState } from "react"

type ComponentSharedCardWithImage = Omit<ComponentSharedCard, "image" | "movingImage"> & {
	image: {
		__typename?: "UploadFile" | undefined
		url: string
		documentId: string
		name: string
	}
	movingImage?: {
		__typename?: "UploadFile" | undefined
		url: string
		documentId: string
		name: string
	} | null
}

type SolutionCardProps = {
	item: ComponentSharedCardWithImage
}

const SolutionCard = ({ item }: SolutionCardProps) => {
	const [image, setImage] = useState<string>("")

	const colorMapping = (slug: string) => {
		switch (slug) {
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
				return "text-[#72D7D6] bg-[#023636]"
		}
	}

	const handleMouseIn = () => {
		if (item && item.movingImage) {
			setImage(item.movingImage.url)
		}
	}

	const handleMouseOut = () => {
		if (item && item.image) {
			setImage(item.image.url)
		}
	}

	useEffect(() => {
		if (item && item.image) {
			setImage(item.image.url)
		}
	}, [item])

	return (
		<div
			className='relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl bg-[#050505] p-6 font-ibm text-white shadow-md lg:w-[412px]'
			onMouseEnter={handleMouseIn}
			onMouseLeave={handleMouseOut}
		>
			<div
				className={cn(
					"absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl px-4 py-2",
					colorMapping(item.slug),
				)}
			>
				<p className={cn("text-xl font-semibold")}>{item.slug}</p>
			</div>
			{item.image && (
				<div className='relative h-[100px] w-[100px] flex-shrink-0'>
					<Image
						src={CMS_URL + image}
						alt={item.image.name}
						fill
						draggable='false'
						unoptimized
						className='rounded-xl object-contain'
					/>
				</div>
			)}
			<p className='prose-xl font-semibold'>{item.title}</p>
			<p className='text-black-tertiary prose-base leading-6'>{item.content}</p>
		</div>
	)
}

export default SolutionCard
