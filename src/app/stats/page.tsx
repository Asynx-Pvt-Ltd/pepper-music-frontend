import { NextPage } from 'next';
import { default as nextDynamic } from 'next/dynamic';
const StatsComponent = nextDynamic(() => import('@/components/shared/stats/statsComponent'), {
    ssr: true,
}
)

interface Props {}

export const metadata = {
    title: 'Stats | What we have achieved with Pepper',
    description: 'Live and all-time Pepper music bot statistics — active players, listeners, top songs, top requesters and server insights.',
    keywords: [
        'Discord music bot stats',
        'Pepper music bot statistics',
        'Discord music streaming stats',
        "Discord bot analytics",
    ],
};

const StatsPage: NextPage<Props> = async ({}) => {
    return (
        <div className="w-full mx-auto px-3 space-y-8 bg-black">
            <div className="text-center pt-6">
                <h1 className="text-3xl font-bold text-white mb-6">Pepper Music Bot Stats</h1>
                <p className="text-gray-400">
                    Explore Pepper's live and all-time music streaming statistics — active players, top songs, top requesters and server insights.
                </p>
            </div>
            <StatsComponent />
        </div>
    );
};

export const dynamic = 'force-dynamic';
export default StatsPage;