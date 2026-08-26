import {
	StatsBundle,
	StatsEnvelope,
	StatsOverview,
	StatsPlaytime,
	StatsRealtime,
	StatsRequesters,
	StatsServerInsight,
	StatsServers,
	StatsSongs,
} from '@/types';

/**
 * Server-side client for the bot's stats API (`/api/v1/stats/*`).
 * Never import this from a client component — it reads STATS_API_KEY.
 */

const DEFAULT_LIMIT = 10;
const REVALIDATE_SECONDS = 60; // matches the bot's 60s stats cache

/**
 * BACKEND_API_ENDPOINT may be given as the bare origin
 * (`http://pepper-bot:3000`) or already versioned (`.../api/v1`).
 */
const resolveBaseUrl = (): string => {
	const raw = process.env.BACKEND_API_ENDPOINT?.trim();
	if (!raw) throw new Error('BACKEND_API_ENDPOINT is not configured');
	const base = raw.replace(/\/+$/, '');
	return /\/api\/v\d+$/.test(base) ? base : `${base}/api/v1`;
};

const buildUrl = (path: string, params?: Record<string, string | number>): string => {
	const url = new URL(`${resolveBaseUrl()}/stats${path}`);
	for (const [key, value] of Object.entries(params ?? {})) {
		url.searchParams.set(key, String(value));
	}
	return url.toString();
};

interface StatsFetchOptions {
	params?: Record<string, string | number>;
	/** Pass 0 to bypass the cache entirely (used for realtime). */
	revalidate?: number;
}

export const fetchStats = async <T>(path: string, options: StatsFetchOptions = {}): Promise<T> => {
	const apiKey = process.env.STATS_API_KEY?.trim();
	if (!apiKey) throw new Error('STATS_API_KEY is not configured');

	const { params, revalidate = REVALIDATE_SECONDS } = options;
	const response = await fetch(buildUrl(path, params), {
		headers: { 'x-api-key': apiKey },
		...(revalidate > 0 ? { next: { revalidate } } : { cache: 'no-store' }),
	});

	if (!response.ok) {
		throw new Error(`Stats endpoint ${path} responded with ${response.status}`);
	}

	const payload = (await response.json()) as StatsEnvelope<T> & { error?: string };
	if (!payload.success) {
		throw new Error(payload.error ?? `Stats endpoint ${path} returned an unsuccessful response`);
	}
	return payload.data;
};

export const getRealtime = (): Promise<StatsRealtime> =>
	fetchStats<StatsRealtime>('/realtime', { revalidate: 0 });

export const getOverview = (): Promise<StatsOverview> => fetchStats<StatsOverview>('/overview');

export const getSongs = (limit: number = DEFAULT_LIMIT): Promise<StatsSongs> =>
	fetchStats<StatsSongs>('/songs', { params: { limit } });

export const getRequesters = (limit: number = DEFAULT_LIMIT): Promise<StatsRequesters> =>
	fetchStats<StatsRequesters>('/requesters', { params: { limit } });

export const getPlaytime = (limit: number = DEFAULT_LIMIT): Promise<StatsPlaytime> =>
	fetchStats<StatsPlaytime>('/playtime', { params: { limit } });

export const getServers = (limit: number = DEFAULT_LIMIT): Promise<StatsServers> =>
	fetchStats<StatsServers>('/servers', { params: { limit } });

export const getServer = (guildId: string): Promise<StatsServerInsight> =>
	fetchStats<StatsServerInsight>(`/servers/${encodeURIComponent(guildId)}`);

const settled = <T>(result: PromiseSettledResult<T>, label: string): T | null => {
	if (result.status === 'fulfilled') return result.value;
	console.error(`[stats] ${label} failed:`, result.reason);
	return null;
};

export interface StatsBundleOptions {
	songs?: number;
	requesters?: number;
	playtime?: number;
	servers?: number;
}

/**
 * Fans out to every stats endpoint at once. A section that fails resolves to
 * null so the rest of the page still renders.
 */
export const getStatsBundle = async (options: StatsBundleOptions = {}): Promise<StatsBundle> => {
	const [realtime, overview, songs, requesters, playtime, servers] = await Promise.allSettled([
		getRealtime(),
		getOverview(),
		getSongs(options.songs ?? 20),
		getRequesters(options.requesters ?? 10),
		getPlaytime(options.playtime ?? 10),
		getServers(options.servers ?? 10),
	]);

	return {
		generatedAt: new Date().toISOString(),
		realtime: settled(realtime, 'realtime'),
		overview: settled(overview, 'overview'),
		songs: settled(songs, 'songs'),
		requesters: settled(requesters, 'requesters'),
		playtime: settled(playtime, 'playtime'),
		servers: settled(servers, 'servers'),
	};
};
