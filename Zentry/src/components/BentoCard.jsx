import React from 'react'

const BentoCard = ({src, title, description, isComingSoon}) => {
  return (
	<div className='relative size-full'>
		<video 
			src={src}
			autoPlay
			loop
			muted
			className='absolute left-0 top-0 size-full object-cover object-center'
		/>

		<div className='relative z-10 flex flex-col justify-between size-full p-5 text-blue-50'>
			<div>
				<h2 className='bento-title special-font'>
					{title}
				</h2>

				{description && (
					<p className='mt-3 max-w-64 text-xs md:text-base backdrop-blur-[2px] bg-black/30 rounded-lg p-2 pl-0'>
						{description}
					</p>
				)}
			</div>
		</div>
	</div>
  )
}

export default BentoCard