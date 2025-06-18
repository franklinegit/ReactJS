import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap';
import BorderCorners from './BorderCorners';
import Button from './Button';

const Story = () => {
	const frameRef = useRef('null');

	const handleMouseMove = (e) => {
		const {clientX, clientY} = e;
		const element =frameRef.current;

		if (!element) return;

		const rect = element.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -10;
		const rotateY = ((x - centerX) / centerX) * 10;

		gsap.to(element, {
			rotateX,
			rotateY,
			transformPerspective: 500,
			duration: .3,
			ease: 'power1.inOut'
		});
	}

	const handleMouseLeave = (e) => {
		const element =frameRef.current;

		if (!element) return;

		gsap.to(element, {
			rotateX: 0,
			rotateY: 0,
			duration: .3,
			ease: 'power1.inOut'
		});
	}


	return (
		<section id='prologue' className='min-h-dvh w-screen bg-black text-blue-50'>
			<div className='flex flex-col items-center py-10 pb-24'>
				<p className='font-general text-sm md:text-lg'>
					The Multiversal IP world
				</p>

				<div>
					<AnimatedTitle 
						title='T<b>h</b>e St<b>o</b>ry of <br /> <b>a</b> Hi<b>d</b>den Re<b>a</b>lm'
						sectionId='#story'
						containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10 !text-white'
					/>

					<div className='story-img-container'>
						<div className='story-img-mask'>
							<div className='story-img-content'>
								<img 
									ref={frameRef}
									src="/img/entrance.webp" 
									alt="Hidden Realm" 
									onMouseLeave={handleMouseLeave}
									onMouseDown={handleMouseLeave}
									onMouseUp={handleMouseLeave}
									onMouseMove={handleMouseMove}
									className='object-contain'
								/>
							</div>
						</div>
						<BorderCorners />
					</div>

				</div>

				<div className=" flex w-full justify-center md:me-44 md:justify-end p-4">
					<div className="flex h-full w-fit flex-col items-center md:items-start">
						<p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
							Where realms converge, lies Zentry and the boundless pillar.
							Discover its secrets and shape your fate amidst infinite
							opportunities.
						</p>

						<Button
							id="realm-btn"
							title="discover prologue"
							containerClass="mt-5"
						/>
					</div>
        		</div>

			</div>
		</section>
	)
}

export default Story