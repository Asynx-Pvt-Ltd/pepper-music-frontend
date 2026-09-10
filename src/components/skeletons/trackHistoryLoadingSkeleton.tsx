import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const TrackHistoryLoadingSkeleton: React.FC = () => {
	return (
		<ScrollArea className="max-h-[400px] mt-4">
			<div className="space-y-4">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
					<div key={item} className="flex items-center space-x-4 animate-pulse">
						<div className="h-10 w-10 bg-muted rounded-md"></div>
						<div className="space-y-2 flex-1">
							<div className="h-4 bg-muted rounded w-3/4"></div>
							<div className="h-3 bg-muted rounded w-1/2"></div>
						</div>
						<div className="h-4 bg-muted rounded w-16"></div>
					</div>
				))}
			</div>
		</ScrollArea>
	);
};

export default TrackHistoryLoadingSkeleton;
