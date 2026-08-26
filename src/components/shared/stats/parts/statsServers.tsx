import React from 'react';
import { Radio, Server, Users } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StatsServers } from '@/types';
import {
	formatDuration,
	formatNumber,
	formatRelativeTime,
	formatSourceName,
} from '@/utils/format';

interface StatsServersProps {
	servers: StatsServers | null;
}

const StatsServersCard: React.FC<StatsServersProps> = ({ servers }) => {
	if (!servers?.servers?.length) return null;

	return (
		<div className="w-full mx-auto p-6 space-y-8 bg-black">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Server className="h-5 w-5 text-purple-400" />
						Server Insights
					</CardTitle>
					<CardDescription className="text-zinc-400">
						The busiest communities on Pepper, ranked by total plays.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-96">
						<div className="space-y-3 pr-3">
							{servers.servers.map((server, index) => (
								<div
									key={server.guildId}
									className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 transition"
								>
									<div className="flex items-start gap-3">
										<span className="w-6 shrink-0 text-center font-mono text-sm text-zinc-600 pt-2">
											{index + 1}
										</span>
										<Avatar className="size-10 border border-zinc-800">
											{server.guildIcon && (
												<AvatarImage
													src={server.guildIcon}
													alt={server.guildName ?? server.guildId}
												/>
											)}
											<AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
												{(server.guildName ?? 'S').slice(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>

										<div className="flex-1 min-w-0">
											<div className="flex flex-wrap items-center gap-2">
												<span className="font-medium text-white truncate">
													{server.guildName ?? `Guild ${server.guildId}`}
												</span>
												{server.live && (
													<Badge
														variant="outline"
														className="border-emerald-500/40 text-emerald-300"
													>
														<Radio className="h-3 w-3" /> Live
													</Badge>
												)}
												{server.memberCount !== null && (
													<span className="flex items-center gap-1 text-xs text-zinc-500">
														<Users className="h-3 w-3" />
														{formatNumber(server.memberCount)}
													</span>
												)}
											</div>

											<div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-zinc-500">
												<span className="text-zinc-300">
													{formatNumber(server.totalPlays)} plays
												</span>
												<span>•</span>
												<span>
													{formatNumber(server.uniqueSongs)} songs
												</span>
												<span>•</span>
												<span>
													{formatNumber(server.uniqueArtists)} artists
												</span>
												<span>•</span>
												<span>
													{formatDuration(server.estimatedPlaytimeMs)}
												</span>
												<span>•</span>
												<span>
													{server.averagePlaysPerSong.toFixed(1)} avg
													plays/song
												</span>
												<span>•</span>
												<span>
													{formatRelativeTime(server.lastPlayedAt)}
												</span>
											</div>

											{server.sources.length > 0 && (
												<div className="flex flex-wrap gap-1 mt-2">
													{server.sources.map((source) => (
														<Badge
															key={source}
															variant="outline"
															className="border-zinc-700 text-zinc-400"
														>
															{formatSourceName(source)}
														</Badge>
													))}
												</div>
											)}

											{server.topSong && (
												<p className="mt-2 text-xs text-zinc-500 truncate">
													Top track:{' '}
													<a
														href={server.topSong.uri}
														target="_blank"
														rel="noopener noreferrer"
														className="text-zinc-300 hover:underline"
													>
														{server.topSong.title}
													</a>{' '}
													by {server.topSong.author} (
													{formatNumber(server.topSong.plays)} plays)
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatsServersCard;
