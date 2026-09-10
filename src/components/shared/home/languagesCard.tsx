import { Globe2 } from 'lucide-react';

import { IconChip, Surface } from '@/components/shared/page/parts';
import { getLanguagesOrFallback } from '@/lib/bot-catalogue';

/**
 * Languages card, counted and listed from the bot's own catalogue rather than a
 * number typed here that quietly goes stale when a locale is added.
 */
const LanguagesCard: React.FC = async () => {
	const { languages } = await getLanguagesOrFallback();

	return (
		<Surface className="p-8">
			<IconChip>
				<Globe2 className="h-4 w-4" />
			</IconChip>
			<h3 className="mt-4 text-lg font-semibold text-foreground">
				Speaks {languages.length} languages
			</h3>
			<p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
				Set a language for the whole server, or let each member pick their own
				with <code className="font-mono">/language</code>.
			</p>
			<div className="mt-5 flex flex-wrap gap-2">
				{languages.map((language) => (
					<span
						key={language.code}
						title={language.name}
						className="rounded-full border border-foreground/15 px-3 py-1 text-[13px] text-foreground/80"
					>
						{language.nativeName}
					</span>
				))}
			</div>
		</Surface>
	);
};

export default LanguagesCard;
