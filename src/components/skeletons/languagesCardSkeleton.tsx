import BadgeRowSkeleton from './badgeRowSkeleton';

/** Placeholder for the home page's languages card. */
const LanguagesCardSkeleton = () => (
	<div
		aria-hidden
		className="animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-8"
	>
		<div className="h-9 w-9 rounded-lg bg-white/[0.1]" />
		<div className="mt-4 h-6 w-52 rounded bg-white/[0.08]" />
		<div className="mt-3 h-4 w-full rounded bg-white/[0.06]" />
		<div className="mt-5">
			<BadgeRowSkeleton count={7} />
		</div>
	</div>
);

export default LanguagesCardSkeleton;
