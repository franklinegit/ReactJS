import React, { useRef, useState, useEffect } from 'react'
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {

	const [currentIndex, setcurrentIndex] = useState(1);
	const [hasClicked, sethasClicked] = useState(false);
	const [isLoading, setisLoading] = useState(true);
	const [loadedVideos, setloadedVideos] = useState(0);

	const totalVideos = 4;
	const nextVideoRef = useRef(null);  // For referencing a DOM element

	const nextVideoIndex = (currentIndex % totalVideos) + 1;

	const handleMiniVideoClick = () => {
		sethasClicked(true);

		setcurrentIndex(nextVideoIndex);
	}

	const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;


	const handleVideoLoad = () => {
		setloadedVideos((prev) => prev + 1);
	}

	// Check loaded videos
	useEffect(() => {
		if (loadedVideos === totalVideos -1) {
			setisLoading(false);
		}
	}, [loadedVideos]);

	console.log(loadedVideos);
	

	// Animate Hero mini-vid on click
	useGSAP(() => {
		if (hasClicked) {
			gsap.set('#next-video', {
				visibility: 'visible'
			});

			gsap.to('#next-video', {
				transformOrigin: 'center center',
				scale: 1,
				width: '100%',
				height: '100%',
				duration: 1,
				delay: .2,
				ease: 'power1.inOut',
				onStart: () => nextVideoRef.current.play()
			});

			gsap.from('#current-video', {
				transformOrigin: 'center center',
				scale: 0,
				duration: 1.5,
				delay: .2,
				ease: 'power1.inOut'
			});
		}
	}, {dependencies:[currentIndex], revertOnUpdate: true});

	// Animate video frame on scroll
	useGSAP(() => {
		gsap.fromTo('#video-frame', {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			borderRadius: '0 0 0% 0%',
			ease: 'power1.inOut',
			// rotateX: '0',
			// transformOrigin: 'center bottom',
		}, {
			clipPath: 'polygon(25% 0%, 75% 0%, 95% 80%, 5% 90%)',
			borderRadius: '0 0 10% 10%',
			// rotateX: '45',
			// transformOrigin: 'center bottom',
				scrollTrigger: {
				trigger: '#video-frame',
				start: 'bottom 90%',
				end: 'bottom top',
				scrub: true
			}
		});
	});

  return (
	<div className='relative size-screen overflow-x-hidden'>

		{isLoading && (
			<div className='flex-center size-screen absolute z-[100] overflow-hidden bg-violet-50'>
				<div className="loading">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		)}

		<div id="video-frame" className='relative size-screen z-10 overflow-hidden bg-blue-75'>
			<div>
				<div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
					<div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
						<video 
							ref={nextVideoRef}
							src={getVideoSrc(nextVideoIndex)}
							loop
							muted
							id='current-video'
							className='size-64 origin-center scale-150 object-cover object-center'
							onLoadedData={handleVideoLoad}
						/>
					</div>
				</div>

				<video 
					ref={nextVideoRef}
					src={getVideoSrc(currentIndex)}
					loop
					muted
					id='next-video'
					className='absolute-center invisible z-20 size-64 object-cover object-center'
					onLoadedData={handleVideoLoad}
				/>

				<video 
					src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
					autoPlay
					loop
					muted
					className='absolute top-0 left-0 size-full object-cover object-center'
					onLoadedData={handleVideoLoad}
				/>

			</div>

			<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
				G<b>a</b>mi<b>n</b>g
			</h1>

			<div className='absolute top-0 left-0 size-full z-40'>
				<div className='mt-24 px-5 sm:px-10'>
					<h1 className='special-font hero-heading text-blue-100'>
						Redefi<b>n</b>e
					</h1>

					<p className='text-blue-100 font-robert-regular mb-5 max-w-64'>
						Enter the Metagame Layer <br />
						Unleash the Play Economy
					</p>

					<Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />
				</div>
			</div>
		</div>

		<h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
			G<b>a</b>mi<b>n</b>g
		</h1>

		<div className='absolute top-0 left-0 size-full'>
			<div className='mt-24 px-5 sm:px-10'>
				<h1 className='special-font hero-heading text-black0'>
					Redefi<b>n</b>e
				</h1>

				<p className='text-black font-robert-regular mb-5 max-w-64'>
					Enter the Metagame Layer <br />
					Unleash the Play Economy
				</p>

				<Button title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />
			</div>
		</div>

	</div>
  )
}

export default Hero