import { Award, Clock, Crown, Radio, Server, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { FeatureCardProps } from '@/types';

const FeatureCardContent = [
	{
		icon: <Radio className="h-8 w-8 text-emerald-500" />,
		title: 'Live Right Now',
		description: 'Every track Pepper is streaming this second, refreshed live.',
	},
	{
		icon: <Clock className="h-8 w-8 text-orange-500" />,
		title: 'Total Playtime',
		description: 'Cumulative listening time across every server.',
	},
	{
		icon: <Award className="h-8 w-8 text-blue-500" />,
		title: 'Global Top Songs',
		description: 'The tracks played the most, everywhere.',
	},
	{
		icon: <Crown className="h-8 w-8 text-yellow-500" />,
		title: 'Top Requesters',
		description: 'The listeners keeping the queue alive.',
	},
	{
		icon: <Server className="h-8 w-8 text-purple-500" />,
		title: 'Server Insights',
		description: 'Busiest communities, their top track and sources.',
	},
	{
		icon: <Users className="h-8 w-8 text-pink-500" />,
		title: 'Reach',
		description: 'Servers, members and listeners Pepper plays for.',
	},
];

function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<Card className="bg-black border-zinc-700 text-white">
			<CardContent className="pt-6">
				<div className="flex flex-col items-center text-center">
					<div className="mb-4">{icon}</div>
					<CardTitle className="mb-2">{title}</CardTitle>
					<CardDescription className="text-gray-400">{description}</CardDescription>
				</div>
			</CardContent>
		</Card>
	);
}

const FeatureCards: React.FC = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto p-6 bg-black">
			{FeatureCardContent.map((feature) => (
				<FeatureCard
					icon={feature.icon}
					title={feature.title}
					description={feature.description}
					key={feature.title}
				/>
			))}
		</div>
	);
};

export default FeatureCards;
