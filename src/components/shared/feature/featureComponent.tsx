import {
	ArrowRight,
	Ban,
	Clock3,
	Globe2,
	Headphones,
	Languages,
	ListMusic,
	Mic2,
	Radio,
	Server,
	Shield,
	Sparkles,
	Users,
	Wand2,
	Waves,
} from 'lucide-react';

import { Suspense } from 'react';

import {
	ActionLink,
	CtaBand,
	IconChip,
	PageHero,
	SectionHeading,
	Surface,
} from '@/components/shared/page/parts';
import FeatureCards from '@/components/shared/feature/parts/featureCards';
import CommandReference from '@/components/shared/feature/parts/commandReference';
import LanguageBadges from '@/components/shared/feature/parts/languageBadges';
import BadgeRowSkeleton from '@/components/skeletons/badgeRowSkeleton';
import CommandListSkeleton from '@/components/skeletons/commandListSkeleton';
import {
	discordServerLink,
	inviteLink,
	musicSources,
	unsupportedSource,
} from '@/constants';

const steps = [
	{
		title: 'Invite Pepper',
		body: 'One click adds the bot with only the permissions it needs. No dashboard, no configuration file.',
	},
	{
		title: 'Join a voice channel',
		body: 'Hop into any channel in your server. Pepper follows you in the moment you play something.',
	},
	{
		title: 'Run /play',
		body: 'Search by name or paste a Spotify, Apple Music, Deezer or SoundCloud link. Drop in a YouTube link and Pepper finds the same track on Spotify instead.',
	},
];

const depth = [
	{
		icon: <Wand2 className="h-4 w-4" />,
		title: 'Audio filters',
		body: 'Bassboost, nightcore, karaoke, vaporwave and more, switched live without interrupting the track.',
	},
	{
		icon: <Shield className="h-4 w-4" />,
		title: 'DJ role',
		body: 'Point /dj at a role and playback controls become theirs alone — everyone else can still queue.',
	},
	{
		icon: <Mic2 className="h-4 w-4" />,
		title: 'Lyrics on demand',
		body: '/lyrics pulls up the words for whatever is playing, served by our own lyrics service and paginated for long songs.',
	},
	{
		icon: <Clock3 className="h-4 w-4" />,
		title: 'Listening stats',
		body: '/chart shows your top tracks, artists and total listening time, plus the same for your server.',
	},
	{
		icon: <Waves className="h-4 w-4" />,
		title: 'Resilient streams',
		body: 'If an audio node drops or a stream expires, Pepper refreshes it and resumes from the same position — on servers we run ourselves.',
	},
	{
		icon: <Languages className="h-4 w-4" />,
		title: 'Per-user language',
		body: 'Every response is translated, set for the whole server or just for you — the list below is read straight from the bot.',
	},
	{
		icon: <Radio className="h-4 w-4" />,
		title: 'Autoplay when the queue empties',
		body: 'Autoplay currently uses Lavalink\'s own recommendations across Spotify and SoundCloud. Our own recommendation algorithm is in the works.',
	},
];

