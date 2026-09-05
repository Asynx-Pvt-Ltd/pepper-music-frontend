import React from 'react';
import { UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsRequesters } from '@/types';
import {
	formatDuration,
	formatNumber,
	formatRelativeTime,
} from '@/utils/format';

import { Rank, StatsSection } from './section';

interface StatsRequestersProps {
	requesters: StatsRequesters | null;
}

const StatsRequestersCard: React.FC<StatsRequestersProps> = ({
	requesters,
}) => {
	if (!requesters?.requesters?.length) return null;

	return (
		<StatsSection
			id="requesters"
			label="Leaderboard"
			title="Top requesters"
			description="The listeners keeping the queue alive across every server."
		>
			<div className="overflow-hidden rounded-xl border border-white/10">
				<div className="divide-y divide-white/[0.07]">
					{requesters.requesters.map((requester) => (
						<div
							key={requester.userId}
							className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
						>
							<Rank position={requester.rank} />

							<Avatar className="size-10 border border-white/10">
								{requester.avatar && (
									<AvatarImage
										src={requester.avatar}
										alt={requester.username ?? requester.userId}
									/>
								)}
								<AvatarFallback className="bg-white/[0.06] text-gray-400">
									<UserRound className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>

							<div className="min-w-0 flex-1">
								<div className="flex items-center justify-between gap-3">
									<a
										href={`https://discord.com/users/${requester.userId}`}
										target="_blank"
										rel="noopener noreferrer"
										className="truncate font-medium text-white transition-colors hover:text-gray-400"
									>
										{requester.username ?? requester.userId}
									</a>
									<span className="shrink-0 font-mono text-sm tabular-nums text-gray-400">
										{formatNumber(requester.totalPlays)} plays
									</span>
								</div>
								<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-gray-500">
									<span>{formatNumber(requester.uniqueSongs)} songs</span>
									<span aria-hidden>·</span>
									<span>{formatNumber(requester.uniqueArtists)} artists</span>
									<span aria-hidden>·</span>
									<span>
										{formatDuration(requester.estimatedPlaytimeMs)} listened
									</span>
									<span aria-hidden>·</span>
									<span>{formatRelativeTime(requester.lastPlayedAt)}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</StatsSection>
	);
};

export default StatsRequestersCard;
