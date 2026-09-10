import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { ListMusic } from 'lucide-react';

export const RecentTracksLoadingSkeleton: React.FC = () => {
	return (
		<Card className="bg-background border-border text-foreground">
			<CardHeader>
				<CardTitle className="flex items-center">
					<ListMusic className="w-5 h-5 mr-2" />
					Recent Tracks
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Recently played music in your server
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="flex items-center space-x-4 animate-pulse"
						>
							<div className="h-10 w-10 bg-muted rounded-md"></div>
							<div className="space-y-2 flex-1">
								<div className="h-4 bg-muted rounded w-3/4"></div>
								<div className="h-3 bg-muted rounded w-1/2"></div>
							</div>
							<div className="h-4 bg-muted rounded w-16"></div>
						</div>
					))}
				</div>
				<div className="h-10 bg-muted rounded w-full mt-4"></div>
			</CardContent>
		</Card>
	);
};

export default RecentTracksLoadingSkeleton;
