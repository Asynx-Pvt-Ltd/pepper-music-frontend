/** Loading placeholder for the command catalogue while a locale is fetched. */

const Bar = ({ className = '' }: { className?: string }) => (
	<div className={`rounded bg-white/[0.08] ${className}`} />
);

const CommandListSkeleton = ({ rows = 8 }: { rows?: number }) => (
	<div className="animate-pulse" aria-hidden>
		<div className="flex flex-wrap gap-2">
			{Array.from({ length: 3 }).map((_, index) => (
				<Bar key={index} className="h-8 w-28 rounded-full" />
			))}
		</div>
		<div className="mt-6 overflow-hidden rounded-xl border border-white/10">
			<div className="divide-y divide-white/[0.07]">
				{Array.from({ length: rows }).map((_, index) => (
					<div
						key={index}
						className="grid gap-2 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
					>
						<Bar className="h-4 w-24" />
						<Bar className="h-4 w-3/4" />
					</div>
				))}
			</div>
		</div>
	</div>
);

export default CommandListSkeleton;
