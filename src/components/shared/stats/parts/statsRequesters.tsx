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
			<div className="overflow-hidden rounded-xl border border-border">
				<div className="divide-y divide-border">
					{requesters.requesters.map((requester) => (
						<div
							key={requester.userId}
							className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-hover"
						>
							<Rank position={requester.rank} />

							<Avatar className="size-10 border border-border">
								{requester.avatar && (
									<AvatarImage
										src={requester.avatar}
										alt={requester.username ?? requester.userId}
									/>
								)}
								<AvatarFallback className="bg-surface-hover text-muted-foreground">
									<UserRound className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>

							<div className="min-w-0 flex-1">
								<div className="flex items-center justify-between gap-3">
									<a
										href={`https://discord.com/users/${requester.userId}`}
										target="_blank"
										rel="noopener noreferrer"
										className="truncate font-medium text-foreground transition-colors hover:text-muted-foreground"
									>
										{requester.username ?? requester.userId}
									</a>
									<span className="shrink-0 font-mono text-sm tabular-nums text-muted-foreground">
										{formatNumber(requester.totalPlays)} plays
									</span>
								</div>
								<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground/85">
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
