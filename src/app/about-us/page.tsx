import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
	ArrowRight,
	ExternalLink,
	Heart,
	MessageSquare,
	Music2,
	Server,
	ShieldCheck,
	Sparkles,
	Sparkle,
	Users,
	Wallet,
	Zap,
} from 'lucide-react';

import {
	ActionLink,
	CtaBand,
	IconChip,
	PageHero,
	SectionHeading,
	Surface,
} from '@/components/shared/page/parts';
import {
	discordServerLink,
	inviteLink,
	musicSources,
	pepperLogoLink,
	privacyLink,
	supportedLanguages,
} from '@/constants';

interface Props {}

export const metadata: Metadata = {
	title: 'About Pepper | Premium Discord Music Bot with Crystal-Clear Playback',
	description:
		'The story behind Pepper — a free-forever Discord music bot powered by distributed Lavalink nodes, built for communities that listen together.',
	keywords: [
		'About Pepper',
		'Pepper music bot',
		'Discord music bot story',
		'premium Discord music bot',
		'Lavalink music bot',
		'Pepper bot features',
		'Pepper bot community',
		'free Discord music bot',
		'music streaming on Discord',
	],
};

const values = [
	{
		icon: <Music2 className="h-4 w-4" />,
		title: 'Playback comes first',
		body: 'Every decision is measured against one question: does it get music playing faster and keep it playing? Features that fail that test do not ship.',
	},
	{
		icon: <Users className="h-4 w-4" />,
		title: 'Built around communities',
		body: 'Shared queues, DJ roles and per-server settings exist because listening together is different from listening alone.',
	},
	{
		icon: <Wallet className="h-4 w-4" />,
		title: 'Free, and staying that way',
		body: 'No premium tier, no locked commands, no paywalled audio quality. The only thing membership of our support server unlocks is account linking.',
	},
	{
		icon: <Zap className="h-4 w-4" />,
		title: 'Always shipping',
		body: 'Pepper is actively maintained — new features, fixes and performance work land regularly, driven by what people ask for.',
	},
];

