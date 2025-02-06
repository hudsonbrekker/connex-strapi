import Image from "next/image"
import React from "react"

import fb_logo from "@/assets/images/fb-logo.png"
import linkedin_logo from "@/assets/images/linkedin-logo.png"
import footer_bg from "@/assets/images/footer-bg.png"

const Footer = () => {
	return (
		<footer className='footer relative min-h-28 grid-flow-row place-items-center items-start gap-y-4 overflow-hidden bg-[#050505] bg-gradient-to-b from-black via-black/60 to-black/0 p-10 text-neutral-content md:min-h-64'>
			{/* <div className='z-10 flex justify-center gap-2'>
				<Image
					src={fb_logo}
					alt='facebook-logo'
					width={56}
					height={56}
					style={{ objectFit: "contain" }}
				/>
				<Image
					src={linkedin_logo}
					alt='linkedin-logo'
					width={56}
					height={56}
					style={{ objectFit: "contain" }}
				/>
			</div> */}
			<p className='z-10 font-ibm text-base leading-6 text-[#FCFCFC] text-shadow md:text-xl'>
				© Glohow Holdings Pte. Ltd. All rights reserved
			</p>
			<div className='absolute top-[25%] z-0 h-full w-full max-w-[1440px]'>
				<Image
					src={footer_bg.src}
					alt='footer-background'
					fill
					style={{ objectFit: "contain" }}
				/>
			</div>
		</footer>
	)
}

export default Footer
