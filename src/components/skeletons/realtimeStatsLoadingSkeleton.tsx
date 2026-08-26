import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Disc3, Radio } from 'lucide-react';

const RealtimeStatsLoadingSkeleton = () => {
	return (
		<div className="w-full mx-auto p-6 space-y-6">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700 animate-pulse">
				<CardHeader>
					<CardTitle className="text-2xl font-bold flex items-center gap-2">
						<Radio className="h-5 w-5 text-zinc-600" />
						<div className="h-6 w-40 bg-zinc-800 rounded" />
					</CardTitle>
					<div className="h-4 w-64 bg-zinc-800 rounded" />
				</CardHeader>

				<CardContent>
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
						{Array.from({ length: 6 }).map((_, idx) => (
							<Card
								key={idx}
								className="bg-zinc-900/60 border-zinc-800 text-white py-4 gap-2"
							>
								<CardContent className="px-4">
									<div className="h-4 w-20 bg-zinc-800 rounded mb-3" />
									<div className="h-6 w-16 bg-zinc-800 rounded" />
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>

				<CardContent>
					<ScrollArea className="h-64">
						<div className="space-y-2">
							{Array.from({ length: 4 }).map((_, idx) => (
								<div key={idx} className="flex items-start gap-3 p-3 rounded-md">
									<div className="h-12 w-12 shrink-0 rounded bg-zinc-800 flex items-center justify-center">
										<Disc3 className="h-5 w-5 text-zinc-700" />
									</div>
									<div className="flex-1 space-y-2">
										<div className="h-4 w-48 max-w-[60%] bg-zinc-800 rounded" />
										<div className="h-3 w-32 bg-zinc-800 rounded" />
										<div className="h-1 w-full bg-zinc-800 rounded" />
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

export default RealtimeStatsLoadingSkeleton;
