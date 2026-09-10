import { Cell } from '@/components/shared/page/parts';

export interface StatTileProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	hint?: string;
}

/**
 * Shared tile used by the overview and realtime sections. It carries no border
 * of its own — it sits in a `CellGrid`, which draws the hairlines between tiles
 * so a row of six reads as one instrument panel rather than six cards.
 */
export const StatTile: React.FC<StatTileProps> = ({
	icon,
	label,
	value,
	hint,
}) => (
	<Cell interactive className="px-5 py-5">
		{/* Two lines are reserved for the label so a wrapping one ("Members
		    reached") does not push its figure below the figures beside it — the
		    row only reads as one panel while the numbers share a baseline. */}
		<div className="flex min-h-[2.2rem] items-start gap-2">
			<span className="mt-px shrink-0 text-muted-foreground">{icon}</span>
			<h3 className="font-mono text-[11px] font-medium uppercase leading-[1.35] tracking-[0.18em] text-muted-foreground">
				{label}
			</h3>
		</div>
		<p className="mt-2.5 font-mono text-[1.5rem] font-semibold leading-none tabular-nums tracking-[-0.02em] text-foreground">
			{value}
		</p>
		{hint && (
			<p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/85">
				{hint}
			</p>
		)}
	</Cell>
);

export default StatTile;
