import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	FaClock,
	FaCrown,
	FaFire,
	FaHourglassHalf,
	FaMusic,
	FaPlay,
	FaServer,
	FaUserAlt,
	FaUsers,
} from 'react-icons/fa';

const SkeletonBar = ({ width = 'w-32', height = 'h-4' }: { width?: string; height?: string }) => (
	<div className={`bg-zinc-800 rounded ${width} ${height} animate-pulse`} />
);

const StatBoxSkeleton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
	<Card className="bg-zinc-900/60 border-zinc-800 text-white py-4 gap-2 animate-pulse">
		<CardContent className="px-4">
			<div className="flex items-center gap-2 mb-2">
				<span className="text-lg text-zinc-600">{icon}</span>
				<h3 className="text-sm font-medium text-zinc-500">{label}</h3>
			</div>
			<SkeletonBar width="w-24" height="h-6" />
		</CardContent>
	</Card>
);

const StatsSkeletonComponent = () => {
	return (
		<div className="w-full mx-auto p-6 space-y-8">
			<Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700 animate-pulse">
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl font-bold">
						<SkeletonBar width="w-48" height="h-6" />
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4 text-zinc-200 p-4 bg-amber-100/10">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<FaCrown className="text-yellow-400 text-2xl" />
							<SkeletonBar width="w-32" />
						</div>
						<div className="flex items-center space-x-2">
							<SkeletonBar width="w-24" />
							<SkeletonBar width="w-16" />
						</div>
					</div>
					<SkeletonBar width="w-full" height="h-4" />
				</CardContent>

				<CardHeader>
					<CardTitle className="text-2xl font-bold text-zinc-100">
						<div className="flex items-center space-x-3">
							<FaClock className="text-zinc-400 text-2xl" />
							<SkeletonBar width="w-40" />
						</div>
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3">
					<div className="flex flex-wrap gap-2">
						{Array.from({ length: 4 }).map((_, idx) => (
							<div
								key={idx}
								className="flex items-center space-x-1 bg-teal-700/30 text-teal-100 px-3 py-1 rounded-full text-sm font-medium"
							>
								<FaHourglassHalf className="text-xs" />
								<SkeletonBar width="w-16" height="h-3" />
							</div>
						))}
					</div>
					<div className="mt-2 p-3 bg-teal-800/20 rounded-lg">
						<SkeletonBar width="w-64" />
					</div>
				</CardContent>

				<CardContent className="border-t border-zinc-800 pt-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<StatBoxSkeleton
							icon={<FaMusic className="text-blue-300" />}
							label="Unique Songs"
						/>
						<StatBoxSkeleton
							icon={<FaPlay className="text-green-300" />}
							label="Total Plays"
						/>
						<StatBoxSkeleton
							icon={<FaUserAlt className="text-yellow-300" />}
							label="Unique Artists"
						/>
						<StatBoxSkeleton
							icon={<FaServer className="text-purple-300" />}
							label="Active Servers"
						/>
						<StatBoxSkeleton
							icon={<FaUsers className="text-pink-300" />}
							label="Tracked Listeners"
						/>
						<StatBoxSkeleton
							icon={<FaHourglassHalf className="text-teal-300" />}
							label="Avg. Song Length"
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
						<StatBoxSkeleton
							icon={<FaFire className="text-orange-300" />}
							label="Songs Played (24h)"
						/>
						<StatBoxSkeleton
							icon={<FaFire className="text-red-300" />}
							label="Songs Played (7d)"
						/>
					</div>
				</CardContent>

				<CardFooter className="border-t border-zinc-800 pt-4">
					<SkeletonBar width="w-64" height="h-4" />
				</CardFooter>
			</Card>
		</div>
	);
};

export default StatsSkeletonComponent;
