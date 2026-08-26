import { getStatsBundle } from '@/lib/stats-api';

import FeatureCards from './parts/featureCards';
import StatsInsights from './parts/statsInsights';
import StatsMusicPage from './parts/statsMusic';
import StatsRealtimeCard from './parts/statsRealtime';
import StatsRequestersCard from './parts/statsRequesters';
import StatsServersCard from './parts/statsServers';

const StatsComponent: React.FC = async () => {
	const stats = await getStatsBundle({ songs: 20, requesters: 10, playtime: 10, servers: 10 });

	return (
		<div className="py-2 md:px-8">
			<FeatureCards />
			<StatsRealtimeCard initialData={stats.realtime} />
			<StatsInsights
				overview={stats.overview}
				playtime={stats.playtime}
				topRequester={stats.requesters?.requesters?.[0] ?? null}
			/>
			<StatsMusicPage songs={stats.songs} />
			<StatsRequestersCard requesters={stats.requesters} />
			<StatsServersCard servers={stats.servers} />
		</div>
	);
};

export default StatsComponent;
