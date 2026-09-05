import { MenuItemType } from '@/types';

/** Product pages, shown as the header's primary navigation. */
export const primaryNavItems: MenuItemType[] = [
	{ name: 'Features', value: '/bot-features' },
	{ name: 'Stats', value: '/stats' },
	{ name: 'About', value: '/about-us' },
];

/** Legal pages — reachable from the footer and the mobile menu, not the top nav. */
export const legalNavItems: MenuItemType[] = [
	{ name: 'Terms of Service', value: '/terms-of-service' },
	{ name: 'Privacy Policy', value: '/privacy-policy' },
];

/** Every first-party page. `middleware.ts` derives its public-route list from this. */
export const menuItems: MenuItemType[] = [...primaryNavItems, ...legalNavItems];

export const commonRoutes = ['/auth', '/public', '/images', '/dashboard'];

export const client_id =
	process.env.NODE_ENV === 'development'
		? '1302023614735847597'
		: '871808444502540379';

export const inviteLink: string = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=275443600464&scope=bot%20applications.commands`;
export const githubLink: string =
	'https://github.com/muralianand12345/Pepper-Bot';
export const twitterLink: string = 'https://twitter.com';
export const discordServerLink: string = 'https://discord.gg/XzE9hSbsNb';

export const featursLink = '/bot-features';
export const termsLink = '/terms-of-service';
export const privacyLink = '/privacy-policy';
export const pepperLogoLink = '/images/pepperLogo.png';

export const features = [
	{
		name: 'High Quality Audio',
		value: 'Experience crystal-clear sound for all your favorite tracks.',
		imgSrc: '/images/high_quality_audio.jpg',
	},
	{
		name: 'DJ Support',
		value: 'Give DJ roles the power to manage music controls.',
		imgSrc: '/images/dj_for_discord.png',
	},
	{
		name: '24/7 Availability',
		value: 'Keep the music going anytime, anywhere.',
		imgSrc: '/images/247.jpg',
	},
];

export const MusicQuotes = [
  "“Where words fail, music speaks.” – Hans Christian Andersen",
  "“Music can change the world because it can change people.” – Bono",
  "“Without music, life would be a mistake.” – Friedrich Nietzsche",
  "“One good thing about music, when it hits you, you feel no pain.” – Bob Marley",
  "“Music is the shorthand of emotion.” – Leo Tolstoy",
  "“Music is the divine way to tell beautiful, poetic things to the heart.” – Pablo Casals",
  "“After silence, that which comes nearest to expressing the inexpressible is music.” – Aldous Huxley",
  "“To play a wrong note is insignificant; to play without passion is inexcusable.” – Ludwig van Beethoven",
  "“Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.” – Plato",
  "“Music is a world within itself, it’s a language we all understand.” – Stevie Wonder",
  "“If something happened where I couldn’t write music anymore, it would kill me. It’s not just a job. It’s not just a hobby. It’s why I get up in the morning.” – Hans Zimmer",
  "“Your inner voice is the voice of divinity. To hear it, we need to be in solitude, even in crowded places.” – A. R. Rahman"
];

/** Slash commands the bot registers — kept in sync with Pepper-Bot `src/commands`. */
export const botCommands = [
	{ name: '/play', description: 'Search or paste a link and start playing instantly.' },
	{ name: '/queue', description: 'See what is lined up next and jump around it.' },
	{ name: '/autoplay', description: 'Keep the music going with tailored recommendations.' },
	{ name: '/lyrics', description: 'Pull up the lyrics for the track that is playing.' },
	{ name: '/chart', description: 'Your top tracks, artists and listening time.' },
	{ name: '/filter', description: 'Bassboost, nightcore, karaoke and more audio filters.' },
	{ name: '/loop', description: 'Repeat a single track or the whole queue.' },
	{ name: '/skip', description: 'Move on to the next track in the queue.' },
	{ name: '/pause', description: 'Pause playback without losing the queue.' },
	{ name: '/resume', description: 'Pick up exactly where you paused.' },
	{ name: '/volume', description: 'Set playback volume for the whole server.' },
	{ name: '/stop', description: 'Stop playback and clear the queue.' },
	{ name: '/dj', description: 'Restrict controls to a DJ role you choose.' },
	{ name: '/language', description: 'Switch Pepper responses to another language.' },
	{ name: '/login', description: 'Connect Spotify to queue your own playlists.' },
	{ name: '/logout', description: 'Disconnect a linked account at any time.' },
	{ name: '/help', description: 'Browse every command with usage examples.' },
	{ name: '/feedback', description: 'Send bugs or ideas straight to the developers.' },
];

/** Platforms Pepper can resolve and stream from. */
export const musicSources = [
	'Spotify',
	'Apple Music',
	'Deezer',
	'SoundCloud',
];

/** Locales shipped in Pepper-Bot `locales/`. */
export const supportedLanguages = [
	'English',
	'Deutsch',
	'Español',
	'Français',
	'Português',
	'Русский',
	'Tiếng Việt',
];

/** Anchor nav shown in the stats hero; ids match the sections rendered below it. */
export const statsSections = [
	{ id: 'live', label: 'Live now' },
	{ id: 'overview', label: 'All time' },
	{ id: 'songs', label: 'Top songs' },
	{ id: 'requesters', label: 'Top requesters' },
	{ id: 'servers', label: 'Servers' },
];

