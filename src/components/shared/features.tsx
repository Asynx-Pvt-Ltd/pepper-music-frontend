import { NextPage } from 'next';
import Image from 'next/image';

import { FeaturesType } from '@/types';

interface Props {
	feature: FeaturesType;
}

const Features: NextPage<Props> = ({ feature }) => {
	return (
		<figure className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25">
			<div className="relative aspect-[4/3] overflow-hidden">
				<Image
					src={feature.imgSrc}
					alt={feature.name}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
				/>
				<div
					aria-hidden
					className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
				/>
			</div>
			<figcaption className="p-5">
				<h3 className="text-base font-semibold text-white">{feature.name}</h3>
				<p className="mt-1.5 text-[14px] leading-relaxed text-gray-400">
					{feature.value}
				</p>
			</figcaption>
		</figure>
	);
};

export default Features;
