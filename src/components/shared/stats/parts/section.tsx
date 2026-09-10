import { ReactNode } from 'react';

import { SectionHeading } from '@/components/shared/page/parts';

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
	<section id={id} className="scroll-mt-24">
		<div className="flex flex-wrap items-end justify-between gap-4">
			<SectionHeading label={label} title={title} description={description} />
			{action}
		</div>
		<div className="mt-8">{children}</div>
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
	<div className="rounded-xl border border-border bg-surface px-6 py-12 text-center text-sm text-muted-foreground/85">
		{message}
	</div>
);

export default StatsSection;
