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
	<div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/20">
		<div className="flex items-center gap-2">
			<span className="text-foreground/55">{icon}</span>
			<h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/60">
				{label}
			</h3>
		</div>
		<p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">
			{value}
		</p>
		{hint && <p className="mt-1 text-xs text-muted-foreground/85">{hint}</p>}
	</div>
);

export default StatTile;
