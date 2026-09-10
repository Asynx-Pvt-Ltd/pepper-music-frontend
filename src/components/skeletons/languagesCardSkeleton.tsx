import BadgeRowSkeleton from './badgeRowSkeleton';

/** Placeholder for the home page's languages card. */
const LanguagesCardSkeleton = () => (
	<div
		aria-hidden
		className="animate-pulse rounded-lg border border-border bg-surface p-8"
	>
		<div className="h-9 w-9 rounded-md bg-surface-strong" />
		<div className="mt-4 h-6 w-52 rounded bg-surface-strong" />
		<div className="mt-3 h-4 w-full rounded bg-surface-hover" />
		<div className="mt-5">
			<BadgeRowSkeleton count={7} />
		</div>
	</div>
);

export default LanguagesCardSkeleton;
