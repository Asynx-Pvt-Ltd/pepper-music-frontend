import { Suspense } from 'react';
import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
	ArrowRight,
	AudioLines,
	Ban,
	Gauge,
	Globe2,
	Headphones,
	ListMusic,
	Radio,
	Shield,
	Sparkles,
	Wand2,
} from 'lucide-react';

import {
	ActionLink,
	CtaBand,
	Eyebrow,
	FeatureTile,
	IconChip,
	SectionHeading,
	Surface,
} from '@/components/shared/page/parts';
import Features from '@/components/shared/features';
import CommandGrid from '@/components/shared/home/commandGrid';
import HeroMetrics from '@/components/shared/home/heroMetrics';
import LanguagesCard from '@/components/shared/home/languagesCard';
import CommandGridSkeleton from '@/components/skeletons/commandGridSkeleton';
import LanguagesCardSkeleton from '@/components/skeletons/languagesCardSkeleton';
import MetricStripSkeleton from '@/components/skeletons/metricStripSkeleton';
import {
	discordServerLink,
	features,
	inviteLink,
	musicSources,
	unsupportedSource,
} from '@/constants';

export const metadata: Metadata = {
	title: 'Pepper | Best Discord Music Bot for Seamless Streaming',
	description:
		'Add Pepper to your Discord server for high-quality music streaming from Spotify, Apple Music, Deezer and SoundCloud. Lag-free playback, autoplay, queue management and slash commands.',
	keywords: [
		'Discord music bot',
		'Pepper music bot',
		'Lavalink music bot',
		'Spotify Discord bot',
		'Apple Music music bot',
		'high quality Discord music',
		'Discord voice channel bot',
		'queue management Discord bot',
		'Discord audio streaming bot',
	],
};

const capabilities = [
	{
		icon: <AudioLines className="h-4 w-4" />,
		title: 'Lossless-feeling playback',
		description:
			'High-bitrate audio streamed through Lavalink servers we host ourselves, with automatic failover if one struggles mid-track.',
	},
	{
		icon: <Sparkles className="h-4 w-4" />,
		title: 'Autoplay when the queue runs dry',
		description:
			"Pepper keeps the room going using Lavalink's recommendations across Spotify and SoundCloud. A recommendation algorithm of our own is on the way.",
	},
	{
		icon: <ListMusic className="h-4 w-4" />,
		title: 'Queue control that makes sense',
		description:
			'Skip, loop, shuffle, seek and reorder with slash commands and buttons that respond instantly.',
	},
	{
		icon: <Shield className="h-4 w-4" />,
		title: 'DJ role permissions',
		description:
			'Hand playback control to a role you pick, so a busy server does not turn into a queue war.',
	},
	{
		icon: <Globe2 className="h-4 w-4" />,
		title: 'Speaks your language',
		description:
			'Every response is translated into each locale Pepper ships, set per server or per user.',
	},
	{
		icon: <Gauge className="h-4 w-4" />,
		title: 'Built to stay up',
		description:
			'Sharded, session-resuming and monitored — playback survives restarts and reconnects on its own.',
	},
];

