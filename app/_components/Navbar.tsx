'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav>
			<div className="responsiveMenu navIcon">
				{isMenuOpen ? (
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => setIsMenuOpen(false)}
					/>
				) : (
					<FontAwesomeIcon
						icon={faBars}
						onClick={() => setIsMenuOpen(true)}
					/>
				)}
			</div>
			<a href="/">
				<h1 className="title">ESSENCE & EDGES</h1>
			</a>
			<div className="fillerDiv navIcon" />
		</nav>
	);
}
