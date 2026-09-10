import { MetricStrip } from '@/components/shared/page/parts';
import { getOverview, getRealtime } from '@/lib/stats-api';
import {
	formatCompactNumber,
	formatDuration,
	isPlausiblePlaytime,
} from '@/utils/format';

/**
 * Live numbers for the hero strip. Rendered inside a Suspense boundary so the
 * headline and the invite button are on screen before the bot has answered; if
 * it never does, the strip simply does not appear.
 */
const HeroMetrics: React.FC = async () => {
	const [overview, realtime] = await Promise.all([
		getOverview().catch(() => null),
		getRealtime().catch(() => null),
	]);

	if (!overview && !realtime) return null;

	// Playtime is only shown when the bot's total is not skewed by live streams.
	const playtimeIsUsable =
		overview !== null &&
		isPlausiblePlaytime(overview.estimatedPlaytimeMs, overview.totalPlays);

	const metrics = [
		{
			label: 'Servers',
			value: formatCompactNumber(realtime?.guilds ?? overview?.activeGuilds),
			hint: 'Communities using Pepper',
		},
		{
			label: 'Members reached',
			value: formatCompactNumber(realtime?.members),
			hint: 'Across every server',
		},
		{
			label: 'Tracks played',
			value: formatCompactNumber(overview?.totalPlays),
			hint: `${formatCompactNumber(overview?.uniqueSongs)} unique songs`,
		},
		playtimeIsUsable
			? {
					label: 'Music streamed',
					value: formatDuration(overview.estimatedPlaytimeMs, 1),
					hint: 'Total listening time',
				}
			: {
					label: 'Artists played',
					value: formatCompactNumber(overview?.uniqueArtists),
					hint: 'Distinct artists in the library',
				},
	];

	return <MetricStrip metrics={metrics} className="mt-14" />;
};

export default HeroMetrics;
