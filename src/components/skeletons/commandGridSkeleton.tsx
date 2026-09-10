/** Placeholder for the home page's command grid. */
const CommandGridSkeleton = ({ cards = 12 }: { cards?: number }) => (
	<div
		aria-hidden
		className="grid animate-pulse gap-3 sm:grid-cols-2 lg:grid-cols-3"
	>
		{Array.from({ length: cards }).map((_, index) => (
			<div
				key={index}
				className="rounded-lg border border-border bg-surface px-4 py-3.5"
			>
				<div className="h-4 w-20 rounded bg-surface-strong" />
				<div className="mt-2 h-3 w-full rounded bg-surface-hover" />
			</div>
		))}
	</div>
);

export default CommandGridSkeleton;
