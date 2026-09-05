/**
 * Formats milliseconds into a time string in the format "m:ss"
 */
export const formatTime = (milliseconds: number): string => {
	if (!milliseconds && milliseconds !== 0) return '0:00';

	const seconds = milliseconds / 1000;
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);

	return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MS = {
	year: 1000 * 60 * 60 * 24 * 365,
	day: 1000 * 60 * 60 * 24,
	hour: 1000 * 60 * 60,
	minute: 1000 * 60,
} as const;

/**
 * Breaks a duration into its largest units, e.g. "2 years, 41 days, 7 hours".
 * Used for the playtime totals the stats API reports in milliseconds.
 */
export const formatDurationParts = (milliseconds: number): string[] => {
	if (!Number.isFinite(milliseconds) || milliseconds <= 0) return ['0 minutes'];

	const parts: string[] = [];
	let remaining = Math.floor(milliseconds);

	for (const unit of ['year', 'day', 'hour', 'minute'] as const) {
		const value = Math.floor(remaining / MS[unit]);
		remaining -= value * MS[unit];
		if (value > 0) parts.push(`${value} ${unit}${value === 1 ? '' : 's'}`);
	}

	return parts.length ? parts : ['less than a minute'];
};

/**
 * Compact duration for inline use, e.g. "2y 41d" or "7h 12m".
 */
export const formatDuration = (milliseconds: number, maxParts: number = 2): string =>
	formatDurationParts(milliseconds).slice(0, maxParts).join(', ');

/**
 * Thousands separators for the large play counts the overview endpoint returns.
 */
export const formatNumber = (value: number | null | undefined): string => {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
	return value.toLocaleString('en-US');
};

/**
 * Shortens big counts for stat tiles, e.g. 12400 -> "12.4K".
 */
export const formatCompactNumber = (value: number | null | undefined): string => {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
	return new Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(value);
};

/**
 * "3 hours ago" style label for the ISO timestamps the stats API serialises.
 */
export const formatRelativeTime = (value: string | Date | null | undefined): string => {
	if (!value) return 'never';

	const timestamp = value instanceof Date ? value.getTime() : Date.parse(value);
	if (!Number.isFinite(timestamp)) return 'unknown';

	const diff = Date.now() - timestamp;
	if (diff < MS.minute) return 'just now';

	const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	for (const unit of ['year', 'day', 'hour', 'minute'] as const) {
		const amount = Math.floor(diff / MS[unit]);
		if (amount >= 1) return formatter.format(-amount, unit);
	}
	return 'just now';
};

/**
 * Turns a Lavalink source name ("youtube", "spotify") into a display label.
 */
export const formatSourceName = (source: string | null | undefined): string => {
	if (!source) return 'Unknown';
	const labels: Record<string, string> = {
		spotify: 'Spotify',
		soundcloud: 'SoundCloud',
		applemusic: 'Apple Music',
		deezer: 'Deezer',
		jiosaavn: 'JioSaavn',
		http: 'Direct',
	};
	const key = source.toLowerCase().replace(/[\s_-]/g, '');
	return labels[key] ?? source.charAt(0).toUpperCase() + source.slice(1);
};

/**
 * Uptime in milliseconds -> "4d 6h 12m".
 */
export const formatUptime = (milliseconds: number): string => {
	if (!Number.isFinite(milliseconds) || milliseconds <= 0) return '0m';

	const days = Math.floor(milliseconds / MS.day);
	const hours = Math.floor((milliseconds % MS.day) / MS.hour);
	const minutes = Math.floor((milliseconds % MS.hour) / MS.minute);

	return [days ? `${days}d` : '', hours ? `${hours}h` : '', `${minutes}m`]
		.filter(Boolean)
		.join(' ');
};

/**
 * Longest a single track can plausibly be. Live streams are stored with a
 * duration of `Long.MAX_VALUE`, so any total that implies an average track
 * longer than this is poisoned by them rather than real listening time.
 */
export const MAX_PLAUSIBLE_TRACK_MS = 24 * 60 * 60 * 1000;

/**
 * Guards the `estimatedPlaytimeMs` totals the stats API reports. The bot sums
 * `duration × plays` across every track, including live streams whose duration
 * is `Long.MAX_VALUE` — a handful of those makes the total meaningless. When
 * that happens we decline to render a number rather than show a wrong one.
 */
export const isPlausiblePlaytime = (
	playtimeMs: number | null | undefined,
	totalPlays: number | null | undefined
): boolean => {
	if (typeof playtimeMs !== 'number' || !Number.isFinite(playtimeMs)) return false;
	if (playtimeMs < 0) return false;
	if (!totalPlays || totalPlays <= 0) return playtimeMs === 0;
	return playtimeMs / totalPlays <= MAX_PLAUSIBLE_TRACK_MS;
};
