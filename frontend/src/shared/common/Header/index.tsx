"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { getLogoOptions } from "@/queries"
import { CMS_URL, HEADER_HEIGHT } from "@/types/constants"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Globe, Menu } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

const Header = () => {
	const menuRef = useRef<HTMLDivElement | null>(null)
	const locale = useLocale()
	const { data, isFetching } = useSuspenseQuery({
		...getLogoOptions(),
		select: (data) => {
			return data.global
		},
	})

	const { contextSafe } = useGSAP({ scope: menuRef })

	const onScrollTo = contextSafe((idString: string) => {
		gsap.to(window, { duration: 2, scrollTo: idString })
	})

	return (
		<div
			className={cn("navbar z-50 justify-center px-4 lg:px-16 bg-base-100 border-b")}
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<div className='flex w-full max-w-none lg:max-w-[1440px]'>
				{/* Left Section: Logo */}
				<div className='flex-1'>
					<div className='relative h-[26px] w-[131px] cursor-pointer md:h-[34px] md:w-[169px]'>
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

				{/* Center Section: Desktop Menu */}
				<div
					className='prose-base prose-neutral hidden flex-none lg:block'
					ref={menuRef}
				>
					<ul className='menu menu-horizontal items-center gap-4 px-1'>
						<li>
							<a
								className='btn btn-ghost'
								onClick={() => onScrollTo("#our_services")}
							>
								Services
							</a>
						</li>
						<li>
							<a
								className='btn btn-ghost'
								onClick={() => onScrollTo("#our_projects")}
							>
								Projects
							</a>
						</li>
						<li>
							<details>
								<summary className='font-semibold'>
									{locale === "en" ? "English" : "Korean"}
								</summary>
								<ul className='min-w-32 border bg-base-100'>
									<li className='m-0 ps-0'>
										<Link
											href={"/"}
											locale='en'
											className={cn("flex justify-center", locale === "en" && "text-secondary")}
										>
											English
										</Link>
									</li>
									<div className='divider m-0 p-0'></div>
									<li className='m-0 ps-0'>
										<Link
											href={"/"}
											locale='ko'
											className={cn("flex justify-center", locale === "ko" && "text-secondary")}
										>
											Korean
										</Link>
									</li>
								</ul>
							</details>
						</li>
						<li>
							<button
								className='btn btn-primary px-4 py-2 font-semibold text-base-100'
								onClick={() => onScrollTo("#contact_us")}
							>
								Contact us
							</button>
						</li>
					</ul>
				</div>

				{/* Right Section: Mobile Menu */}
				<div className='flex gap-4 lg:hidden'>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Globe />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							sideOffset={16}
							className='[&>*]:font-ibm [&>*]:font-normal'
						>
							<DropdownMenuItem className='px-1 py-2 text-center'>
								<Link
									href={"/"}
									locale='en'
									className={cn("flex justify-center", locale === "en" && "text-secondary")}
								>
									English
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='px-1 py-2 text-center'>
								<Link
									href={"/"}
									locale='ko'
									className={cn("flex justify-center", locale === "ko" && "text-secondary")}
								>
									Korean
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Mobile Full-Width Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Menu />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							sideOffset={16}
							className='w-screen rounded-none border-x-0 [&>*]:font-ibm [&>*]:font-semibold'
							ref={menuRef}
						>
							<DropdownMenuItem
								className='px-2 py-4'
								onClick={() => onScrollTo("#our_services")}
							>
								Services
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='px-2 py-4'
								onClick={() => onScrollTo("#our_projects")}
							>
								Projects
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='px-2 py-4'
								onClick={() => onScrollTo("#contact_us")}
							>
								Contact us
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}

export default Header
