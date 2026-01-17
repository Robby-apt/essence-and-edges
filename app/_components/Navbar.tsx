// app/_components/Navbar.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { useSidebar } from '../_providers/SidebarProvider';
import Link from 'next/link';

export default function Navbar() {
	// const { isSidebarOpen, toggleSidebar } = useSidebar();

	return (
		<nav>
			<div className="quoteDisplay">
				<p>These pages hold the thoughts I sit with - You're welcome</p>
			</div>
			{/* Hamburger menu - hidden on desktop via CSS */}
			{/* <div className="responsiveMenu navIcon">
				<FontAwesomeIcon
					icon={isSidebarOpen ? faXmark : faBars}
					onClick={toggleSidebar}
					className="sidebar-toggle-icon"
					aria-label={
						isSidebarOpen ? 'Close sidebar' : 'Open sidebar'
					}
					aria-expanded={isSidebarOpen}
				/>
			</div> */}

			<div className="titleAndNav">
				<Link href="/">
					<h1 className="title">ESSENCE & EDGES</h1>
				</Link>
                
				<div className="navLinks">
					<Link href="/about-me">About me</Link>
					<Link href="/all-blogs">Blogs</Link>
					<Link href="/#contact">Contact</Link>
				</div>
			</div>

			{/* <div className="fillerDiv navIcon" /> */}
		</nav>
	);
}