const FeatureComponent: React.FC = () => {
	return (
		<>
			<PageHero
				eyebrow={
					<>
						<Sparkles className="h-3 w-3" />
						Features
					</>
				}
				title="Everything Pepper does"
				summary="A music bot that gets out of the way: instant playback from the platforms you use, controls your moderators can trust, and stats worth checking."
				actions={
					<>
						<ActionLink href={inviteLink} external>
							Add to Discord
							<ArrowRight className="h-4 w-4" />
						</ActionLink>
						<ActionLink href="/stats" variant="ghost">
							<Radio className="h-4 w-4" />
							View live stats
						</ActionLink>
					</>
				}
			/>

			{/* Core features */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Core"
							title="The things you will use every day"
						/>
						<div className="mt-10">
							<FeatureCards />
						</div>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Getting started"
							title="Three steps, about thirty seconds"
						/>
						<div className="mt-10 grid gap-5 md:grid-cols-3">
							{steps.map((step, index) => (
								<Surface key={step.title} className="p-6">
									<span className="font-mono text-sm text-white/40">
										{String(index + 1).padStart(2, '0')}
									</span>
									<h3 className="mt-3 text-base font-semibold text-white">
										{step.title}
									</h3>
									<p className="mt-2 text-[14px] leading-relaxed text-gray-400">
										{step.body}
									</p>
								</Surface>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Deeper features */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Going further"
							title="The details that separate Pepper from the rest"
						/>
						<div className="mt-10 grid gap-4 sm:grid-cols-2">
							{depth.map((item) => (
								<Surface key={item.title} interactive className="flex gap-4 p-6">
									<IconChip>{item.icon}</IconChip>
									<div>
										<h3 className="text-base font-semibold text-white">
											{item.title}
										</h3>
										<p className="mt-1.5 text-[14px] leading-relaxed text-gray-400">
											{item.body}
										</p>
									</div>
								</Surface>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Command reference */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Reference"
							title="Every command, one list"
							description="Read live from the bot, so this list is never out of date. Switch the language to see the commands exactly as your server will."
						/>
						<div className="mt-10">
							<Suspense fallback={<CommandListSkeleton rows={10} />}>
								<CommandReference />
							</Suspense>
						</div>
					</div>
				</div>
			</section>

			{/* Built for communities */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
						<Surface className="p-8">
							<IconChip>
								<Users className="h-4 w-4" />
							</IconChip>
							<h3 className="mt-4 text-lg font-semibold text-white">
								Built for Discord communities
							</h3>
							<ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-gray-400">
								{[
									'Native voice channel integration with live now-playing updates',
									'Permission-aware controls so moderators stay in charge',
									'Sharded architecture that holds up during peak activity',
									'Playback resumes automatically after restarts and node failovers',
								].map((item) => (
									<li key={item} className="relative pl-5">
										<span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-white/40" />
										{item}
									</li>
								))}
							</ul>
						</Surface>

						<Surface className="p-8">
							<IconChip>
								<ListMusic className="h-4 w-4" />
							</IconChip>
							<h3 className="mt-4 text-lg font-semibold text-white">
								Sources and languages
							</h3>
							<p className="mt-2 text-[14px] leading-relaxed text-gray-400">
								Search by name or paste a link — Pepper resolves it and streams
								the best available source.
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

							<div className="mt-5 flex gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
								<Ban className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
								<p className="text-[13px] leading-relaxed text-gray-400">
									<span className="font-semibold text-gray-300">
										{unsupportedSource.summary}
									</span>{' '}
									{unsupportedSource.detail}
								</p>
							</div>

							<p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
								Languages
							</p>
							<Suspense fallback={<BadgeRowSkeleton count={7} />}>
								<LanguageBadges className="mt-3" />
							</Suspense>
						</Surface>
					</div>
				</div>
			</section>

			{/* Infrastructure + CTA */}
			<section className="container mx-auto px-4 py-16 md:py-20">
				<div className="mx-auto max-w-5xl space-y-10">
					<div className="grid gap-4 sm:grid-cols-3">
						{[
							{
								icon: <Server className="h-4 w-4" />,
								title: 'Self-hosted audio',
								body: 'We run our own Lavalink servers, with automatic failover and session resume.',
							},
							{
								icon: <Headphones className="h-4 w-4" />,
								title: 'High-bitrate audio',
								body: 'Clean sound with minimal buffering, even on busy servers.',
							},
							{
								icon: <Globe2 className="h-4 w-4" />,
								title: 'Free, everywhere',
								body: 'No premium tier, no locked commands, no usage limits.',
							},
						].map((item) => (
							<Surface key={item.title} className="p-6">
								<IconChip>{item.icon}</IconChip>
								<h3 className="mt-4 text-sm font-semibold text-white">
									{item.title}
								</h3>
								<p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">
									{item.body}
								</p>
							</Surface>
						))}
					</div>

					<CtaBand
						title="Try it in your server"
						description="Invite Pepper, run /play, and hear the difference. If anything goes wrong, our support server answers fast."
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
				</div>
			</section>
		</>
	);
};

export default FeatureComponent;
