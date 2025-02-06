"use client"

import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useGSAP } from "@gsap/react"
import { useForm } from "@tanstack/react-form"
import { useWindowSize } from "@uidotdev/usehooks"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
import { z } from "zod"

import {
	CreateContactDocument,
	CreateContactMutation,
	CreateContactMutationVariables,
} from "@/__generated__/graphql"
import confetti_mobile from "@/assets/images/confetti-bg-mobile.png"
import confetti_bg from "@/assets/images/confetti-bg.png"
import layer_mobile from "@/assets/images/logo-layer-mobile.png"
import layer_logo from "@/assets/images/logo-layer.png"
import { execute } from "@/graphql/execute"
import { cn } from "@/lib/utils"
import { services } from "@/types/constants"
import { useMutation } from "@tanstack/react-query"

const contactSchema = z.object({
	name: z.string({ message: "Name is required" }).trim(),
	company: z.string().trim().optional(),
	email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }).trim(),
	service: z.string().optional(),
	message: z.string().trim().optional(),
})

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ContactUs = () => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const logoRef = useRef<HTMLImageElement | null>(null)
	const size = useWindowSize()
	const [isSubmitContact, setIsSubmitContact] = useState<boolean>(false)

	const form = useForm<z.infer<typeof contactSchema>>({
		defaultValues: {
			name: "",
			company: "",
			email: "",
			service: "",
			message: "",
		},
		validators: {
			onSubmit: contactSchema,
		},
		onSubmit: async ({ value }) => {
			createContactMutation.mutate({ data: value })
		},
	})

	const handleSubmit = (ev: FormEvent) => {
		ev.preventDefault()
		ev.stopPropagation()
		form.handleSubmit()
	}

	const createContactMutation = useMutation({
		mutationKey: ["CreateContact"],
		mutationFn: (variables?: CreateContactMutationVariables) =>
			execute<CreateContactMutation, CreateContactMutationVariables>(
				CreateContactDocument,
				variables,
			)(),
		onSuccess: () => {
			setIsSubmitContact(true)
		},
	})

	useGSAP(
		() => {
			if (containerRef.current && logoRef.current) {
				// QuickTo functions for smooth movement
				const xTo = gsap.quickTo(logoRef.current, "x", { duration: 0.6, ease: "power3" })
				const yTo = gsap.quickTo(logoRef.current, "y", { duration: 0.6, ease: "power3" })

				const handleMouseMove = (e: MouseEvent) => {
					if (!containerRef.current) return
					const { left, top, width, height } = containerRef.current.getBoundingClientRect()

					// Calculate mouse position relative to the container
					const relativeX = e.clientX - left - width / 2
					const relativeY = e.clientY - top - height / 2

					// Calculate offset for opposite movement
					const offsetX = relativeX * -0.05 // Adjust factor for movement strength
					const offsetY = relativeY * -0.05 // Adjust factor for movement strength

					// Move the image
					xTo(offsetX)
					yTo(offsetY)
				}

				containerRef.current.addEventListener("mousemove", handleMouseMove)
			}
		},
		{ scope: logoRef },
	)

	return (
		<section
			id='contact_us'
			className='relative flex justify-center overflow-hidden px-4 py-24 md:py-40'
			ref={containerRef}
		>
			{size.width && (
				<Image
					src={size.width <= 768 ? confetti_mobile.src : confetti_bg.src}
					alt='confetti-bg'
					fill
					draggable='false'
					className='confetti object-cover md:object-contain'
				/>
			)}

			<Image
				ref={logoRef}
				src={layer_logo.src}
				alt='logo-layer'
				fill
				draggable='false'
				className='top-layer hidden object-cover md:block md:object-contain'
				style={{
					willChange: "transform",
				}}
			/>
			<Image
				src={layer_mobile.src}
				alt='logo-layer'
				fill
				draggable='false'
				className='top-layer block object-cover md:hidden md:object-contain'
			/>

			<div className='flex w-full max-w-[1440px] flex-col items-center gap-6 md:gap-12'>
				<div className='z-10 flex flex-col items-center gap-4'>
					<div className='rounded-md bg-[#011C1C] px-2 py-1'>
						<p className='text-secondary text-sm font-semibold md:text-xl'>Connect with us</p>
					</div>
					<h2 className='text-center text-2xl font-bold leading-[145%] md:text-5xl'>
						Fill the form and we’ll get back to you
					</h2>
				</div>

				{isSubmitContact && (
					<div className='relative flex h-[520px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#050505] p-6 md:h-[400px] md:w-[610px] md:gap-4'>
						<video
							autoPlay
							playsInline
							muted
							preload='auto'
							width={150}
							height={150}
						>
							<source
								src='/email.mp4'
								type='video/mp4'
							/>
							Your browser does not support the video tag.
						</video>

						<h3 className='prose prose-xl font-semibold text-base-100 md:prose-2xl'>Thank you</h3>
						<p className='prose prose-lg text-center text-base-100 md:prose-xl'>
							Thank you for reaching out! We’ve received your contact details and will get back to
							you as soon as possible.
						</p>
					</div>
				)}
				<form
					onSubmit={handleSubmit}
					className={cn("z-10 w-full md:w-[610px]", isSubmitContact ? "hidden" : "block")}
				>
					<div className='flex flex-col items-center gap-8 rounded-xl bg-[#050505] p-6'>
						<div className='grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-6'>
							<form.Field name='name'>
								{(field) => (
									<div className='form-control w-full'>
										<Input
											type='text'
											name={field.name}
											value={field.state.value}
											placeholder='Name'
											className='input w-full placeholder:text-[#A4A4A4]'
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<div className='label text-red-600'>
												<span className='label-text-alt'>{field.state.meta.errors.join(",")}</span>
											</div>
										)}
									</div>
								)}
							</form.Field>
							<form.Field name='company'>
								{(field) => (
									<div className='form-control w-full'>
										<Input
											type='text'
											name={field.name}
											value={field.state.value}
											placeholder='Company'
											className='input w-full placeholder:text-[#A4A4A4]'
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<div className='label text-red-600'>
												<span className='label-text-alt'>{field.state.meta.errors.join(",")}</span>
											</div>
										)}
									</div>
								)}
							</form.Field>
						</div>
						<div className='grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-6'>
							<form.Field name='email'>
								{(field) => (
									<div className='form-control relative w-full'>
										<Input
											type='email'
											name={field.name}
											value={field.state.value}
											placeholder='Email'
											className='input w-full placeholder:text-[#A4A4A4]'
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<div className='label absolute bottom-[-30px] text-red-600'>
												<span className='label-text-alt'>{field.state.meta.errors.join(",")}</span>
											</div>
										)}
									</div>
								)}
							</form.Field>
							<form.Field name='service'>
								{(field) => (
									<div className='form-control w-full'>
										<Select
											name={field.name}
											value={field.state.value}
											onValueChange={(val) => field.handleChange(val)}
										>
											<SelectTrigger className='w-full placeholder:text-[#A4A4A4]'>
												<SelectValue
													placeholder={<span className='text-[#A4A4A4]'>Services</span>}
												/>
											</SelectTrigger>
											<SelectContent
												onBlur={field.handleBlur}
												id='services'
											>
												{services.map((item, index) => (
													<SelectItem
														key={index}
														value={item}
													>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{field.state.meta.errors.length > 0 && (
											<div className='label text-red-600'>
												<span className='label-text-alt'>{field.state.meta.errors.join(",")}</span>
											</div>
										)}
									</div>
								)}
							</form.Field>
						</div>
						<form.Field name='message'>
							{(field) => (
								<div className='form-control w-full'>
									<Textarea
										rows={5}
										name={field.name}
										value={field.state.value}
										placeholder='Leave us a message...'
										className='textarea w-full placeholder:text-[#A4A4A4]'
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.length > 0 && (
										<div className='label text-red-600'>
											<span className='label-text-alt'>{field.state.meta.errors.join(",")}</span>
										</div>
									)}
								</div>
							)}
						</form.Field>
						<button
							className='btn btn-primary min-h-[66px] w-full'
							type='submit'
						>
							<p className='text-base font-semibold text-white md:text-lg'>Submit</p>
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default ContactUs
