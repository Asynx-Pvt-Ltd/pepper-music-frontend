import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, MessageSquare } from 'lucide-react';

import {
	discordServerLink,
	featursLink,
	githubLink,
	inviteLink,
	legalNavItems,
	musicSources,
	pepperLogoLink,
} from '@/constants';

interface Props {}

const columns = [
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: featursLink, external: false },
			{ label: 'Live stats', href: '/stats', external: false },
			{ label: 'Add to Discord', href: inviteLink, external: true },
		],
	},
	{
		title: 'Community',
		links: [
			{ label: 'Support server', href: discordServerLink, external: true },
			{ label: 'GitHub', href: githubLink, external: true },
			{ label: 'About us', href: '/about-us', external: false },
		],
	},
	{
		title: 'Legal',
		links: legalNavItems.map((item) => ({
			label: item.name,
			href: item.value,
			external: false,
		})),
	},
];

const Footer: NextPage<Props> = ({}) => {
	return (
		<footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 -bottom-32 mx-auto h-64 w-[min(46rem,90%)] rounded-full bg-white/[0.05] blur-3xl"
			/>

			<div className="container relative mx-auto px-4 pt-14">
				<div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
					{/* Brand */}
					<div className="max-w-sm">
						<Link
							href="/"
							className="inline-flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
						>
							<span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/15">
								<Image
									src={pepperLogoLink}
									width={32}
									height={32}
									className="h-full w-full object-cover"
									alt=""
								/>
							</span>
							<span className="text-[17px] font-bold tracking-tight">
								Pepper
							</span>
						</Link>

						<p className="mt-4 text-[14px] leading-relaxed text-gray-400">
							A free Discord music bot with high-quality playback, smart
							autoplay and controls your moderators can trust.
						</p>

						<div className="mt-6">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
								Plays from
							</p>
							<div className="mt-3 flex flex-wrap gap-1.5">
								{musicSources.map((source) => (
									<span
										key={source}
										className="rounded-full border border-white/10 px-2.5 py-1 text-[12px] text-gray-400"
									>
										{source}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Link columns */}
					{columns.map((column) => (
						<div key={column.title}>
							<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
								{column.title}
							</h2>
							<ul className="mt-4 space-y-3">
								{column.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											{...(link.external
												? { target: '_blank', rel: 'noreferrer' }
												: {})}
											className="group inline-flex items-center gap-1 text-[14px] text-gray-400 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
										>
											{link.label}
											{link.external && (
												<ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
											)}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Wordmark */}
				<div
					aria-hidden
					className="pointer-events-none mt-12 select-none overflow-hidden"
				>
					<p className="translate-y-[0.18em] text-center text-[18vw] font-bold leading-[0.8] tracking-tighter text-white/[0.045] lg:text-[13rem]">
						Pepper
					</p>
				</div>
			</div>

			<div className="relative border-t border-white/10">
				<div className="container mx-auto flex flex-col-reverse items-center justify-between gap-4 px-4 py-6 md:flex-row">
					<p className="text-center text-[13px] text-gray-500 md:text-left">
						© {new Date().getFullYear()} Pepper · Open source under Apache 2.0 ·
						Not affiliated with Discord, Spotify or any other platform.
					</p>

					<div className="flex items-center gap-2">
						<Link
							href={githubLink}
							target="_blank"
							rel="noreferrer"
							aria-label="Pepper on GitHub"
							className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors outline-none hover:border-white/30 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
						>
							<Github className="h-4 w-4" />
						</Link>
						<Link
							href={discordServerLink}
							target="_blank"
							rel="noreferrer"
							aria-label="Pepper support server on Discord"
							className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors outline-none hover:border-white/30 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
						>
							<MessageSquare className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
