import React from 'react';
import { Crown, UserRound } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StatsRequesters } from '@/types';
import { formatDuration, formatNumber, formatRelativeTime } from '@/utils/format';

interface StatsRequestersProps {
	requesters: StatsRequesters | null;
}

const rankStyles = ['text-yellow-400', 'text-zinc-300', 'text-amber-600'];

const StatsRequestersCard: React.FC<StatsRequestersProps> = ({ requesters }) => {
	if (!requesters?.requesters?.length) return null;

	return (
		<div className="w-full mx-auto p-6 space-y-8 bg-black">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Crown className="h-5 w-5 text-yellow-400" />
						Top Requesters
					</CardTitle>
					<CardDescription className="text-zinc-400">
						The listeners keeping the queue alive across every server.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-80">
						<div className="space-y-2 pr-3">
							{requesters.requesters.map((requester) => (
								<div
									key={requester.userId}
									className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-900 transition"
								>
									<span
										className={`w-7 shrink-0 text-center font-mono text-sm ${
											rankStyles[requester.rank - 1] ?? 'text-zinc-600'
										}`}
									>
										{requester.rank}
									</span>
									<Avatar className="size-10 border border-zinc-800">
										{requester.avatar && (
											<AvatarImage
												src={requester.avatar}
												alt={requester.username ?? requester.userId}
											/>
										)}
										<AvatarFallback className="bg-zinc-800 text-zinc-400">
											<UserRound className="h-4 w-4" />
										</AvatarFallback>
									</Avatar>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between gap-3">
											<a
												href={`https://discord.com/users/${requester.userId}`}
												target="_blank"
												rel="noopener noreferrer"
												className="font-medium text-white hover:text-zinc-400 transition-colors truncate"
											>
												{requester.username ?? requester.userId}
											</a>
											<span className="text-sm text-zinc-400 shrink-0">
												{formatNumber(requester.totalPlays)} plays
											</span>
										</div>
										<div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-zinc-500">
											<span>
												{formatNumber(requester.uniqueSongs)} songs
											</span>
											<span>•</span>
											<span>
												{formatNumber(requester.uniqueArtists)} artists
											</span>
											<span>•</span>
											<span>
												{formatDuration(requester.estimatedPlaytimeMs)}{' '}
												listened
											</span>
											<span>•</span>
											<span>
												{formatRelativeTime(requester.lastPlayedAt)}
											</span>
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

export default StatsRequestersCard;
