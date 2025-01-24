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
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { FormEvent, useRef } from "react"
import { z } from "zod"

import confetti_bg from "@/assets/images/confetti-bg.png"
import Image from "next/image"

const contactSchema = z.object({
	name: z.string({ message: "Name is required" }).trim(),
	company: z.string().trim().optional(),
	email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }).trim(),
	service: z.string().trim().optional(),
	message: z.string().trim().optional(),
})

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ContactUs = () => {
	const formRef = useRef<HTMLDivElement | null>(null)

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
			console.log(value)
		},
	})

	const handleSubmit = (ev: FormEvent) => {
		ev.preventDefault()
		ev.stopPropagation()
		form.handleSubmit()
	}

	useGSAP(
		() => {
			gsap.set(".confetti", {
				scale: 0, // Start with scale 0
				y: 150, // Start from the bottom (offscreen)
				opacity: 0, // Full opacity at the start
			})

			ScrollTrigger.batch(".confetti", {
				start: "top 100%",
				end: "center center",
				onEnter: (batch) => {
					gsap.to(batch, {
						scale: 1.3, // Burst to 1.2x size
						y: -150, // Move upward
						opacity: 1,
						duration: 1.5, // Total duration
						ease: "power4.out", // Smooth upward motion
					})
				},
				onLeaveBack: (batch) => {
					gsap.to(batch, {
						y: 150,
						scale: 0,
						duration: 0.5,
						ease: "power4.in",
					})
				},
			})
		},
		{ scope: formRef },
	)

	return (
		<section
			id='contact_us'
			className='relative flex justify-center py-40'
		>
			<Image
				src={confetti_bg.src}
				alt='confetti-bg'
				fill
				className='confetti object-contain'
			/>

			<div className='flex max-w-[1440px] flex-col items-center gap-12'>
				<div className='z-10 flex flex-col items-center gap-4'>
					<div className='rounded-md bg-[#011C1C] px-2 py-1'>
						<p className='text-secondary font-semibold'>Connect with us</p>
					</div>
					<h2 className='text-5xl font-bold leading-[145%]'>
						Fill the form and we’ll get back to you
					</h2>
				</div>
				<form
					onSubmit={handleSubmit}
					className='z-10'
				>
					<div className='flex w-[610px] flex-col items-center gap-8 rounded-xl bg-[#050505] p-6'>
						<div className='grid w-full grid-cols-2 gap-6'>
							<form.Field name='name'>
								{(field) => (
									<div className='form-control w-full'>
										<Input
											type='text'
											name={field.name}
											value={field.state.value}
											placeholder='Name'
											className='input w-full'
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
											className='input w-full'
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
						<div className='grid w-full grid-cols-2 gap-6'>
							<form.Field name='email'>
								{(field) => (
									<div className='form-control relative w-full'>
										<Input
											type='email'
											name={field.name}
											value={field.state.value}
											placeholder='Email'
											className='input w-full'
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
											<SelectTrigger className='w-full'>
												<SelectValue
													className='text-[#ADABC3]'
													placeholder='Service'
												/>
											</SelectTrigger>
											<SelectContent
												onBlur={field.handleBlur}
												id='services'
											>
												<SelectItem value='light'>Light</SelectItem>
												<SelectItem value='dark'>Dark</SelectItem>
												<SelectItem value='system'>System</SelectItem>
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
										placeholder='Please type your message here...'
										className='textarea w-full'
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
							<p className='text-lg font-bold text-white'>Submit</p>
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default ContactUs
