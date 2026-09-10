import { ReactNode } from 'react';

import { SectionHeading } from '@/components/shared/page/parts';
import Reveal from '@/components/shared/reveal';

/** Wrapper shared by every stats section so headings and spacing stay aligned. */
export const StatsSection = ({
	id,
	label,
	title,
	description,
	action,
	children,
}: {
	id: string;
	label: string;
	title: string;
	description?: string;
	action?: ReactNode;
	children: ReactNode;
}) => (
	// The `id` stays on the section itself so the in-page anchors still land on
	// it; only the contents animate.
	<section id={id} className="scroll-mt-24">
		<Reveal>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<SectionHeading label={label} title={title} description={description} />
				{action}
			</div>
		</Reveal>
		<Reveal delay={0.08}>
			<div className="mt-8">{children}</div>
		</Reveal>
	</section>
);

/** Rank number shown at the head of every leaderboard row. */
export const Rank = ({ position }: { position: number }) => (
	<span
		className={`w-7 shrink-0 text-center font-mono text-sm tabular-nums ${
			position <= 3 ? 'text-foreground' : 'text-foreground/45'
		}`}
	>
		{position}
	</span>
);

export const EmptyState = ({ message }: { message: string }) => (
	<div className="rounded-lg border border-border bg-surface px-6 py-12 text-center text-sm text-muted-foreground/85">
		{message}
	</div>
);

export default StatsSection;
