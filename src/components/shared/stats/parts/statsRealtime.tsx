'use client';

import React from 'react';
import Image from 'next/image';
import {
	Disc3,
	Headphones,
	Radio,
	Server,
	Users,
	Wifi,
	WifiOff,
} from 'lucide-react';

import { StatsRealtime, StatsRealtimeTrack } from '@/types';
import {
	formatCompactNumber,
	formatSourceName,
	formatTime,
	formatUptime,
} from '@/utils/format';

import { EmptyState, StatsSection } from './section';
import { StatTile } from './statTile';

const POLL_INTERVAL_MS = 15_000;
const INITIAL_VISIBLE_TRACKS = 12;

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

const NowPlayingRow: React.FC<{
	track: StatsRealtimeTrack;
	elapsedMs: number;
}> = ({ track, elapsedMs }) => {
	const position = livePosition(track, elapsedMs);
	const percentage = track.duration
		? Math.min((position / track.duration) * 100, 100)
		: 0;

	return (
		<div className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.04]">
			<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-white/[0.06]">
				{track.artworkUrl ? (
					<Image
						src={track.artworkUrl}
						alt={track.title}
						fill
						sizes="48px"
						className="object-cover"
					/>
				) : (
					<Disc3 className="absolute inset-0 m-auto h-5 w-5 text-white/30" />
				)}
			</div>

			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						{track.uri ? (
							<a
								href={track.uri}
								target="_blank"
								rel="noopener noreferrer"
								className="block truncate font-medium text-white transition-colors hover:text-gray-400"
							>
								{track.title}
							</a>
						) : (
							<span className="block truncate font-medium text-white">
								{track.title}
							</span>
						)}
						<p className="truncate text-sm text-gray-500">{track.author}</p>
					</div>

					<div className="flex shrink-0 items-center gap-2">
						<span
							className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
								track.paused
									? 'border-white/15 text-gray-400'
									: 'border-emerald-500/40 text-emerald-300'
							}`}
						>
							{track.paused ? 'Paused' : 'Playing'}
						</span>
						<span className="flex items-center gap-1 text-xs text-gray-500">
							<Headphones className="h-3 w-3" />
							{track.listeners}
						</span>
					</div>
				</div>

				<div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
					<div
						className="h-full rounded-full bg-white/70"
						style={{ width: `${percentage}%` }}
					/>
				</div>

				<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
					<span className="font-mono tabular-nums">
						{formatTime(position)} / {formatTime(track.duration)}
					</span>
					<span aria-hidden>·</span>
					<span>{formatSourceName(track.sourceName)}</span>
					{track.queueSize > 0 && (
						<>
							<span aria-hidden>·</span>
							<span>{track.queueSize} in queue</span>
						</>
					)}
					{track.requester?.username && (
						<>
							<span aria-hidden>·</span>
							<span className="truncate">by {track.requester.username}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export const StatsRealtimeCard: React.FC<StatsRealtimeCardProps> = ({
	initialData,
}) => {
	const [data, setData] = React.useState<StatsRealtime | null>(initialData);
	const [stale, setStale] = React.useState(!initialData);
	const [fetchedAt, setFetchedAt] = React.useState(() => Date.now());
	const [now, setNow] = React.useState(() => Date.now());
	const [expanded, setExpanded] = React.useState(false);

	React.useEffect(() => {
		let cancelled = false;

		const poll = async () => {
			try {
				const response = await fetch('/api/stats/realtime', {
					cache: 'no-store',
				});
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
			<StatsSection
				id="live"
				label="Right now"
				title="Live activity"
				description="A direct read from the bot, refreshed every few seconds."
			>
				<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-10 text-sm text-gray-400">
					<WifiOff className="h-5 w-5 text-gray-500" />
					Live stats are unavailable right now.
				</div>
			</StatsSection>
		);
	}

	const elapsedMs = Math.max(now - fetchedAt, 0);
	const tracks = expanded
		? data.nowPlaying
		: data.nowPlaying.slice(0, INITIAL_VISIBLE_TRACKS);
	const hiddenCount = data.nowPlaying.length - tracks.length;

	return (
		<StatsSection
			id="live"
			label="Right now"
			title="Live activity"
			description={`A direct read from the bot, refreshed every ${
				POLL_INTERVAL_MS / 1000
			} seconds.`}
			action={
				<span
					className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
						stale
							? 'border-white/15 text-gray-400'
							: 'border-emerald-500/40 text-emerald-300'
					}`}
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
				</span>
			}
		>
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
				<StatTile
					icon={<Disc3 className="h-4 w-4" />}
					label="Active players"
					value={String(data.playing)}
					hint={`${data.paused} paused · ${data.idle} idle`}
				/>
				<StatTile
					icon={<Headphones className="h-4 w-4" />}
					label="Listening now"
					value={formatCompactNumber(data.listeners)}
				/>
				<StatTile
					icon={<Server className="h-4 w-4" />}
					label="Servers"
					value={formatCompactNumber(data.guilds)}
				/>
				<StatTile
					icon={<Users className="h-4 w-4" />}
					label="Members reached"
					value={formatCompactNumber(data.members)}
				/>
				<StatTile
					icon={<Radio className="h-4 w-4" />}
					label="Shards"
					value={String(data.shards)}
					hint={`${formatCompactNumber(data.channels)} channels`}
				/>
				<StatTile
					icon={<Wifi className="h-4 w-4" />}
					label="Uptime"
					value={formatUptime(data.uptime)}
				/>
			</div>

			<div className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
						Now playing ({data.nowPlaying.length})
					</h3>
				</div>

				{data.nowPlaying.length === 0 ? (
					<EmptyState message="Nothing is playing at the moment. Start a track and it will show up here." />
				) : (
					<>
						<div className="overflow-hidden rounded-xl border border-white/10">
							<div className="divide-y divide-white/[0.07]">
								{tracks.map((track) => (
									<NowPlayingRow
										key={`${track.guildId}-${track.uri}`}
										track={track}
										elapsedMs={elapsedMs}
									/>
								))}
							</div>
						</div>

						{(hiddenCount > 0 || expanded) && (
							<button
								type="button"
								onClick={() => setExpanded((value) => !value)}
								className="mt-4 w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
							>
								{expanded
									? 'Show fewer'
									: `Show ${hiddenCount} more ${
											hiddenCount === 1 ? 'track' : 'tracks'
										}`}
							</button>
						)}
					</>
				)}
			</div>
		</StatsSection>
	);
};

export default StatsRealtimeCard;
