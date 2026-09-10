import { fallbackCommands, fallbackLanguages } from '@/constants';
import { CommandCatalogue, LanguageCatalogue } from '@/types';

import { fetchUpstream, withCache } from './upstream';

/**
 * Reads the bot's command and language catalogues so the site never has to
 * restate what the bot already knows (Pepper-Bot `GET /api/v1/commands` and
 * `GET /api/v1/languages`).
 *
 * Both endpoints are cheap and change only on deploy, and the bot itself sends
 * `Cache-Control: public, max-age=300`, so we mirror that: a five-minute
 * in-process cache on top of Next's data cache. If the bot is unreachable we
 * fall back to a hand-written list rather than rendering an empty page.
 */

const CATALOGUE_TTL_MS = 5 * 60_000;
/** The catalogue barely changes, so an hour-old copy is still worth serving. */
const CATALOGUE_STALE_MS = 60 * 60_000;
const REVALIDATE_SECONDS = 300;

export const DEFAULT_LOCALE = 'en';

/** Guards `?locale=` before it reaches the bot. Mirrors its own `LOCALE_CODE`. */
const LOCALE_CODE = /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/i;

export const isLocaleShaped = (value: string | null | undefined): boolean =>
	typeof value === 'string' && LOCALE_CODE.test(value);

const fallbackCatalogue = (): CommandCatalogue => {
	const categories = [...new Set(fallbackCommands.map((command) => command.category))];
	return {
		locale: DEFAULT_LOCALE,
		total: fallbackCommands.length,
		categories: categories.map((id) => ({
			id,
			name: id === 'music' ? 'Music Commands' : 'Utility Commands',
			emoji: id === 'music' ? '🎵' : '🔧',
			count: fallbackCommands.filter((command) => command.category === id).length,
		})),
		commands: fallbackCommands.map((command) => ({
			...command,
			categoryName: command.category === 'music' ? 'Music Commands' : 'Utility Commands',
			categoryEmoji: command.category === 'music' ? '🎵' : '🔧',
			cooldown: 0,
			dj: false,
			premium: false,
			ownerOnly: false,
			userPermissions: [],
			botPermissions: [],
			options: [],
			subcommands: [],
		})),
	};
};

const fallbackLanguageCatalogue = (): LanguageCatalogue => ({
	default: DEFAULT_LOCALE,
	total: fallbackLanguages.length,
	languages: fallbackLanguages.map((language) => ({
		...language,
		discordLocale: null,
		default: language.code === DEFAULT_LOCALE,
		completeness: 1,
		totalKeys: 0,
		missingKeys: 0,
	})),
});

/** Throws if the bot cannot answer — use `getCommandsOrFallback` for rendering. */
export const getCommands = (locale: string = DEFAULT_LOCALE): Promise<CommandCatalogue> => {
	const requested = isLocaleShaped(locale) ? locale.toLowerCase() : DEFAULT_LOCALE;
	return withCache(
		`commands:${requested}`,
		{ ttlMs: CATALOGUE_TTL_MS, staleMs: CATALOGUE_STALE_MS },
		() =>
			fetchUpstream<CommandCatalogue>('/commands', {
				params: { locale: requested },
				revalidate: REVALIDATE_SECONDS,
			}),
	);
};

export const getLanguages = (): Promise<LanguageCatalogue> =>
	withCache(
		'languages',
		{ ttlMs: CATALOGUE_TTL_MS, staleMs: CATALOGUE_STALE_MS },
		() => fetchUpstream<LanguageCatalogue>('/languages', { revalidate: REVALIDATE_SECONDS }),
	);

export const getCommandsOrFallback = async (
	locale: string = DEFAULT_LOCALE,
): Promise<CommandCatalogue> => {
	try {
		return await getCommands(locale);
	} catch (error) {
		// Handled, not broken: the page still renders from `fallbackCommands`.
		console.warn('[catalogue] commands unavailable, using fallback:', error);
		return fallbackCatalogue();
	}
};

export const getLanguagesOrFallback = async (): Promise<LanguageCatalogue> => {
	try {
		return await getLanguages();
	} catch (error) {
		console.warn('[catalogue] languages unavailable, using fallback:', error);
		return fallbackLanguageCatalogue();
	}
};

/** Both catalogues in one pass, for pages that render them together. */
export const getCatalogues = async (
	locale: string = DEFAULT_LOCALE,
): Promise<{ commands: CommandCatalogue; languages: LanguageCatalogue }> => {
	const [commands, languages] = await Promise.all([
		getCommandsOrFallback(locale),
		getLanguagesOrFallback(),
	]);
	return { commands, languages };
};
