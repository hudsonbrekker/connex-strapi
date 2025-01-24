"use client"

import CollapseWithImage from "@/components/CollapseIWImage"
import { servicesOptions } from "@/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import React from "react"

const OurServices = () => {
	const { data, isFetching } = useSuspenseQuery({
		...servicesOptions({ locale: "en" }),
		select: (data) => {
			return data.service
		},
	})

	return (
		<section
			id='our_services'
			className='flex min-h-screen w-full flex-col items-center gap-6 px-6 pb-24 pt-0 lg:gap-[82px] lg:pt-24'
		>
			<div className='flex max-w-6xl flex-col items-center gap-5 text-start lg:text-center'>
				{!isFetching && data && (
					<>
						<h2 className='text-2xl font-semibold leading-[145%] lg:text-5xl'>{data.title}</h2>
						<p className='font-ibm text-black-secondary text-lg leading-[150%] lg:text-2xl'>
							{data.body}
						</p>
					</>
				)}
			</div>
			<div className='flex flex-col gap-12 lg:gap-[128px]'>
				{!isFetching &&
					data &&
					data.services.map((service, index) => (
						<CollapseWithImage
							item={service!}
							itemIndex={index}
							direction={index % 2 ? "right" : "left"}
							key={index}
						/>
					))}
			</div>
		</section>
	)
}

export default OurServices
