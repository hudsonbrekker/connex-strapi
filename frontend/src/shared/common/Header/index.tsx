"use client"

import { cn } from "@/lib/utils"
import { getLogoOptions } from "@/queries"
import { CMS_URL, HEADER_HEIGHT } from "@/types/constants"
import { useSuspenseQuery } from "@tanstack/react-query"
import Image from "next/image"

const Header = () => {
	const { data, isFetching } = useSuspenseQuery({
		...getLogoOptions(),
		select: (data) => {
			return data.global
		},
	})

	return (
		<div
			className={cn("navbar z-50 min-h-0 px-16", "justify-center")}
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<div className='flex w-full lg:max-w-[1280px] xl:max-w-[1440px]'>
				<div className='flex-1'>
					<div className='relative h-[34px] w-[169px] cursor-pointer'>
						{!isFetching && data && data.logo && (
							<Image
								src={CMS_URL + data.logo.url}
								alt='site-logo'
								fill
								draggable='false'
								fetchPriority='high'
								className='object-contain'
							/>
						)}
					</div>
				</div>
				<div className='prose-base prose-neutral flex-none'>
					<ul className='menu menu-horizontal items-center gap-4 px-1'>
						<li>
							<a
								className='btn btn-ghost'
								href='#'
							>
								Services
							</a>
						</li>
						<li>
							<a
								className='btn btn-ghost'
								href='#'
							>
								Projects
							</a>
						</li>
						<li>
							<details>
								<summary className='font-semibold'>English</summary>
								<ul className='min-w-32 border bg-base-100'>
									<li className='m-0 ps-0'>
										<div className='flex justify-center'>English</div>
									</li>
									<div className='divider m-0 p-0'></div>
									<li className='m-0 ps-0'>
										<div className='flex justify-center'>Korean</div>
									</li>
								</ul>
							</details>
						</li>
						<li>
							<button className='btn btn-primary text-base-100 px-4 py-2 font-semibold'>Contact us</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Header
