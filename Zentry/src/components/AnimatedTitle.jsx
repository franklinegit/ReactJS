import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedTitle = ({title, containerClass}) => {

	const containerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const titleAnimation = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: '100 bottom',
					end: 'center bottom',
					toggleActions: 'play none none reverse'
				}
			});

			titleAnimation.to('.animated-word', {
				opacity: 1,
				transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
				ease: 'power2.inOut',
				stagger: {
					amount: .3
				}
			})
		}, containerRef);

		return () => ctx.revert();
	}, []);
	

	return (
		<div 
			ref = {containerRef}
			className={`animated-title ${containerClass}`}>
			{title.split('<br />').map((line, index) => (
				<div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
					{line.split(' ').map((word, i) => (
						<span 
							key={i}
							dangerouslySetInnerHTML={{ __html:word }}
							className='animated-word special-font'
						/> 
					))}
				</div>
			))}
		</div>
	)
}

export default AnimatedTitle