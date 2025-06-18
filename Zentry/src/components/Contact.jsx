import React from 'react'
import Button from './Button'
import AnimatedTitle from './AnimatedTitle'

const ImageClipBox  = ({src, alt, clipClass}) => (
	<div className={`hidden lg:block size-50 ${clipClass}`}>
		<img 
			src={src}
			alt= {alt}
			className='object-center object-cover size-full'
		/>
	</div>
)

const Contact = () => {
  return (
	<div id='contact' className='my-20  min-h-96 w-screen px-10'>
		<div className='relative rounded-lg bg-black py-24 text-blue-50'>

			<div className='flex flex-col items-center'>
				<AnimatedTitle 
					title="Let's B<b>u</b>ild The <b>N</b>ew Era<br />of G<b>a</b>ming Toget<b>h</b>er"
					containerClass='!text-blue-50 !text-6xl !md:text-6xl !lg:text-9xl mix-blend-difference z-10'
				/>

				<Button 
					title='Contact Us'
					containerClass='mt-10'
				/>
			</div>

			<div className='absolute top-[-10rem] left-1/2 -translate-x-1/2 w-50 h-auto opacity-100 lg:top-1/2 lg:-translate-y-1/2 lg:left-1/1 lg:-translate-x-[110%]'>
				<img 
					src="/img/swordman.webp" 
					alt="Swordman"
					className='size-full object-center object-cover' 
				/>
			</div>


			<ImageClipBox 
				src="/img/contact-1.webp" 
				alt='Contact Img'
				clipClass='contact-clip-path-1 absolute top-0 left-0'
			/>

			<ImageClipBox 
				src="/img/contact-2.webp" 
				alt='Contact Img'
				clipClass='contact-clip-path-2 absolute bottom-0 left-0'
			/>
		</div>
	</div>
  )
}

export default Contact