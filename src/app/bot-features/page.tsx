import { Metadata, NextPage } from 'next';

import FeatureComponent from '@/components/shared/feature/featureComponent';

interface Props {}

export const metadata: Metadata = {
	title: 'Features | How Pepper Enhances Your Discord Experience',
	description:
		"Every Pepper feature in one place — voice channel playback, smart autoplay, DJ permissions, audio filters, lyrics, listening stats and support for 7 languages.",
	keywords: [
		'Discord music bot features',
		'Pepper music bot',
		'Discord voice channel music',
		'multi-server music bot',
		'community playlists',
		'fast reliable music bot',
		'premium audio quality',
		'queue management',
	],
};

const FeaturePage: NextPage<Props> = async ({}) => {
	return (
		<div className="min-h-screen bg-black text-white">
			<FeatureComponent />
		</div>
	);
};

export const dynamic = 'force-dynamic';
export default FeaturePage;
