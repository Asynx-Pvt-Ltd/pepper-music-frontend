import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Disc } from 'lucide-react';

const MusicHistoryLoadingSkeleton = () => {
	const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

	return (
        <div className="w-full mx-auto p-6 space-y-8 bg-black">
			<Card className="bg-black border-zinc-800 text-white">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Global Top Songs</CardTitle>
					</div>
					<CardDescription className="text-zinc-400">
						The most played tracks across every server.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-80">
						<div className="space-y-3">
							{skeletonItems.map((item) => (
								<div
									key={item}
									className="flex items-center p-2 rounded-md animate-pulse"
								>
									<div className="h-10 w-10 bg-zinc-800 rounded flex items-center justify-center mr-3">
										<Disc className="h-5 w-5 text-zinc-700" />
									</div>

									<div className="flex-1">
										<div className="flex justify-between items-center">
											<div className="h-4 bg-zinc-800 rounded w-48 max-w-[200px]"></div>
											<div className="h-3 bg-zinc-800 rounded w-12 ml-2"></div>
										</div>
										<div className="flex items-center mt-2">
											<div className="h-3 bg-zinc-800 rounded w-24 max-w-[120px]"></div>
											<div className="ml-2 h-5 bg-zinc-800 rounded w-16"></div>
											{item % 2 === 0 && (
												<div className="ml-2 h-5 bg-zinc-800 rounded w-20"></div>
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

export default MusicHistoryLoadingSkeleton;
