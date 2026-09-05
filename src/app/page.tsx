import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
	ArrowRight,
	AudioLines,
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
	MetricStrip,
	SectionHeading,
	Surface,
} from '@/components/shared/page/parts';
import Features from '@/components/shared/features';
import {
	botCommands,
	discordServerLink,
	features,
	inviteLink,
	musicSources,
	supportedLanguages,
} from '@/constants';
import { getOverview, getRealtime } from '@/lib/stats-api';
import {
	formatCompactNumber,
	formatDuration,
	isPlausiblePlaytime,
} from '@/utils/format';

export const metadata: Metadata = {
	title: 'Pepper | Best Discord Music Bot for Seamless Streaming',
	description:
		'Add Pepper to your Discord server for high-quality music streaming from Spotify, Apple Music, Deezer and SoundCloud. Lag-free playback, smart autoplay, queue management and slash commands.',
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
			'High-bitrate audio streamed through Lavalink nodes in Asia and the US, with automatic failover when a node struggles.',
	},
	{
		icon: <Sparkles className="h-4 w-4" />,
		title: 'Autoplay that learns',
		description:
			'When the queue runs dry, Pepper keeps going using your own listening history — not a generic radio feed.',
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
			`Every response is translated across ${supportedLanguages.length} languages, set per server or per user.`,
	},
	{
		icon: <Gauge className="h-4 w-4" />,
		title: 'Built to stay up',
		description:
			'Sharded, session-resuming and monitored — playback survives restarts and reconnects on its own.',
	},
];

/** Live numbers for the hero strip; falls back to static copy if the bot API is unreachable. */
const loadHeroMetrics = async () => {
	const [overview, realtime] = await Promise.all([
		getOverview().catch(() => null),
		getRealtime().catch(() => null),
	]);

	if (!overview && !realtime) return null;

	// Playtime is only shown when the bot's total is not skewed by live streams.
	const playtimeIsUsable =
		overview !== null &&
		isPlausiblePlaytime(overview.estimatedPlaytimeMs, overview.totalPlays);

	return [
		{
			label: 'Servers',
			value: formatCompactNumber(realtime?.guilds ?? overview?.activeGuilds),
			hint: 'Communities using Pepper',
		},
		{
			label: 'Members reached',
			value: formatCompactNumber(realtime?.members),
			hint: 'Across every server',
		},
		{
			label: 'Tracks played',
			value: formatCompactNumber(overview?.totalPlays),
			hint: `${formatCompactNumber(overview?.uniqueSongs)} unique songs`,
		},
		playtimeIsUsable
			? {
					label: 'Music streamed',
					value: formatDuration(overview.estimatedPlaytimeMs, 1),
					hint: 'Total listening time',
				}
			: {
					label: 'Artists played',
					value: formatCompactNumber(overview?.uniqueArtists),
					hint: 'Distinct artists in the library',
				},
	];
};

const Page: NextPage = async () => {
	const metrics = await loadHeroMetrics();

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Hero */}
			<section className="relative overflow-hidden border-b border-white/10">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[min(52rem,90%)] rounded-full bg-white/[0.08] blur-3xl"
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
						<p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
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

						{metrics && <MetricStrip metrics={metrics} className="mt-14" />}
					</div>
				</div>
			</section>

			{/* Product panel */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
						<Surface className="overflow-hidden p-2">
							<div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-white/[0.04]">
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
										title: 'Distributed Lavalink nodes',
										body: 'Audio is served from the node closest to your server, with automatic failover if one goes down mid-track.',
									},
									{
										icon: <Headphones className="h-4 w-4" />,
										title: 'One command to start',
										body: 'Join a voice channel, run /play, and Pepper handles the search, the queue and the reconnects.',
									},
									{
										icon: <Wand2 className="h-4 w-4" />,
										title: 'Filters and effects built in',
										body: 'Bassboost, nightcore, karaoke and more — applied live without restarting the track.',
									},
								].map((item) => (
									<div key={item.title} className="flex gap-4">
										<IconChip>{item.icon}</IconChip>
										<div>
											<h3 className="text-base font-semibold text-white">
												{item.title}
											</h3>
											<p className="mt-1 text-[14px] leading-relaxed text-gray-400">
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
			<section className="border-b border-white/10">
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
			<section className="border-b border-white/10">
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
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Commands"
							title="Slash commands, no prefixes to remember"
							description="Type a slash and Discord does the rest. Here is the full set."
						/>
						<div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{botCommands.map((command) => (
								<Surface
									key={command.name}
									interactive
									className="px-4 py-3.5"
								>
									<code className="font-mono text-sm font-semibold text-white">
										{command.name}
									</code>
									<p className="mt-1 text-[13px] leading-relaxed text-gray-400">
										{command.description}
									</p>
								</Surface>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Sources & languages */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
						<Surface className="p-8">
							<IconChip>
								<ListMusic className="h-4 w-4" />
							</IconChip>
							<h3 className="mt-4 text-lg font-semibold text-white">
								Plays from the platforms you already use
							</h3>
							<p className="mt-2 text-[14px] leading-relaxed text-gray-400">
								Paste a link or search by name — Pepper resolves the track and
								streams the best available source.
							</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{musicSources.map((source) => (
									<span
										key={source}
										className="rounded-full border border-white/15 px-3 py-1 text-[13px] text-gray-300"
									>
										{source}
									</span>
								))}
							</div>
						</Surface>

						<Surface className="p-8">
							<IconChip>
								<Globe2 className="h-4 w-4" />
							</IconChip>
							<h3 className="mt-4 text-lg font-semibold text-white">
								Speaks {supportedLanguages.length} languages
							</h3>
							<p className="mt-2 text-[14px] leading-relaxed text-gray-400">
								Set a language for the whole server, or let each member pick
								their own with <code className="font-mono">/language</code>.
							</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{supportedLanguages.map((language) => (
									<span
										key={language}
										className="rounded-full border border-white/15 px-3 py-1 text-[13px] text-gray-300"
									>
										{language}
									</span>
								))}
							</div>
						</Surface>
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
					<p className="mt-6 text-center text-[13px] text-gray-500">
						Curious what Pepper does with your data?{' '}
						<Link
							href="/privacy-policy"
							className="font-medium text-gray-300 underline decoration-white/30 underline-offset-4 hover:decoration-white"
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
