import React from 'react';
import Image from 'next/image';
import { Disc3 } from 'lucide-react';

import { StatsSongs } from '@/types';
import {
	formatNumber,
	formatRelativeTime,
	formatSourceName,
	formatTime,
} from '@/utils/format';

import { EmptyState, Rank, StatsSection } from './section';

interface StatsMusicPageProps {
	songs: StatsSongs | null;
}

const StatsMusicPage: React.FC<StatsMusicPageProps> = ({ songs }) => {
	if (!songs?.topSongs?.length) {
		return (
			<StatsSection
				id="songs"
				label="Leaderboard"
				title="Global top songs"
				description="The most played tracks across every server Pepper is in."
			>
				<EmptyState message="No music data available yet." />
			</StatsSection>
		);
	}

	return (
		<StatsSection
			id="songs"
			label="Leaderboard"
			title="Global top songs"
			description={`The most played tracks across every server Pepper is in — ${formatNumber(
				songs.totalPlays
			)} plays counted.`}
			action={
				<span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
					Top {songs.topSongs.length} of {formatNumber(songs.uniqueSongs)}
				</span>
			}
		>
			<div className="overflow-hidden rounded-xl border border-white/10">
				<div className="divide-y divide-white/[0.07]">
					{songs.topSongs.map((song, index) => {
						const artwork = song.artworkUrl || song.thumbnail;
						return (
							<div
								key={song.uri || song.identifier}
								className="flex items-center px-4 py-3 transition-colors hover:bg-white/[0.04]"
							>
								<Rank position={index + 1} />

								<div className="relative mx-3 h-11 w-11 shrink-0 overflow-hidden rounded bg-white/[0.06]">
									{artwork ? (
										<Image
											src={artwork}
											alt={song.title}
											fill
											sizes="44px"
											className="object-cover"
										/>
									) : (
										<Disc3 className="absolute inset-0 m-auto h-5 w-5 text-white/30" />
									)}
								</div>

								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-3">
										<a
											href={song.uri}
											target="_blank"
											rel="noopener noreferrer"
											className="truncate font-medium text-white transition-colors hover:text-gray-400"
										>
											{song.title}
										</a>
										<span className="shrink-0 font-mono text-sm tabular-nums text-gray-400">
											{formatNumber(song.played_number)} plays
										</span>
									</div>
									<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-gray-500">
										<span className="max-w-[14rem] truncate">{song.author}</span>
										<span aria-hidden>·</span>
										<span>{formatTime(song.duration)}</span>
										<span aria-hidden>·</span>
										<span>{formatSourceName(song.sourceName)}</span>
										<span aria-hidden>·</span>
										<span>{formatRelativeTime(song.timestamp)}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</StatsSection>
	);
};

export default StatsMusicPage;
