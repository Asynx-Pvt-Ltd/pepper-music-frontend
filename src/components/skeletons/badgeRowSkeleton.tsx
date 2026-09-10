/** Placeholder for a row of pill badges (languages, sources) while it loads. */
const BadgeRowSkeleton = ({ count = 6 }: { count?: number }) => (
	<div className="flex animate-pulse flex-wrap gap-2" aria-hidden>
		{Array.from({ length: count }).map((_, index) => (
			<div
				key={index}
				className="h-7 rounded-full bg-white/[0.08]"
				style={{ width: `${4.5 + (index % 3)}rem` }}
			/>
		))}
	</div>
);

export default BadgeRowSkeleton;
