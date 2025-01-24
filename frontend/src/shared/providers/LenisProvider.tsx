"use client"

import ReactLenis, { LenisRef } from "lenis/react"
import { PropsWithChildren, useEffect, useRef } from "react"

const LenisProvider = ({ children }: PropsWithChildren) => {
	const lenisRef = useRef<LenisRef>(null)

	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time)
		}

		const rafId = requestAnimationFrame(update)

		return () => cancelAnimationFrame(rafId)
	}, [])

	return (
		<ReactLenis
			options={{ autoRaf: false }}
			ref={lenisRef}
		>
			{children}
		</ReactLenis>
	)
}

export default LenisProvider
