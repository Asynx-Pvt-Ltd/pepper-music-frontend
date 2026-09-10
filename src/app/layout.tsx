import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import RouteProgress from '@/components/layout/routeProgress';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Pepper | Stream Music Effortlessly on Discord',
	description:
		'Discover Pepper, your ultimate music companion on Discord. Play, manage, and enjoy music seamlessly with our powerful music bot. Add Pepper to your server today!',
	openGraph: {
		images: 'https://pepper.mrbotz.com/images/pepperLogo.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<GoogleAnalytics gaId="G-NCWY5GH7E9" />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<RouteProgress />
				<Navbar />
				{children}
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
