import { Award, Clock, Music, Server, Users, Zap } from 'lucide-react';

import { FeatureTile } from '@/components/shared/page/parts';

const FeatureCardContent = [
	{
		icon: <Music className="h-4 w-4" />,
		title: 'Voice Channel Music',
		description:
			'Play high-quality music directly in your Discord voice channels with a single slash command.',
	},
	{
		icon: <Server className="h-4 w-4" />,
		title: 'Multi-Lingual Support',
		description:
			'Search and enjoy music in multiple languages, with every response translated to match.',
	},
	{
		icon: <Users className="h-4 w-4" />,
		title: 'Community Playlists',
		description:
			'Let server members add songs to the queue and build a collaborative listening session.',
	},
	{
		icon: <Zap className="h-4 w-4" />,
		title: 'Fast & Reliable',
		description:
			'Lightning-fast song loading and stable 24/7 uptime for uninterrupted music sessions.',
	},
	{
		icon: <Award className="h-4 w-4" />,
		title: 'Premium Audio Quality',
		description:
			'Crystal-clear sound with high-bitrate streaming and minimal buffering.',
	},
	{
		icon: <Clock className="h-4 w-4" />,
		title: 'Queue Management',
		description:
			'Reorder, skip and loop tracks or whole playlists without losing your place.',
	},
];

const FeatureCards: React.FC = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{FeatureCardContent.map((feature) => (
				<FeatureTile
					key={feature.title}
					icon={feature.icon}
					title={feature.title}
					description={feature.description}
				/>
			))}
		</div>
	);
};

export default FeatureCards;
