import { getLanguagesOrFallback } from '@/lib/bot-catalogue';

/**
 * The locales the bot actually ships, read from `/api/v1/languages` so this
 * cannot drift from Pepper-Bot `locales/`.
 */
const LanguageBadges: React.FC<{ className?: string }> = async ({
	className,
}) => {
	const { languages } = await getLanguagesOrFallback();

	return (
		<div className={className}>
			<div className="flex flex-wrap gap-2">
				{languages.map((language) => (
					<span
						key={language.code}
						title={`${language.name} · ${Math.round(language.completeness * 100)}% translated`}
						className="rounded-full border border-border px-3 py-1 text-[13px] text-foreground/80"
					>
						{language.nativeName}
					</span>
				))}
			</div>
		</div>
	);
};

export default LanguageBadges;
