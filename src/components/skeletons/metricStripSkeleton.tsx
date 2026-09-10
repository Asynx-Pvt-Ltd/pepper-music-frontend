/** Placeholder for the hero's live metric strip. */
const MetricStripSkeleton = () => (
	<div
		aria-hidden
		className="mt-14 grid animate-pulse gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
	>
		{Array.from({ length: 4 }).map((_, index) => (
			<div key={index} className="bg-black px-5 py-6">
				<div className="h-3 w-24 rounded bg-white/[0.08]" />
				<div className="mt-3 h-7 w-20 rounded bg-white/[0.08]" />
				<div className="mt-2 h-3 w-28 rounded bg-white/[0.06]" />
			</div>
		))}
	</div>
);

export default MetricStripSkeleton;
