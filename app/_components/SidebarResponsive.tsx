// app/_components/SidebarResponsive.tsx
'use client';

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
						<a href="/about-me" onClick={closeSidebar}>
							About me
						</a>
					</li>
					<li>
						<a href="/the-office-edit" onClick={closeSidebar}>
							The Office Edit
						</a>
					</li>
					<li>
						<a href="/under-open-skies" onClick={closeSidebar}>
							Under Open Skies
						</a>
					</li>
					<li>
						<a href="/papers-from-my-mind" onClick={closeSidebar}>
							Papers From My Mind
						</a>
					</li>
					<li>
						<a href="/the-heart-archive" onClick={closeSidebar}>
							The Heart Archive
						</a>
					</li>
					<li>
						<a href="/the-living-room" onClick={closeSidebar}>
							The Living Room
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}
