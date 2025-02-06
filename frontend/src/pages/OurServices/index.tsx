"use client"

import CollapseWithImage from "@/components/CollapseIWImage"
import { servicesOptions } from "@/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import React from "react"

const OurServices = () => {
	const locale = useLocale()
	const { data, isFetching } = useSuspenseQuery({
		...servicesOptions({ locale }),
		select: (data) => {
			return data.service
		},
	})

	return (
		<section
			id='our_services'
			className='flex min-h-screen w-full flex-col items-center gap-6 px-6 pb-8 pt-0 lg:gap-[82px] lg:pb-24 lg:pt-24'
		>
			<div className='flex max-w-6xl flex-col items-center gap-5 text-start lg:text-center'>
				{!isFetching && data && (
					<>
						<h2 className='text-2xl font-semibold leading-[145%] lg:text-5xl'>{data.title}</h2>
						<p className='text-black-secondary font-ibm text-lg leading-[150%] lg:text-2xl'>
							{data.body}
						</p>
					</>
				)}
			</div>
			<div className='flex flex-col gap-12 lg:gap-[128px] w-full max-w-[1440px]'>
				{!isFetching &&
					data &&
					data.services.map((service, index) => (
						<CollapseWithImage
							item={service!}
							direction={index % 2 ? "right" : "left"}
							key={index}
						/>
					))}
			</div>
		</section>
	)
}

export default OurServices
