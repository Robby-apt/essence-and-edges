// app/_components/SidebarResponsive.tsx
'use client';

import Link from 'next/link';
import { useSidebar } from '../_providers/SidebarProvider';

export default function SidebarResponsive() {
	const { isSidebarOpen, closeSidebar } = useSidebar();

	if (!isSidebarOpen) return null;

	return (
		<>
			{/* Overlay that closes sidebar when clicked */}
			<div
				className="sidebar-overlay"
				onClick={closeSidebar}
				aria-hidden="true"
			/>

			<div className="sideBarResponsive responsive-sidebar">
				<ul>
					<li>
						<Link href="/about-me" onClick={closeSidebar}>
							About me
						</Link>
					</li>
					<li>
						<Link href="/the-office-edit" onClick={closeSidebar}>
							The Office Edit
						</Link>
					</li>
					<li>
						<Link href="/under-open-skies" onClick={closeSidebar}>
							Under Open Skies
						</Link>
					</li>
					<li>
						<Link
							href="/papers-from-my-mind"
							onClick={closeSidebar}
						>
							Papers From My Mind
						</Link>
					</li>
					<li>
						<Link href="/the-heart-archive" onClick={closeSidebar}>
							The Heart Archive
						</Link>
					</li>
					<li>
						<Link href="/the-living-room" onClick={closeSidebar}>
							The Living Room
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
