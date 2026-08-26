import React from 'react';
import {
	FaClock,
	FaCrown,
	FaDiscord,
	FaFire,
	FaHourglassHalf,
	FaMusic,
	FaPlay,
	FaServer,
	FaUserAlt,
	FaUsers,
} from 'react-icons/fa';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { MusicQuotes } from '@/constants';
import { StatsOverview, StatsPlaytime, StatsTopRequester } from '@/types';
import {
	formatDurationParts,
	formatNumber,
	formatRelativeTime,
	formatTime,
} from '@/utils/format';

import { ErrorComponent } from '../../errorComponent';
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

const pickRandomQuote = () => parsedQuotes[Math.floor(Math.random() * parsedQuotes.length)];

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
	const playtimeMs = playtime?.estimatedPlaytimeMs ?? overview.estimatedPlaytimeMs;
	const playtimeYears = playtimeMs / (1000 * 60 * 60 * 24 * 365);
	const averageSongMs = overview.totalPlays > 0 ? playtimeMs / overview.totalPlays : 0;

	return (
		<div className="w-full mx-auto p-6 space-y-8">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700">
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl font-bold">Hot Info 🔥</CardTitle>
					<CardDescription className="text-zinc-400">
						Last track played {formatRelativeTime(overview.lastPlayedAt)}.
					</CardDescription>
				</CardHeader>

				{topRequester && (
					<CardContent className="space-y-4 text-zinc-200 p-4 bg-amber-100/10">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<div className="flex items-center space-x-2">
								<FaCrown className="text-yellow-400 text-2xl" />
								<h2 className="text-lg font-semibold text-yellow-200">
									Most Active Requester
								</h2>
							</div>
							<div className="flex items-center space-x-2">
								<FaDiscord className="text-2xl text-indigo-400" />
								<a
									href={`https://discord.com/users/${topRequester.userId}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-lg font-mono text-yellow-100 hover:underline"
								>
									{topRequester.username ?? topRequester.userId}
								</a>
								<span className="text-lg font-mono text-yellow-100">
									({formatNumber(topRequester.totalPlays)} plays)
								</span>
							</div>
						</div>
						<p className="text-sm text-zinc-400">
							{formatNumber(topRequester.uniqueSongs)} unique songs across{' '}
							{formatNumber(topRequester.uniqueArtists)} artists — last request{' '}
							{formatRelativeTime(topRequester.lastPlayedAt)}.
						</p>
					</CardContent>
				)}

				<CardHeader>
					<CardTitle className="text-2xl font-bold text-zinc-100">
						<div className="flex items-center space-x-3">
							<FaClock className="text-zinc-400 text-2xl" />
							<h3 className="text-lg font-semibold text-zinc-200">
								Total Playtime Breakdown
							</h3>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex flex-wrap gap-2">
						{formatDurationParts(playtimeMs).map((part) => (
							<span
								key={part}
								className="flex items-center space-x-1 bg-teal-700/30 text-teal-100 px-3 py-1 rounded-full text-sm font-medium"
							>
								<FaHourglassHalf className="text-xs" />
								<span>{part}</span>
							</span>
						))}
					</div>
					<div className="mt-2 p-3 bg-teal-800/20 rounded-lg">
						<p className="text-sm text-teal-200">
							That&apos;s over{' '}
							<span className="font-semibold text-white">
								{playtimeYears >= 1
									? `${Math.floor(playtimeYears)} years`
									: `${Math.floor(playtimeMs / (1000 * 60 * 60 * 24))} days`}
							</span>{' '}
							of music enjoyed across{' '}
							<span className="font-semibold text-white">
								{formatNumber(playtime?.trackedGuilds ?? overview.activeGuilds)}
							</span>{' '}
							servers.
						</p>
					</div>
				</CardContent>

				<CardContent className="border-t border-zinc-800 pt-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<StatTile
							icon={<FaMusic />}
							label="Unique Songs"
							value={formatNumber(overview.uniqueSongs)}
							accent="text-blue-300"
						/>
						<StatTile
							icon={<FaPlay />}
							label="Total Plays"
							value={formatNumber(overview.totalPlays)}
							accent="text-green-300"
						/>
						<StatTile
							icon={<FaUserAlt />}
							label="Unique Artists"
							value={formatNumber(overview.uniqueArtists)}
							accent="text-yellow-300"
						/>
						<StatTile
							icon={<FaServer />}
							label="Active Servers"
							value={formatNumber(overview.activeGuilds)}
							accent="text-purple-300"
						/>
						<StatTile
							icon={<FaUsers />}
							label="Tracked Listeners"
							value={formatNumber(overview.trackedListeners)}
							accent="text-pink-300"
						/>
						<StatTile
							icon={<FaHourglassHalf />}
							label="Avg. Song Length"
							value={formatTime(averageSongMs)}
							accent="text-teal-300"
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
						<StatTile
							icon={<FaFire />}
							label="Songs Played (24h)"
							value={formatNumber(overview.songsLastPlayed24h)}
							hint="Unique tracks touched in the last day"
							accent="text-orange-300"
						/>
						<StatTile
							icon={<FaFire />}
							label="Songs Played (7d)"
							value={formatNumber(overview.songsLastPlayed7d)}
							hint="Unique tracks touched in the last week"
							accent="text-red-300"
						/>
					</div>
				</CardContent>

				<CardFooter className="border-t border-zinc-800 pt-4">
					<div className="text-xs text-zinc-500">
						<p>
							{quote.quote} -{' '}
							<span className="font-semibold text-zinc-300">{quote.author}</span>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default StatsInsights;
