import React, { useRef, useState } from 'react'
import BentoCard from './BentoCard'
import { TiLocationArrow } from 'react-icons/ti'
import BentoTilt from './BentoTilt'


const Features = () => {
  return (
	<section id='features' className='bg-black pb-52'>
		<div className='container mx-auto px-3 md:px-10'>
			<div className='px-5 py-32'>
				<p className='uppercase text-2xl text-blue-50'>
					Into the Metagame Layer
				</p>

				<p className='max-w-md font-circular text-lg text-blue-50 opacity-50 mt-3'>
					Immerse yourself in a rich and ever-expanding universe where a vibrant array of products 
					converge into an interconnected overlay experience on your world.
				</p>
			</div>

			<BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] mx-auto'>
				<BentoCard 
					src='videos/feature-1.mp4'
					title={
						<>R<b>a</b>dia<b>n</b>t</>
					}
					description='A cross-platform metagame app, turning your activities across web2 and web3 games into a rewarding adventure.'
					isComingSoon
				/>
			</BentoTilt>

			<div className='grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-7 h-[135vh] md:h-[90vh] pb-20'>
				<BentoTilt className='bento-tilt_1 border-hsla row-span-1 col-span-2 md:row-span-2 md:col-span-1'>
					<BentoCard 
						src='/videos/feature-2.mp4'
						title={<>Zigm<b>a</b></>}
						description='An anime and gaming inspired NFT collection - the IP primed for expansion.'
					/>
				</BentoTilt>

				<BentoTilt className='bento-tilt_1 border-hsla row-span-1 col-span-2 md:col-span-1 ms-32 md:ms-0'>
					<BentoCard 
						src='/videos/feature-3.mp4'
						title={<>nex<b>u</b>s</>}
						description='A gamified social hub, adding a new dimension of play to social interaction for web3 communities'
					/>
				</BentoTilt>

				<BentoTilt className='bento-tilt_1 border-hsla me-14 md:me-0 col-span-2 row-span-1 md:col-span-1'>
					<BentoCard 
						src='/videos/feature-4.mp4'
						title={<>Az<b>u</b>l</>}
						description='A cross-world AI agent - elevating your gameplay to be more fun and productive'
					/>
				</BentoTilt>
			</div>

			<div className='grid grid-cols-2 grid-rows-1 gap-2 md:gap-7'>
				<BentoTilt className='bento-tilt_2 flex size-full flex-col justify-between bg-violet-300 p-5'>
					<h1 className='bento-title special-font uppercase max-w-64'>
						More coming soon!
					</h1>

					{<TiLocationArrow
						className='self-end m-5 md:m-10 scale-[5] md:scale-[9]'
					/>}
				</BentoTilt>

				<BentoTilt className='bento-tilt_2'>
					<video 
						src='/videos/feature-5.mp4'
						autoPlay
						loop
						muted
						className='size-full object-cover object-center'
					/>
				</BentoTilt>
			</div>
		</div>

	</section>
  )
}

export default Features