const AboutUs: NextPage<Props> = ({}) => {
	return (
		<div className="min-h-screen bg-black text-white">
			<PageHero
				eyebrow={
					<>
						<Sparkles className="h-3 w-3" />
						About
					</>
				}
				title="A music bot built by people who got tired of bad ones"
				summary="Pepper started as a fix for the same frustrations everyone has with Discord music bots: slow searches, dropped audio, features hidden behind a subscription. It is free, actively maintained, and built to stay out of your way."
				actions={
					<>
						<ActionLink href={inviteLink} external>
							Add to Discord
							<ArrowRight className="h-4 w-4" />
						</ActionLink>
						<ActionLink href={discordServerLink} variant="ghost" external>
							<MessageSquare className="h-4 w-4" />
							Join the support server
						</ActionLink>
					</>
				}
			/>

			{/* Story */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
						<div>
							<SectionHeading label="Our story" title="Where Pepper came from" />
							<div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-400">
								<p>
									Pepper began as a small project for one Discord server, built
									because the bots available at the time kept buffering,
									dropping out of voice channels, or asking for money to play a
									song at a decent bitrate.
								</p>
								<p>
									It grew from there. Today it runs on distributed Lavalink
									nodes across Asia and the US, streams from{' '}
									{musicSources.length} major platforms, speaks{' '}
									{supportedLanguages.length} languages, and plays for
									communities around the world — still free, still improving.
								</p>
								<p>
									It is run by a small team that uses it daily. If you want to
									know exactly what Pepper records while it plays, our privacy
									policy spells it out in plain language.
								</p>
							</div>
						</div>

						<Surface className="mx-auto w-full max-w-[16rem] p-6 text-center">
							<Image
								src={pepperLogoLink}
								alt="Pepper logo"
								width={112}
								height={112}
								className="mx-auto rounded-full"
							/>
							<p className="mt-5 text-sm font-semibold text-white">Pepper</p>
							<p className="mt-1 text-[13px] text-gray-400">
								Discord music bot
							</p>
							<Link
								href={privacyLink}
								className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-300 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
							>
								<ShieldCheck className="h-3.5 w-3.5" />
								Privacy policy
							</Link>
						</Surface>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="What we care about"
							title="Four things we will not compromise on"
						/>
						<div className="mt-10 grid gap-4 sm:grid-cols-2">
							{values.map((value) => (
								<Surface key={value.title} interactive className="flex gap-4 p-6">
									<IconChip>{value.icon}</IconChip>
									<div>
										<h3 className="text-base font-semibold text-white">
											{value.title}
										</h3>
										<p className="mt-1.5 text-[14px] leading-relaxed text-gray-400">
											{value.body}
										</p>
									</div>
								</Surface>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* What powers Pepper */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<SectionHeading
							label="Under the hood"
							title="What actually powers Pepper"
						/>
						<div className="mt-10 grid gap-4 sm:grid-cols-3">
							{[
								{
									icon: <Server className="h-4 w-4" />,
									title: 'Lavalink nodes',
									body: 'Audio is served from the closest healthy node, with priority ordering and automatic failover mid-track.',
								},
								{
									icon: <Sparkle className="h-4 w-4" />,
									title: 'Our own autoplay',
									body: 'Recommendations come from an algorithm we built around your listening history, not a third-party radio feed.',
								},
								{
									icon: <Zap className="h-4 w-4" />,
									title: 'Sharded and resilient',
									body: 'Sessions resume after restarts, and expired streams refresh without losing your place.',
								},
							].map((item) => (
								<Surface key={item.title} className="p-6">
									<IconChip>{item.icon}</IconChip>
									<h3 className="mt-4 text-base font-semibold text-white">
										{item.title}
									</h3>
									<p className="mt-2 text-[14px] leading-relaxed text-gray-400">
										{item.body}
									</p>
								</Surface>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Support */}
			<section className="border-b border-white/10">
				<div className="container mx-auto px-4 py-16 md:py-20">
					<div className="mx-auto max-w-5xl">
						<Surface className="p-8 md:p-10">
							<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
								<div className="max-w-xl">
									<IconChip>
										<MessageSquare className="h-4 w-4" />
									</IconChip>
									<h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
										Support server
									</h2>
									<p className="mt-3 text-[15px] leading-relaxed text-gray-400">
										Stuck on setup, hit a bug, or want a feature? Our support
										server is where the maintainers and the community answer
										questions — usually within the hour. It is also where
										release notes and outage updates get posted first.
									</p>
									<p className="mt-3 text-[15px] leading-relaxed text-gray-400">
										Joining it also unlocks account linking, so you can queue
										your own Spotify playlists with{' '}
										<code className="font-mono text-gray-300">/login</code>.
									</p>
								</div>

								<div className="shrink-0 lg:w-72">
									<div className="rounded-lg border border-white/10 bg-black p-4">
										<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
											Invite link
										</p>
										<p className="mt-2 break-all font-mono text-[13px] text-gray-300">
											{discordServerLink}
										</p>
									</div>
									<ActionLink
										href={discordServerLink}
										external
										className="mt-3 w-full"
									>
										<ExternalLink className="h-4 w-4" />
										Join now
									</ActionLink>
								</div>
							</div>
						</Surface>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="container mx-auto px-4 py-16 md:py-20">
				<div className="mx-auto max-w-5xl">
					<CtaBand
						title="Ready to elevate your server?"
						description="Add Pepper, run /play, and let the music take center stage in your community."
						actions={
							<>
								<ActionLink href={inviteLink} external>
									<Heart className="h-4 w-4" />
									Add to Discord
								</ActionLink>
								<ActionLink href="/bot-features" variant="ghost">
									Browse the features
								</ActionLink>
							</>
						}
					/>
				</div>
			</section>
		</div>
	);
};

export default AboutUs;
