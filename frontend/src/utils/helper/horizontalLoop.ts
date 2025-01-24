import { gsap } from "gsap"

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/

interface HorizontalLoopConfig {
	repeat?: number
	paused?: boolean
	speed?: number
	snap?: number | boolean | ((value: number) => number)
	paddingRight?: number
	reversed?: boolean
}

interface HorizontalLoopTimeline extends gsap.core.Timeline {
	next: (vars?: gsap.TweenVars) => gsap.core.Tween
	previous: (vars?: gsap.TweenVars) => gsap.core.Tween
	current: () => number
	toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween
	times: number[]
}

export const horizontalLoop = (
	items: HTMLElement[] | NodeListOf<HTMLElement> | string,
	config: HorizontalLoopConfig = {},
): HorizontalLoopTimeline => {
	const elements = gsap.utils.toArray<HTMLElement>(items)
	const {
		repeat = -1,
		paused = false,
		speed = 1,
		snap = 1,
		paddingRight = 0,
		reversed = false,
	} = config

	const tl = gsap.timeline({
		repeat,
		paused,
		defaults: { ease: "none" },
		onReverseComplete: () => {
			tl.totalTime(tl.rawTime() + tl.duration() * 100)
		},
	}) as HorizontalLoopTimeline

	const length = elements.length
	const startX = elements[0].offsetLeft
	const times: number[] = []
	const widths: number[] = []
	const xPercents: number[] = []
	let curIndex = 0
	const pixelsPerSecond = speed * 100
	const snapFn =
		snap === false
			? (v: number) => v
			: typeof snap === "function"
				? snap
				: gsap.utils.snap(snap as number | number[])

	// Set initial positions and calculate total width
	gsap.set(elements, {
		xPercent: (i, el) => {
			const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string))
			xPercents[i] = snapFn(
				(parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
					parseFloat(gsap.getProperty(el, "xPercent") as string),
			)
			return xPercents[i]
		},
	})

	gsap.set(elements, { x: 0 })

	const totalWidth =
		elements[length - 1].offsetLeft +
		(xPercents[length - 1] / 100) * widths[length - 1] -
		startX +
		elements[length - 1].offsetWidth *
			(parseFloat(gsap.getProperty(elements[length - 1], "scaleX") as string) || 1) +
		paddingRight

	// Create the timeline
	elements.forEach((item, i) => {
		const curX = (xPercents[i] / 100) * widths[i]
		const distanceToStart = item.offsetLeft + curX - startX
		const distanceToLoop =
			distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string)

		tl.to(
			item,
			{
				xPercent: snapFn(((curX - distanceToLoop) / widths[i]) * 100),
				duration: distanceToLoop / pixelsPerSecond,
			},
			0,
		)
			.fromTo(
				item,
				{
					xPercent: snapFn(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
				},
				{
					xPercent: xPercents[i],
					duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
					immediateRender: false,
				},
				distanceToLoop / pixelsPerSecond,
			)
			.add(`label${i}`, distanceToStart / pixelsPerSecond)

		times[i] = distanceToStart / pixelsPerSecond
	})

	// Helper function to move to a specific index
	const toIndex = (index: number, vars: gsap.TweenVars = {}) => {
		const newIndex = gsap.utils.wrap(0, length, index)
		let time = times[newIndex]

		if (Math.abs(index - curIndex) > length / 2) {
			index += index > curIndex ? -length : length
		}

		if (time > tl.time() !== index > curIndex) {
			vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
			time += tl.duration() * (index > curIndex ? 1 : -1)
		}

		curIndex = newIndex
		vars.overwrite = true
		return tl.tweenTo(time, vars)
	}

	// Add helper methods to the timeline
	tl.next = (vars) => toIndex(curIndex + 1, vars)
	tl.previous = (vars) => toIndex(curIndex - 1, vars)
	tl.current = () => curIndex
	tl.toIndex = (index, vars) => toIndex(index, vars)
	tl.times = times

	tl.progress(1, true).progress(0, true) // Pre-render for performance

	if (reversed) {
		tl.vars.onReverseComplete?.()
		tl.reverse()
	}

	return tl
}
