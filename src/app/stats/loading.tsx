import { Radio } from 'lucide-react';

import { PageHero } from '@/components/shared/page/parts';
import StatsPageSkeleton from '@/components/skeletons/statsPageSkeleton';
import { statsSections } from '@/constants';

export default function Loading() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<PageHero
				eyebrow={
					<>
						<Radio className="h-3 w-3" />
						Stats
					</>
				}
				title="Pepper, by the numbers"
				summary="Everything Pepper is playing right now, and everything it has played since day one — pulled straight from the bot, not a marketing deck."
			>
				<nav className="mt-8 flex flex-wrap gap-2">
					{statsSections.map((section) => (
						<span
							key={section.id}
							className="rounded-full border border-foreground/15 px-3.5 py-1.5 text-[13px] text-foreground/80"
						>
							{section.label}
						</span>
					))}
				</nav>
			</PageHero>

			<StatsPageSkeleton />
		</div>
	);
}
