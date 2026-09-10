/** Placeholder for the hero's live metric strip. */
const MetricStripSkeleton = () => (
	<div
		aria-hidden
		className="mt-14 grid animate-pulse gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
	>
		{Array.from({ length: 4 }).map((_, index) => (
			<div key={index} className="bg-background px-5 py-6">
				<div className="h-3 w-24 rounded bg-surface-strong" />
				<div className="mt-3 h-7 w-20 rounded bg-surface-strong" />
				<div className="mt-2 h-3 w-28 rounded bg-surface-hover" />
			</div>
		))}
	</div>
);

export default MetricStripSkeleton;
