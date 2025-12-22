import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

// app/layout.tsx
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // This is important!

// ... rest of your layout code

import './_styles/style.css';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';
import Sidebar from './_components/Sidebar';

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
				<div className="fullPage">
					<Navbar />
					<div className="contentSection">
						<Sidebar />
						<main>{children}</main>
					</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
