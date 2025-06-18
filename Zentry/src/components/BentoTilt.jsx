import React, { useRef, useState } from 'react'

const BentoTilt = ({children, className = ''}) => {
	const [transformStyle, settransformStyle] = useState('');
	const itemRef = useRef();

	const handleMouseMove = (e) => {
		if (!itemRef.current) {
			return;
		}

		const {left, top, width, height} = itemRef.current.getBoundingClientRect();

		const relativeX = (e.clientX - left) / width;
		const relativeY = (e.clientY - top) / height;

		const tiltX = (relativeY - 0.5) * -8;
		const tiltY = (relativeX - 0.5) * 8;

		const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

		settransformStyle(newTransform);
	}

	const handleMouseLeave = (e) => {
		settransformStyle('');
	}

	return (
		<div className={className}
			ref={itemRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ transform: transformStyle, transition: 'transform 0.3s ease-out' }}>

			{children}
		</div>
	)
}

export default BentoTilt