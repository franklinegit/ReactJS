import React from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {

	useGSAP(() => {
		const clipAmimation = gsap.timeline({
			scrollTrigger: {
				trigger: "#clip",
				start: 'center center',
				end: '+=800 center',
				scrub: 0.5,
				pin: true,
				pinSpacing: true
			}
		});

		clipAmimation.to('.about-image', {
			width: '100vw',
			height: '100vh',
			borderRadius: 0
		});
	});


  return (
	<div id='about' className='min-h-screen w-screen'>
		<div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
			<h2 className='font-general text-sm uppercase md:text-lg'>
				Welcome to Zentry
			</h2>
			{/* <b></b> */}
			<AnimatedTitle 
				title= "<b>D</b>isco<b>v</b>er t<b>h</b>e W<b>o</b>rl<b>d</b>'s<br />l<b>a</b>r<b>g</b>e<b>s</b>t sh<b>a</b>red <b>a</b>dve<b>n</b>t<b>u</b>re"
				containerClass={'mt-5 !text-black text-center'}
			/>

			<div className='about-subtext'>
				<p>The Game of Games Begins-your life now an epic MMORPG</p>
				<p>Zentry unites every player from countless games and platforms</p>
			</div>
		</div>

		<div id='clip' className='size-screen'>
			<div className='mask-clip-path about-image'>
				<img 
					src="img/about.webp" 
					alt="Background" 
					className='absolute left-0 top-0 size-full object-cover'
				/>
			</div>
		</div>
	</div>
  )
}

export default About