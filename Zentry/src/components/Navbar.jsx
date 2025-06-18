import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import Button from './Button'
import { TiArrowDown, TiArrowDownOutline, TiArrowSortedDown, TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import { FaCaretDown } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGSAP } from '@gsap/react';
// import { useWindowScroll } from "@uidotdev/usehooks";


// const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];
const navItems = ['Home', 'About', 'Features', 'Prologue', 'Contact'];

const Navbar = () => {
	const [isAudioPlaying, setisAudioPlaying] = useState(false);
	const [isIndicatorActive, setisIndicatorActive] = useState(false)
	const [lastScrollY, setlastScrollY] = useState(0);
	const [isNavVisible, setisNavVisible] = useState(true);

	const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);

	const navContainerRef = useRef(null);
	const audioElementRef = useRef(null);

	const mobileMenuRef = useRef(null);


	const {y: currentScrollY} = useWindowScroll();
	// const [{x, currentScrollY}, scrollTo] = useWindowScroll();

	const toggleAudioIndicator = () => {
		setisAudioPlaying((prev) => !prev);
		setisIndicatorActive((prev) => !prev);
	}

	useEffect(() => {
		if (isAudioPlaying) {
			audioElementRef.current.play();
		}

		else {
			audioElementRef.current.pause();
		}
	}, [isAudioPlaying]);
	
	// Track scrollY and display navbar on scrollind down
	useEffect(() => {
		if (currentScrollY === 0) {
			setisNavVisible(true);
			navContainerRef.current.classList.remove('floating-nav');
		}

		else if (currentScrollY > lastScrollY ) {
			setisNavVisible(false);
			navContainerRef.current.classList.add('floating-nav');
		}

		else if (currentScrollY < lastScrollY ) {
			setisNavVisible(true);
			navContainerRef.current.classList.add('floating-nav');
		}

		setlastScrollY(currentScrollY);

	}, [currentScrollY]);

	useEffect(() => {
		gsap.to(navContainerRef.current, {
			y: isNavVisible ? 0 : -100,
			opacity: isNavVisible ? 1 : 0,
			duration: .2
		});
	}, [isNavVisible]);
	
	
	console.log(isNavVisible);


	// Toggle Mobile Menu
	const toggleMobileMenu = () => {
		setisMobileMenuOpen((prev) => !prev);
	}

	const closeMobileMenu = () => {
		gsap.fromTo(mobileMenuRef.current, {
			transformOrigin: 'center top',
			scaleY: 1
		},
		{
			transformOrigin: 'center top',
			scaleY: 0,
			duration: .5,
			ease: 'power4.inOut',
			onComplete: () => {
				if (!isMobileMenuOpen) {
					gsap.set(mobileMenuRef.current, {
						display: 'none',
						scaleY: 1
					});
				}
			}
		});
	}

	useGSAP(() => {
		if (isMobileMenuOpen) {
			if (!mobileMenuRef.current) return;

			gsap.set(mobileMenuRef.current, {
				display: 'flex',
				scaleY: 0
			});

			gsap.fromTo(mobileMenuRef.current, {
				scaleY: 0
			}, {
				transformOrigin: 'center top',
				scaleY: 1,
				duration: .5,
				ease: 'power4.inOut'
			});
		}

		else {
			if (!mobileMenuRef.current) return;
			
			closeMobileMenu();
		}
	}, {dependencies:[isMobileMenuOpen], revertOnUpdate: true});


	// Handle Nav Click
	const handleNavClick = () => {
		if(isMobileMenuOpen) {
			setisMobileMenuOpen(false);
		}
	}

	// Handle resizing for desktop view
	useEffect(() => {

		const handleResize = () => {
			if (!mobileMenuRef.current) return;

			setisMobileMenuOpen(false);

			if (window.innerWidth >= 768) {
				gsap.set(mobileMenuRef.current, {
					scaleY: 1,
					display: 'flex'
				});

			}

			else {
				gsap.set(mobileMenuRef.current, {
					scaleY: 0,
					display: 'none'
				});
			}
		}

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}

	}, []);	
	
	

	return (
		<div 
			ref={navContainerRef}
			className='fixed inset-x-0 top-4 z-50 h-16 bx-border-none transition-all duration-700 sm:inset-x-6 rounded-lg'>
			
			<header className='absolute top-1/2 -translate-y-1/2 w-full'>
				<nav className='flex size-full items-center justify-between p-4'>
					<div className='flex items-center gap-7'>
						<img 
							src="/img/logo.png" 
							alt="logo" 
							className='w-10 object-center object-cover'
						/>

						<Button 
							id='product-button'
							title='Products'
							rightIcon={<TiLocationArrow />}
							containerClass='bg-blue-50 flex md:flex items-center justify-center gap-1 hidden'
						/>
					</div>

					<button 
						onClick={toggleMobileMenu}
						className='text-blue-50 p-2 cursor-pointer md:hidden md:cursor-none'>

						<IoIosArrowDown className={`transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-x-180' : ''}`}/>
					</button>

					<div className='flex h-full items-center'>
						<div 
							ref={mobileMenuRef}
							className='absolute top-[110%] left-1/2 -translate-x-1/2 flex-col items-center gap-8 p-8 bg-black/80 backdrop-blur-[10px] rounded-lg w-full h-[100vh] hidden
							md:relative md:flex-row md:block md:h-auto md:bg-transparent md:backdrop-blur-[0px] md:p-0 md:gap-0 !md:scale-y-1'>

							{
								navItems.map((item) => (
									<a 
										key={item} 
										href={`#${item.toLocaleLowerCase()}`} 
										onClick={handleNavClick}
										className='nav-hover-btn'>

										{item}
									</a>
								))
							}

							<Button 
								id='product-button'
								title='Products'
								rightIcon={<TiLocationArrow />}
								containerClass='bg-blue-50 flex items-center justify-center gap-1 md:hidden'
							/>
						</div>


						<button onClick={toggleAudioIndicator} className='md:ml-10 flex items-center space-x-0.5 cursor-pointer p-2'>
							<audio 
								src="/audio/heat-waves.mp3"
								ref={audioElementRef} className='hidden'
								loop
							/>

							{[1, 2, 3, 4].map((bar) => (
								<div 
									key={bar}
									className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
									style={{animationDelay: `${bar * 0.1}s`}}
								/>
							))}
			
						</button>
					</div>
				</nav>
			</header>
		</div>
	)
}

export default Navbar