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
			position <= 3 ? 'text-white' : 'text-white/30'
		}`}
	>
		{position}
	</span>
);

export const EmptyState = ({ message }: { message: string }) => (
	<div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-sm text-gray-500">
		{message}
	</div>
);

export default StatsSection;
