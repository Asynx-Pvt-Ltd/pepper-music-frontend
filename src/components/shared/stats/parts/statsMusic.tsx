import React from 'react';
import Image from 'next/image';
import { Disc3 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StatsSongs } from '@/types';
import { formatNumber, formatRelativeTime, formatSourceName, formatTime } from '@/utils/format';

interface StatsMusicPageProps {
	songs: StatsSongs | null;
}

const rankStyles = ['text-yellow-400', 'text-zinc-300', 'text-amber-600'];

const StatsMusicPage: React.FC<StatsMusicPageProps> = ({ songs }) => {
	if (!songs?.topSongs?.length) {
		return (
			<div className="w-full mx-auto p-6">
				<Card className="w-full bg-black text-white border border-zinc-800">
					<CardContent className="text-center text-zinc-400">
						No music data available yet.
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="w-full mx-auto p-6 space-y-8 bg-black">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700">
				<CardHeader>
					<div className="flex flex-wrap items-center justify-between gap-2">
						<CardTitle>Global Top Songs</CardTitle>
						<Badge variant="outline" className="border-zinc-700 text-zinc-400">
							Top {songs.topSongs.length} of {formatNumber(songs.uniqueSongs)}
						</Badge>
					</div>
					<CardDescription className="text-zinc-400">
						The most played tracks across every server Pepper is in —{' '}
						{formatNumber(songs.totalPlays)} plays counted.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-96">
						<div className="space-y-2 pr-3">
							{songs.topSongs.map((song, index) => {
								const artwork = song.artworkUrl || song.thumbnail;
								return (
									<div
										key={song.uri || song.identifier}
										className="flex items-center p-2 rounded-md hover:bg-zinc-900 transition"
									>
										<span
											className={`w-7 shrink-0 text-center font-mono text-sm ${
												rankStyles[index] ?? 'text-zinc-600'
											}`}
										>
											{index + 1}
										</span>
										<div className="h-11 w-11 shrink-0 rounded overflow-hidden mx-3 relative bg-zinc-800">
											{artwork ? (
												<Image src={artwork} alt={song.title} fill className="object-cover" />
											) : (
												<Disc3 className="h-5 w-5 text-zinc-600 absolute inset-0 m-auto" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between gap-3">
												<a
													href={song.uri}
													target="_blank"
													rel="noopener noreferrer"
													className="font-medium text-white hover:text-zinc-400 transition-colors truncate"
												>
													{song.title}
												</a>
												<span className="text-sm text-zinc-400 shrink-0">
													{formatNumber(song.played_number)} plays
												</span>
											</div>
											<div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-sm text-zinc-500">
												<span className="truncate max-w-[14rem]">{song.author}</span>
												<span>•</span>
												<span>{formatTime(song.duration)}</span>
												<span>•</span>
												<span>{formatSourceName(song.sourceName)}</span>
												<span>•</span>
												<span>{formatRelativeTime(song.timestamp)}</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatsMusicPage;
