import { getCatalogues } from '@/lib/bot-catalogue';

import CommandExplorer from './commandExplorer';

/**
 * Server half of the command reference: reads both catalogues from the bot and
 * hands them to the client explorer as its starting state, so the list is in
 * the HTML rather than appearing after a round trip.
 */
const CommandReference: React.FC = async () => {
	const { commands, languages } = await getCatalogues();

	return <CommandExplorer initial={commands} languages={languages.languages} />;
};

export default CommandReference;
