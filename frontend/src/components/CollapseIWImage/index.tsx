import { ComponentSharedServiceGroup } from "@/__generated__/graphql"
import { cn } from "@/lib/utils"
import { ComponentSharedWithImage } from "@/types"
import { CMS_URL } from "@/types/constants"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

type CollapseWithImageProps = {
	item: ComponentSharedWithImage<ComponentSharedServiceGroup>
	direction: "left" | "right"
}

const CollapseWithImage = ({
	item: { title, serviceContent, image },
	direction = "left",
}: CollapseWithImageProps) => {
	// const [currentIndex, setCurrentIndex] = useState<number>(-1)

	// const handleOnChange = (index: number) => {
	// 	setCurrentIndex(index === currentIndex ? -1 : index)
	// }

	return (
		<div
			className={cn(
				"flex items-start gap-6",
				direction === "left" ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse",
			)}
		>
			<p className='text-black block font-ibm text-2xl font-semibold leading-[150%] lg:hidden'>
				{title}
			</p>
			<div className='relative h-[225px] w-full lg:h-[450px]'>
				<Image
					src={CMS_URL + image.url}
					alt={image.name}
					fill
					className='rounded-xl object-contain'
				/>
			</div>

			<div className='flex w-full flex-col gap-4 font-ibm lg:gap-8'>
				<p className='text-black hidden text-2xl font-semibold leading-[150%] lg:block'>{title}</p>
				{/* {serviceContent.map((item, index) => (
					<div
						className='collapse collapse-plus cursor-pointer rounded-2xl border border-[#CACACA]'
						key={index}
					>
						<input
							type='radio'
							name={`service-${itemIndex}-accordion-${index}`}
							checked={currentIndex === index}
							className='cursor-pointer'
							onChange={() => handleOnChange(index)}
							onClick={() =>
								currentIndex === index ? setCurrentIndex(-1) : setCurrentIndex(index)
							}
						/>
						<div className='text-black collapse-title text-lg lg:text-xl'>{item?.header}</div>
						<div
							className='text-black collapse-content [&>li]:leading-[150%] [&>ul]:list-disc [&>ul]:px-4'
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.content ?? "") }}
						/>
					</div>
				))} */}
				<Accordion
					type='single'
					collapsible
					className='flex w-full flex-col gap-4 font-ibm lg:gap-8'
				>
					{serviceContent.map((item, index) => (
						<AccordionItem
							value={`item-${index}`}
							key={index}
						>
							<AccordionTrigger className='text-black text-start text-lg lg:text-xl'>
								{item?.header}
							</AccordionTrigger>
							<AccordionContent className='text-black'>
								<div
									className='relative [&>li]:leading-[150%] [&>ul]:list-disc [&>ul]:px-5'
									dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.content ?? "") }}
								/>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	)
}

export default CollapseWithImage
