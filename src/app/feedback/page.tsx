import { Metadata, NextPage } from 'next';
import { Gift, MessageSquare, Megaphone, Radio, Wrench } from 'lucide-react';

import {
	ActionLink,
	IconChip,
	PageHero,
	Surface,
} from '@/components/shared/page/parts';
import FeedbackComponent from '@/components/shared/feedback/feedbackComponent';
import { discordServerLink } from '@/constants';

interface Props {}

export const metadata: Metadata = {
	title: 'Feedback | Tell us what Pepper should do next',
	description:
		'Rate Pepper and send the team a bug report, a feature idea or a note about audio quality. Takes a minute, goes straight to the maintainers.',
	keywords: [
		'Pepper bot feedback',
		'Discord music bot feedback',
		'report a Pepper bug',
		'Pepper feature request',
		'Discord music bot support',
	],
};

const steps = [
	{
		icon: <Radio className="h-4 w-4" />,
		title: 'It reaches us immediately',
		body: 'Your note is posted into the maintainers channel the moment you send it — no ticket queue in between.',
	},
	{
		icon: <Wrench className="h-4 w-4" />,
		title: 'We triage it',
		body: 'Bugs get reproduced and fixed. Ideas get weighed against what is already in flight and either scheduled or explained.',
	},
	{
		icon: <Megaphone className="h-4 w-4" />,
		title: 'You hear back about it',
		body: 'When your report ships, it goes out in the release announcement — and you get named in it if you left a handle.',
	},
];

const FeedbackPage: NextPage<Props> = ({}) => {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<PageHero
				eyebrow={
					<>
						<MessageSquare className="h-3 w-3" />
						Feedback
					</>
				}
				title="Tell us what Pepper gets right — and what it does not"
				summary="A rating, what it is about, and a few sentences. That is the whole form, and it goes straight to the people who maintain the bot."
			/>

			<section className="container mx-auto px-4 py-14 md:py-20">
				<div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
					<FeedbackComponent />

					<aside className="space-y-4 lg:sticky lg:top-24">
						<Surface className="p-6">
							<IconChip>
								<Gift className="h-4 w-4" />
							</IconChip>
							<h2 className="mt-4 text-base font-semibold text-foreground">
								There is something in it for you
							</h2>
							<p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
								Reports that turn into a fix or a feature get called out by name
								in the release announcement, and the most useful ones earn perks
								in the support server. Add your Discord username to be eligible
								— it is the only reason we ask for it.
							</p>
						</Surface>

						<Surface className="p-6">
							<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
								What happens next
							</h2>
							<ol className="mt-5 space-y-5">
								{steps.map((step) => (
									<li key={step.title} className="flex gap-3">
										<IconChip className="h-8 w-8">{step.icon}</IconChip>
										<div>
											<h3 className="text-[15px] font-semibold text-foreground">
												{step.title}
											</h3>
											<p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
												{step.body}
											</p>
										</div>
									</li>
								))}
							</ol>
						</Surface>

						<Surface className="p-6">
							<h2 className="text-base font-semibold text-foreground">
								Would rather just chat?
							</h2>
							<p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
								Ask in the support server, or run{' '}
								<code className="font-mono text-foreground/80">/feedback</code> in
								any server Pepper is in — it lands in the same place.
							</p>
							<ActionLink
								href={discordServerLink}
								variant="ghost"
								external
								className="mt-4 w-full"
							>
								<MessageSquare className="h-4 w-4" />
								Open the support server
							</ActionLink>
						</Surface>
					</aside>
				</div>
			</section>
		</div>
	);
};

export default FeedbackPage;