const Page: NextPage = async () => {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Hero */}
			<section className="relative overflow-hidden border-b border-border">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[min(52rem,90%)] rounded-full bg-glow blur-3xl"
				/>
				<div className="container relative mx-auto px-4 py-16 md:py-24">
					<div className="mx-auto max-w-5xl">
						<Eyebrow>
							<Radio className="h-3 w-3" />
							Free Discord music bot
						</Eyebrow>
						<h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
							Music for your Discord, without the friction.
						</h1>
						<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
							Pepper joins your voice channel, finds the track and plays it in
							seconds — from Spotify, Apple Music, Deezer and SoundCloud. No
							setup, no paywall, no queue babysitting.
						</p>

						<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
							<ActionLink href={inviteLink} external>
								Add Pepper to Discord
								<ArrowRight className="h-4 w-4" />
							</ActionLink>
							<ActionLink href="/stats" variant="ghost">
								<Radio className="h-4 w-4" />
								See what is playing now
							</ActionLink>
						</div>

						<Suspense fallback={<MetricStripSkeleton />}>
							<HeroMetrics />
						</Suspense>
					</div>
				</div>
			</section>

			{/* Product panel */}
			<section className="border-b border-border">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
						<Surface className="overflow-hidden p-2">
							<div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-surface-hover">
								<Image
									src="/images/pepper.png"
									alt="Pepper playing music in a Discord voice channel"
									fill
									sizes="(max-width: 1024px) 100vw, 40vw"
									className="object-contain p-6"
									priority
								/>
							</div>
						</Surface>

						<div>
							<SectionHeading
								label="Why Pepper"
								title="Fast where it matters, quiet everywhere else."
								description="Pepper is built around one idea: the gap between typing a command and hearing the music should be as close to nothing as possible."
							/>
							<div className="mt-8 space-y-5">
								{[
									{
										icon: <Gauge className="h-4 w-4" />,
										title: 'Audio infrastructure we own',
										body: 'We host our own Lavalink servers rather than renting shared public ones, so playback quality and uptime are ours to fix.',
									},
									{
										icon: <Headphones className="h-4 w-4" />,
										title: 'One command to start',
										body: 'Join a voice channel, run /play, and Pepper handles the search, the queue and the reconnects.',
									},
									{
										icon: <Wand2 className="h-4 w-4" />,
										title: 'Our own lyrics service',
										body: 'Lyrics are answered by infrastructure we run, so no third party sees what your server is listening to. Autoplay still leans on Lavalink while we build a recommendation engine of our own.',
									},
								].map((item) => (
									<div key={item.title} className="flex gap-4">
										<IconChip>{item.icon}</IconChip>
										<div>
											<h3 className="text-base font-semibold text-foreground">
												{item.title}
											</h3>
											<p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
												{item.body}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Capabilities */}
			<section className="border-b border-border">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Capabilities"
							title="Everything a server actually needs"
							description="No feature gates, no premium upsell. Every command below works the moment Pepper joins."
						/>
						<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{capabilities.map((capability) => (
								<FeatureTile key={capability.title} {...capability} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Highlights with imagery */}
			<section className="border-b border-border">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Highlights"
							title="Made for the way servers listen together"
						/>
						<div className="mt-10 grid gap-5 md:grid-cols-3">
							{features.map((feature) => (
								<Features feature={feature} key={feature.value} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Commands */}
			<section className="border-b border-border">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Commands"
							title="Slash commands, no prefixes to remember"
							description="Type a slash and Discord does the rest. Here is the full set."
						/>
						<div className="mt-10">
							<Suspense fallback={<CommandGridSkeleton />}>
								<CommandGrid />
							</Suspense>
						</div>
					</div>
				</div>
			</section>

			{/* Sources & languages */}
			<section className="border-b border-border">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
						<Surface className="p-8">
							<IconChip>
								<ListMusic className="h-4 w-4" />
							</IconChip>
							<h3 className="mt-4 text-lg font-semibold text-foreground">
								Plays from the platforms you already use
							</h3>
							<p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
								Paste a link or search by name — Pepper resolves the track and
								streams the best available source.
							</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{musicSources.map((source) => (
									<span
										key={source}
										className="rounded-full border border-foreground/15 px-3 py-1 text-[13px] text-foreground/80"
									>
										{source}
									</span>
								))}
							</div>

							<div className="mt-5 flex gap-3 rounded-lg border border-border bg-surface p-4">
								<Ban className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/85" />
								<p className="text-[13px] leading-relaxed text-muted-foreground">
									<span className="font-semibold text-foreground/80">
										{unsupportedSource.summary}
									</span>{' '}
									{unsupportedSource.detail}
								</p>
							</div>
						</Surface>

						<Suspense fallback={<LanguagesCardSkeleton />}>
							<LanguagesCard />
						</Suspense>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="container mx-auto px-4 py-16 md:py-20">
				<div className="mx-auto max-w-5xl">
					<CtaBand
						title="Add Pepper and play something"
						description="It takes one click to invite, one command to start. Free forever, with a support server if you ever get stuck."
						actions={
							<>
								<ActionLink href={inviteLink} external>
									Add to Discord
									<ArrowRight className="h-4 w-4" />
								</ActionLink>
								<ActionLink href={discordServerLink} variant="ghost" external>
									Join the support server
								</ActionLink>
							</>
						}
					/>
					<p className="mt-6 text-center text-[13px] text-muted-foreground/85">
						Curious what Pepper does with your data?{' '}
						<Link
							href="/privacy-policy"
							className="font-medium text-foreground/80 underline decoration-foreground/35 underline-offset-4 hover:decoration-foreground"
						>
							Read the privacy policy
						</Link>
						.
					</p>
				</div>
			</section>
		</div>
	);
};

export const dynamic = 'force-dynamic';
export default Page;
