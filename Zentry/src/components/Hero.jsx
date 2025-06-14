import React, { useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";

const Hero = () => {

	const [currentIndex, setcurrentIndex] = useState(1);
	const [hasClicked, sethasClicked] = useState(false);
	const [isLoading, setisLoading] = useState(true);
	const [loadedVideos, setloadedVideos] = useState(0);

	const totalVideos = 3;
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

  return (
	<div className='relative size-screen overflow-x-hidden'>
		<div id="video-frame" className='relative size-screen z-10 overflow-hidden rounded-lg bg-blue-75'>
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
					// autoPlay
					loop
					muted
					className='absolute top-0 left-0 size-full object-cover object-center'
					onLoadedData={handleVideoLoad}
				/>

			</div>

			<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
				G<b>a</b>ming
			</h1>

			<div className='absolute top-0 left-0 size-full'>
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
			G<b>a</b>ming
		</h1>

	</div>
  )
}

export default Hero