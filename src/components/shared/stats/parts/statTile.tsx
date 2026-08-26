import { Card, CardContent } from '@/components/ui/card';

export interface StatTileProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	hint?: string;
	accent?: string;
}

/** Shared tile used by the overview and realtime cards. */
export const StatTile: React.FC<StatTileProps> = ({
	icon,
	label,
	value,
	hint,
	accent = 'text-zinc-300',
}) => (
	<Card className="bg-zinc-900/60 border-zinc-800 text-white py-4 gap-2">
		<CardContent className="px-4">
			<div className="flex items-center gap-2 mb-2">
				<span className={`text-lg ${accent}`}>{icon}</span>
				<h3 className="text-sm font-medium text-zinc-400">{label}</h3>
			</div>
			<p className="text-2xl font-mono font-semibold tracking-tight">{value}</p>
			{hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
		</CardContent>
	</Card>
);

export default StatTile;
