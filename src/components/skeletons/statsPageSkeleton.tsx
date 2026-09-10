/** Loading placeholder that mirrors the stats page layout. */

const Bar = ({ className = '' }: { className?: string }) => (
	<div className={`rounded bg-surface-strong ${className}`} />
);

const TileSkeleton = () => (
	<div className="rounded-lg border border-border bg-surface p-4">
		<Bar className="h-3 w-20" />
		<Bar className="mt-3 h-6 w-16" />
	</div>
);

const RowSkeleton = () => (
	<div className="flex items-center gap-3 px-4 py-3.5">
		<Bar className="h-4 w-4 shrink-0" />
		<Bar className="h-11 w-11 shrink-0 rounded" />
		<div className="min-w-0 flex-1">
			<Bar className="h-4 w-2/5" />
			<Bar className="mt-2 h-3 w-3/5" />
		</div>
	</div>
);

const SectionSkeleton = ({
	rows = 5,
	tiles = 0,
}: {
	rows?: number;
	tiles?: number;
}) => (
	<section>
		<Bar className="h-3 w-24" />
		<Bar className="mt-3 h-7 w-64" />
		<Bar className="mt-3 h-4 w-80 max-w-full" />

		{tiles > 0 && (
			<div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
				{Array.from({ length: tiles }).map((_, index) => (
					<TileSkeleton key={index} />
				))}
			</div>
		)}

		{rows > 0 && (
			<div className="mt-8 overflow-hidden rounded-lg border border-border">
				<div className="divide-y divide-border">
					{Array.from({ length: rows }).map((_, index) => (
						<RowSkeleton key={index} />
					))}
				</div>
			</div>
		)}
	</section>
);

const StatsPageSkeleton = () => (
	<div className="container mx-auto animate-pulse px-4 py-16 md:py-20">
		<div className="mx-auto max-w-5xl space-y-20">
			<SectionSkeleton tiles={6} rows={4} />
			<SectionSkeleton tiles={4} rows={0} />
			<SectionSkeleton rows={6} />
		</div>
	</div>
);

export default StatsPageSkeleton;
