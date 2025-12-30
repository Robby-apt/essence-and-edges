// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import './_styles/style.css';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';
import Sidebar from './_components/Sidebar'; // Desktop
import SidebarResponsive from './_components/SidebarResponsive'; // Mobile
import { SidebarProvider } from './_providers/SidebarProvider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Essence and Edges',
	description: 'Essence and Edges - a blog about the things I enjoy.',
	icons: {
		icon: [
			{
				url: '/logo.png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/logo.png',
				media: '(prefers-color-scheme: dark)',
			},
			{
				url: '/logo.png',
				type: 'image/svg+xml',
			},
		],
		apple: '/apple-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SidebarProvider>
					<div className="fullPage">
						<Navbar />
						<div className="contentSection">
							{/* Both sidebars rendered, CSS controls visibility */}
							<Sidebar /> {/* Desktop - always in DOM */}
							<SidebarResponsive />{' '}
							{/* Mobile - conditionally rendered */}
							<main>{children}</main>
						</div>
						<Footer />
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
