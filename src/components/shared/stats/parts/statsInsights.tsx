import React from 'react';
import {
	Clock3,
	Crown,
	Flame,
	Hourglass,
	Music,
	Play,
	Server,
	User,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MusicQuotes } from '@/constants';
import { StatsOverview, StatsPlaytime, StatsTopRequester } from '@/types';
import {
	formatDurationParts,
	formatNumber,
	formatRelativeTime,
	formatTime,
	isPlausiblePlaytime,
} from '@/utils/format';

import { ErrorComponent } from '../../errorComponent';
import { StatsSection } from './section';
import { CellGrid } from '@/components/shared/page/parts';
import { StatTile } from './statTile';

interface StatsInsightsProps {
	overview: StatsOverview | null;
	playtime: StatsPlaytime | null;
	topRequester: StatsTopRequester | null;
}

const parsedQuotes = MusicQuotes.map((q) => {
	const [quote, author] = q.split(' – ');
	return { quote, author };
});

const pickRandomQuote = () =>
	parsedQuotes[Math.floor(Math.random() * parsedQuotes.length)];

export const StatsInsights: React.FC<StatsInsightsProps> = ({
	overview,
	playtime,
	topRequester,
}) => {
	if (!overview) {
		return (
			<ErrorComponent
				title="Stats unavailable"
				message="We couldn't reach the bot's stats API. Please try again in a moment."
			/>
		);
	}

	const quote = pickRandomQuote();
	const playtimeMs =
		playtime?.estimatedPlaytimeMs ?? overview.estimatedPlaytimeMs;
	const playtimeYears = playtimeMs / (1000 * 60 * 60 * 24 * 365);
	const playtimeDays = Math.floor(playtimeMs / (1000 * 60 * 60 * 24));
	const headlineSpan =
		playtimeYears >= 1
			? `${Math.floor(playtimeYears)} ${Math.floor(playtimeYears) === 1 ? 'year' : 'years'}`
			: `${playtimeDays} ${playtimeDays === 1 ? 'day' : 'days'}`;
	const averageSongMs =
		overview.totalPlays > 0 ? playtimeMs / overview.totalPlays : 0;
	// Live streams are stored with a Long.MAX_VALUE duration, which poisons the
	// bot's playtime sums. Show nothing rather than a fabricated total.
	const playtimeIsUsable = isPlausiblePlaytime(
		playtimeMs,
		playtime?.totalPlays ?? overview.totalPlays
	);

	return (
		<StatsSection
			id="overview"
			label="All time"
			title="Everything Pepper has played"
			description={`Counted across every server since day one. Last track played ${formatRelativeTime(
				overview.lastPlayedAt
			)}.`}
		>
			<div className="grid gap-4 lg:grid-cols-2">
				{/* Playtime */}
				<div className="rounded-lg border border-border bg-surface p-6">
					<div className="flex items-center gap-2">
						<Clock3 className="h-4 w-4 text-foreground/55" />
						<h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
							Total playtime
						</h3>
					</div>
					{playtimeIsUsable ? (
						<>
							<div className="mt-4 flex flex-wrap gap-2">
								{formatDurationParts(playtimeMs).map((part) => (
									<span
										key={part}
										className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground/80"
									>
										<Hourglass className="h-3 w-3 text-foreground/55" />
										{part}
									</span>
								))}
							</div>
							<p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
								That&apos;s over{' '}
								<span className="font-semibold text-foreground">
									{headlineSpan}
								</span>{' '}
								of music, played across{' '}
								<span className="font-semibold text-foreground">
									{formatNumber(
										playtime?.trackedGuilds ?? overview.activeGuilds
									)}
								</span>{' '}
								servers.
							</p>
						</>
					) : (
						<>
							<p className="mt-4 font-mono text-2xl font-semibold tabular-nums text-foreground/55">
								—
							</p>
							<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
								Playtime totals are unavailable right now. Music played across{' '}
								<span className="font-semibold text-foreground">
									{formatNumber(
										playtime?.trackedGuilds ?? overview.activeGuilds
									)}
								</span>{' '}
								servers.
							</p>
						</>
					)}
				</div>

				{/* Top requester */}
				{topRequester ? (
					<div className="rounded-lg border border-border bg-surface p-6">
						<div className="flex items-center gap-2">
							<Crown className="h-4 w-4 text-foreground/55" />
							<h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
								Most active requester
							</h3>
						</div>

						<div className="mt-4 flex items-center gap-3">
							<Avatar className="size-11 border border-border">
								{topRequester.avatar && (
									<AvatarImage
										src={topRequester.avatar}
										alt={topRequester.username ?? topRequester.userId}
									/>
								)}
								<AvatarFallback className="bg-surface-hover text-muted-foreground">
									<User className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0">
								<a
									href={`https://discord.com/users/${topRequester.userId}`}
									target="_blank"
									rel="noopener noreferrer"
									className="block truncate font-medium text-foreground transition-colors hover:text-muted-foreground"
								>
									{topRequester.username ?? topRequester.userId}
								</a>
								<p className="font-mono text-sm tabular-nums text-muted-foreground/85">
									{formatNumber(topRequester.totalPlays)} plays
								</p>
							</div>
						</div>

						<p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
							{formatNumber(topRequester.uniqueSongs)} unique songs across{' '}
							{formatNumber(topRequester.uniqueArtists)} artists — last request{' '}
							{formatRelativeTime(topRequester.lastPlayedAt)}.
						</p>
					</div>
				) : (
					<div className="rounded-lg border border-border bg-surface p-6 text-sm text-muted-foreground/85">
						No requester data yet.
					</div>
				)}
			</div>

			{/* Tiles */}
			<CellGrid className="mt-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatTile
					icon={<Music className="h-4 w-4" />}
					label="Unique songs"
					value={formatNumber(overview.uniqueSongs)}
				/>
				<StatTile
					icon={<Play className="h-4 w-4" />}
					label="Total plays"
					value={formatNumber(overview.totalPlays)}
				/>
				<StatTile
					icon={<User className="h-4 w-4" />}
					label="Unique artists"
					value={formatNumber(overview.uniqueArtists)}
				/>
				<StatTile
					icon={<Server className="h-4 w-4" />}
					label="Active servers"
					value={formatNumber(overview.activeGuilds)}
				/>
				<StatTile
					icon={<Users className="h-4 w-4" />}
					label="Tracked listeners"
					value={formatNumber(overview.trackedListeners)}
				/>
				<StatTile
					icon={<Hourglass className="h-4 w-4" />}
					label="Avg. song length"
					value={playtimeIsUsable ? formatTime(averageSongMs) : '—'}
				/>
				<StatTile
					icon={<Flame className="h-4 w-4" />}
					label="Songs played (24h)"
					value={formatNumber(overview.songsLastPlayed24h)}
					hint="Unique tracks touched in the last day"
				/>
				<StatTile
					icon={<Flame className="h-4 w-4" />}
					label="Songs played (7d)"
					value={formatNumber(overview.songsLastPlayed7d)}
					hint="Unique tracks touched in the last week"
				/>
			</CellGrid>

			<p className="mt-6 text-center text-[13px] italic text-muted-foreground/70">
				{quote.quote} —{' '}
				<span className="not-italic text-muted-foreground/85">
					{quote.author}
				</span>
			</p>
		</StatsSection>
	);
};

export default StatsInsights;
