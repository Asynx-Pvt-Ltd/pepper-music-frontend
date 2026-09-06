import { FeedbackCategory, HealthAPIStatus } from '@/enums';

export interface MenuItemType {
	name: string;
	value: string;
}

export interface FeaturesType extends MenuItemType {
	imgSrc: string;
}

export interface CommandOption {
	type: number;
	name: string;
	description: string;
	required?: boolean;
	options?: CommandOption[];
	autocomplete?: boolean;
	min_value?: number;
	max_value?: number;
}

export interface BotCommand {
	name: string;
	description: string;
	type: string;
	cooldown: number;
	ownerOnly: boolean;
	premiumOnly: boolean;
	guildOnly: boolean;
	options: CommandOption[];
}

export interface CommandsData {
	status: string;
	timestamp: string;
	count: number;
	data: {
		slash: BotCommand[];
		message: BotCommand[];
	};
}

export interface HealthAPIData {
	status: HealthAPIStatus.SUCCESS;
	timestamp: Date;
	uptime: number;
	system: {
		platform: 'linux';
		cpuLoad: number;
		memoryUsage: number;
		nodeVersion: string;
	};
}

export interface BaseTrackData {
	title: string;
	author: string;
	sourceName: string;
	uri: string;
	played_number: number;
	timestamp: Date;
	artworkUrl: string;
}

export interface GuildCommandHistoryData {
	status: string;
	timestamp: Date;
	pagination: {
		page: number;
		pageSize: number;
		total: number;
		totalPages: number;
	};
	data: BaseTrackData[];
}

export interface ErrorComponentProps {
	title?: string;
	message?: string;
	retryAction?: () => void;
	customAction?: {
		label: string;
		onClick: () => void;
	};
}

/**
 * Stats API — mirrors `GET /api/v1/stats/*` on the bot (see Pepper-Bot
 * `src/core/api/music/stats/index.ts`). Every endpoint answers with a
 * `StatsEnvelope`; dates are serialised as ISO strings over the wire.
 */
export interface StatsEnvelope<T> {
	success: boolean;
	cached: boolean;
	generatedAt: string;
	data: T;
}

export interface StatsSongUser {
	id: string;
	username: string;
	discriminator: string;
	avatar?: string;
}

/** `GET /stats/songs` → `topSongs[]` */
export interface StatsSong {
	track: string;
	artworkUrl: string;
	sourceName: string;
	title: string;
	identifier: string;
	author: string;
	duration: number;
	isrc: string;
	isSeekable: boolean;
	isStream: boolean;
	uri: string;
	thumbnail: string | null;
	requester?: StatsSongUser | null;
	played_number: number;
	timestamp: string;
}

/** `GET /stats/overview` */
export interface StatsOverview {
	uniqueSongs: number;
	totalPlays: number;
	uniqueArtists: number;
	estimatedPlaytimeMs: number;
	activeGuilds: number;
	trackedListeners: number;
	songsLastPlayed24h: number;
	songsLastPlayed7d: number;
	lastPlayedAt: string | null;
}

/** `GET /stats/songs` */
export interface StatsSongs {
	uniqueSongs: number;
	totalPlays: number;
	limit: number;
	topSongs: StatsSong[];
}

export interface StatsTopRequester {
	rank: number;
	userId: string;
	username: string | null;
	avatar: string | null;
	totalPlays: number;
	uniqueSongs: number;
	uniqueArtists: number;
	estimatedPlaytimeMs: number;
	lastPlayedAt: string | null;
}

/** `GET /stats/requesters` */
export interface StatsRequesters {
	limit: number;
	requesters: StatsTopRequester[];
}

export interface StatsServerPlaytime {
	guildId: string;
	guildName: string | null;
	estimatedPlaytimeMs: number;
	totalPlays: number;
	uniqueSongs: number;
}

/** `GET /stats/playtime` */
export interface StatsPlaytime {
	estimatedPlaytimeMs: number;
	totalPlays: number;
	trackedGuilds: number;
	limit: number;
	servers: StatsServerPlaytime[];
}

export interface StatsServerTopSong {
	title: string;
	author: string;
	uri: string;
	artworkUrl: string | null;
	plays: number;
}

/** `GET /stats/servers/:guildId` */
export interface StatsServerInsight {
	guildId: string;
	guildName: string | null;
	guildIcon: string | null;
	memberCount: number | null;
	totalPlays: number;
	uniqueSongs: number;
	uniqueArtists: number;
	estimatedPlaytimeMs: number;
	averagePlaysPerSong: number;
	sources: string[];
	topSong: StatsServerTopSong | null;
	lastPlayedAt: string | null;
	live: boolean;
}

/** `GET /stats/servers` */
export interface StatsServers {
	limit: number;
	servers: StatsServerInsight[];
}

export interface StatsRealtimeTrack {
	guildId: string;
	guildName: string | null;
	voiceChannelId: string | null;
	listeners: number;
	playing: boolean;
	paused: boolean;
	position: number;
	queueSize: number;
	title: string;
	author: string;
	uri: string;
	duration: number;
	artworkUrl: string | null;
	sourceName: string;
	requester: StatsSongUser | null;
	shardId: number;
}

/** `GET /stats/realtime` */
export interface StatsRealtime {
	players: number;
	playing: number;
	paused: number;
	idle: number;
	listeners: number;
	guilds: number;
	members: number;
	channels: number;
	shards: number;
	uptime: number;
	nowPlaying: StatsRealtimeTrack[];
}

/**
 * Every stats endpoint fetched in one pass. Sections resolve independently so a
 * single failing endpoint degrades that card instead of the whole page.
 */
export interface StatsBundle {
	generatedAt: string;
	realtime: StatsRealtime | null;
	overview: StatsOverview | null;
	songs: StatsSongs | null;
	requesters: StatsRequesters | null;
	playtime: StatsPlaytime | null;
	servers: StatsServers | null;
}

export interface FeatureCardProps {
	readonly icon: React.ReactNode;
	readonly title: string;
	readonly description: string;
}

/**
 * Feedback form — what the browser POSTs to `/api/feedback`. The route
 * re-validates every field before anything reaches the Discord webhook.
 */
export interface FeedbackSubmission {
	rating: number;
	category: FeedbackCategory;
	message: string;
	/** Optional, so we can credit the reporter in release notes. */
	discordUsername?: string;
	/** Honeypot — hidden from real users, filled in by most bots. */
	website?: string;
}

export interface FeedbackResponse {
	success: boolean;
	message: string;
}

export interface FeedbackCategoryOption {
	value: FeedbackCategory;
	label: string;
	hint: string;
}
