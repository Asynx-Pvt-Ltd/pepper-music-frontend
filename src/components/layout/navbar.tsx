'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import {
	discordServerLink,
	inviteLink,
	legalNavItems,
	pepperLogoLink,
	primaryNavItems,
} from '@/constants';
import { MenuItemType } from '@/types';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/layout/themeToggle';

const Navbar = () => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	// Close the panel whenever navigation lands on a new route.
	useEffect(() => setIsMenuOpen(false), [pathname]);

	// The bar is flush with the page until it has something to sit above.
	useEffect(() => {
		// Cheap enough to run per event; React bails out when the value is unchanged.
		const onScroll = () => setIsScrolled(window.scrollY > 8);

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// While the panel is open, hold the page still and let Escape dismiss it.
	useEffect(() => {
		if (!isMenuOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsMenuOpen(false);
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isMenuOpen]);

	const isActive = (value: string) => pathname === value;

	return (
		<header
			className={cn(
				'sticky top-0 z-50 border-b transition-colors duration-300',
				isScrolled || isMenuOpen
					? 'border-border bg-background/70 backdrop-blur-xl'
					: 'border-transparent bg-background'
			)}
		>
			<div className="container mx-auto flex h-16 items-center gap-4 px-4">
				<Link
					href="/"
					className="group flex shrink-0 items-center gap-2.5 rounded-lg text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
					aria-label="Pepper home"
				>
					<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-foreground/15 transition-all group-hover:ring-foreground/40">
						<Image
							src={pepperLogoLink}
							width={32}
							height={32}
							className="h-full w-full object-cover"
							alt=""
							priority
						/>
					</span>
					<span className="text-[17px] font-bold tracking-tight">Pepper</span>
				</Link>

				{/* Primary navigation */}
				<nav className="ml-4 hidden md:block">
					<ul className="flex items-center gap-1">
						{primaryNavItems.map((item: MenuItemType) => (
							<li key={item.value}>
								<Link
									href={item.value}
									aria-current={isActive(item.value) ? 'page' : undefined}
									className={cn(
										'relative flex items-center rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
										isActive(item.value)
											? 'text-foreground'
											: 'text-muted-foreground hover:text-foreground'
									)}
								>
									{isActive(item.value) && (
										<motion.span
											layoutId="nav-active"
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 32,
											}}
											className="absolute inset-0 -z-10 rounded-lg bg-surface-strong"
										/>
									)}
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="ml-auto flex items-center gap-1.5">
					<ThemeToggle />

					<a
						href={inviteLink}
						target="_blank"
						rel="noreferrer"
						className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
					>
						Add to Discord
						<ArrowUpRight className="h-4 w-4" />
					</a>

					<button
						type="button"
						onClick={() => setIsMenuOpen((open) => !open)}
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isMenuOpen}
						className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors outline-none hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring md:hidden"
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile panel */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						key="mobile-menu"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.22, ease: 'easeOut' }}
						className="overflow-hidden border-t border-border bg-background md:hidden"
					>
						<div className="container mx-auto px-4 py-5">
							<nav>
								<ul className="flex flex-col gap-1">
									{primaryNavItems.map((item: MenuItemType) => (
										<li key={item.value}>
											<Link
												href={item.value}
												aria-current={
													isActive(item.value) ? 'page' : undefined
												}
												className={cn(
													'flex items-center justify-between rounded-lg px-4 py-3 text-[15px] transition-colors',
													isActive(item.value)
														? 'bg-surface-strong font-medium text-foreground'
														: 'text-muted-foreground hover:bg-surface-hover hover:text-foreground'
												)}
											>
												{item.name}
												{isActive(item.value) && (
													<span className="h-1.5 w-1.5 rounded-full bg-primary" />
												)}
											</Link>
										</li>
									))}
								</ul>
							</nav>

							<a
								href={inviteLink}
								target="_blank"
								rel="noreferrer"
								className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
							>
								Add to Discord
								<ArrowUpRight className="h-4 w-4" />
							</a>

							<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
								{legalNavItems.map((item: MenuItemType) => (
									<Link
										key={item.value}
										href={item.value}
										className="text-[13px] text-muted-foreground/85 transition-colors hover:text-foreground/80"
									>
										{item.name}
									</Link>
								))}
								<Link
									href={discordServerLink}
									target="_blank"
									rel="noreferrer"
									className="text-[13px] text-muted-foreground/85 transition-colors hover:text-foreground/80"
								>
									Support server
								</Link>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Navbar;
