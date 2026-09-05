export interface StatTileProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	hint?: string;
}

/** Shared tile used by the overview and realtime sections. */
export const StatTile: React.FC<StatTileProps> = ({
	icon,
	label,
	value,
	hint,
}) => (
	<div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20">
		<div className="flex items-center gap-2">
			<span className="text-white/40">{icon}</span>
			<h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
				{label}
			</h3>
		</div>
		<p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-white">
			{value}
		</p>
		{hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
	</div>
);

export default StatTile;
