'use client';

import React from 'react';
import Image from 'next/image';
import { Disc3, Headphones, Radio, Server, Users, Wifi, WifiOff } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StatsRealtime, StatsRealtimeTrack } from '@/types';
import { formatCompactNumber, formatSourceName, formatTime, formatUptime } from '@/utils/format';

import { StatTile } from './statTile';

const POLL_INTERVAL_MS = 15_000;

interface StatsRealtimeCardProps {
	/** Snapshot rendered on the server; refreshed client-side from /api/stats/realtime. */
	initialData: StatsRealtime | null;
}

/** Position reported by the bot plus the time elapsed since that snapshot. */
const livePosition = (track: StatsRealtimeTrack, elapsedMs: number): number => {
	if (!track.playing || track.paused) return track.position;
	if (!track.duration) return track.position;
	return Math.min(track.position + elapsedMs, track.duration);
};

const NowPlayingRow: React.FC<{ track: StatsRealtimeTrack; elapsedMs: number }> = ({
	track,
	elapsedMs,
}) => {
	const position = livePosition(track, elapsedMs);
	const percentage = track.duration ? Math.min((position / track.duration) * 100, 100) : 0;

	return (
		<div className="flex items-start gap-3 p-3 rounded-md hover:bg-zinc-900 transition">
			<div className="h-12 w-12 shrink-0 rounded overflow-hidden relative bg-zinc-800">
				{track.artworkUrl ? (
					<Image src={track.artworkUrl} alt={track.title} fill className="object-cover" />
				) : (
					<Disc3 className="h-6 w-6 text-zinc-600 absolute inset-0 m-auto" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						{track.uri ? (
							<a
								href={track.uri}
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-white hover:text-zinc-400 transition-colors block truncate"
							>
								{track.title}
							</a>
						) : (
							<span className="font-medium text-white block truncate">
								{track.title}
							</span>
						)}
						<p className="text-sm text-zinc-400 truncate">{track.author}</p>
					</div>
					<div className="flex items-center gap-2 shrink-0">
						<Badge
							variant="outline"
							className={
								track.paused
									? 'border-amber-500/40 text-amber-300'
									: 'border-emerald-500/40 text-emerald-300'
							}
						>
							{track.paused ? 'Paused' : 'Playing'}
						</Badge>
						<span className="flex items-center gap-1 text-xs text-zinc-400">
							<Headphones className="h-3 w-3" />
							{track.listeners}
						</span>
					</div>
				</div>

				<Progress value={percentage} className="mt-2 h-1 bg-zinc-800" />

				<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
					<span className="font-mono">
						{formatTime(position)} / {formatTime(track.duration)}
					</span>
					<span>•</span>
					<span>{formatSourceName(track.sourceName)}</span>
					{track.queueSize > 0 && (
						<>
							<span>•</span>
							<span>
								{track.queueSize} in queue
							</span>
						</>
					)}
					{track.requester?.username && (
						<>
							<span>•</span>
							<span className="truncate">by {track.requester.username}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export const StatsRealtimeCard: React.FC<StatsRealtimeCardProps> = ({ initialData }) => {
	const [data, setData] = React.useState<StatsRealtime | null>(initialData);
	const [stale, setStale] = React.useState(!initialData);
	const [fetchedAt, setFetchedAt] = React.useState(() => Date.now());
	const [now, setNow] = React.useState(() => Date.now());

	React.useEffect(() => {
		let cancelled = false;

		const poll = async () => {
			try {
				const response = await fetch('/api/stats/realtime', { cache: 'no-store' });
				if (!response.ok) throw new Error(`status ${response.status}`);
				const payload = (await response.json()) as StatsRealtime;
				if (cancelled) return;
				setData(payload);
				setFetchedAt(Date.now());
				setStale(false);
			} catch {
				if (!cancelled) setStale(true);
			}
		};

		const interval = setInterval(poll, POLL_INTERVAL_MS);
		return () => {
			cancelled = true;
			clearInterval(interval);
		};
	}, []);

	// Ticks the progress bars forward between polls.
	React.useEffect(() => {
		const tick = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(tick);
	}, []);

	if (!data) {
		return (
			<div className="w-full mx-auto p-6">
				<Card className="w-full bg-black text-white border border-zinc-800">
					<CardContent className="flex items-center gap-3 text-zinc-400">
						<WifiOff className="h-5 w-5 text-red-400" />
						<span>Live stats are unavailable right now.</span>
					</CardContent>
				</Card>
			</div>
		);
	}

	const elapsedMs = Math.max(now - fetchedAt, 0);

	return (
		<div className="w-full mx-auto p-6 space-y-6">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700">
				<CardHeader>
					<div className="flex flex-wrap items-center justify-between gap-2">
						<CardTitle className="text-2xl font-bold flex items-center gap-2">
							<Radio className="h-5 w-5 text-emerald-400" />
							Live Right Now
						</CardTitle>
						<Badge
							variant="outline"
							className={
								stale
									? 'border-amber-500/40 text-amber-300'
									: 'border-emerald-500/40 text-emerald-300'
							}
						>
							{stale ? (
								<>
									<WifiOff className="h-3 w-3" /> Reconnecting
								</>
							) : (
								<>
									<Wifi className="h-3 w-3" /> Live
								</>
							)}
						</Badge>
					</div>
					<CardDescription className="text-zinc-400">
						Refreshed every {POLL_INTERVAL_MS / 1000} seconds straight from the bot.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
						<StatTile
							icon={<Disc3 className="h-5 w-5" />}
							label="Active Players"
							value={String(data.playing)}
							hint={`${data.paused} paused · ${data.idle} idle`}
							accent="text-emerald-400"
						/>
						<StatTile
							icon={<Headphones className="h-5 w-5" />}
							label="Listening Now"
							value={formatCompactNumber(data.listeners)}
							accent="text-blue-400"
						/>
						<StatTile
							icon={<Server className="h-5 w-5" />}
							label="Servers"
							value={formatCompactNumber(data.guilds)}
							accent="text-purple-400"
						/>
						<StatTile
							icon={<Users className="h-5 w-5" />}
							label="Members Reached"
							value={formatCompactNumber(data.members)}
							accent="text-pink-400"
						/>
						<StatTile
							icon={<Radio className="h-5 w-5" />}
							label="Shards"
							value={String(data.shards)}
							hint={`${formatCompactNumber(data.channels)} channels`}
							accent="text-yellow-400"
						/>
						<StatTile
							icon={<Wifi className="h-5 w-5" />}
							label="Uptime"
							value={formatUptime(data.uptime)}
							accent="text-teal-400"
						/>
					</div>
				</CardContent>

				<CardHeader className="pt-2">
					<CardTitle className="text-lg font-semibold text-zinc-200">
						Now Playing ({data.nowPlaying.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{data.nowPlaying.length === 0 ? (
						<p className="text-sm text-zinc-500 py-6 text-center">
							Nothing is playing at the moment. Start a track and it will show up
							here.
						</p>
					) : (
						<ScrollArea className="h-96">
							<div className="space-y-1 pr-3">
								{data.nowPlaying.map((track) => (
									<NowPlayingRow
										key={`${track.guildId}-${track.uri}`}
										track={track}
										elapsedMs={elapsedMs}
									/>
								))}
							</div>
						</ScrollArea>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default StatsRealtimeCard;
