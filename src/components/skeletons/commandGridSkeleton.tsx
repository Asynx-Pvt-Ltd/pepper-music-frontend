/** Placeholder for the home page's command grid. */
const CommandGridSkeleton = ({ cards = 12 }: { cards?: number }) => (
	<div
		aria-hidden
		className="grid animate-pulse gap-3 sm:grid-cols-2 lg:grid-cols-3"
	>
		{Array.from({ length: cards }).map((_, index) => (
			<div
				key={index}
				className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
			>
				<div className="h-4 w-20 rounded bg-white/[0.08]" />
				<div className="mt-2 h-3 w-full rounded bg-white/[0.06]" />
			</div>
		))}
	</div>
);

export default CommandGridSkeleton;
