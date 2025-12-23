// app/_components/Navbar.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '../_providers/SidebarProvider';

export default function Navbar() {
	const { isSidebarOpen, toggleSidebar } = useSidebar();

	return (
		<nav>
			{/* Hamburger menu - hidden on desktop via CSS */}
			<div className="responsiveMenu navIcon">
				<FontAwesomeIcon
					icon={isSidebarOpen ? faXmark : faBars}
					onClick={toggleSidebar}
					className="sidebar-toggle-icon"
					aria-label={
						isSidebarOpen ? 'Close sidebar' : 'Open sidebar'
					}
					aria-expanded={isSidebarOpen}
				/>
			</div>

			<a href="/">
				<h1 className="title">ESSENCE & EDGES</h1>
			</a>

			<div className="fillerDiv navIcon" />
		</nav>
	);
}
