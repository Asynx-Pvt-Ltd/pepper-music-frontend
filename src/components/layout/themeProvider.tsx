'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ComponentProps } from 'react';

/**
 * Wraps the app in next-themes. The provider writes `class="light"` or
 * `class="dark"` onto <html>, which is what the `dark:` variant and the token
 * blocks in globals.css key off.
 */
const ThemeProvider = ({
	children,
	...props
}: ComponentProps<typeof NextThemesProvider>) => (
	<NextThemesProvider {...props}>{children}</NextThemesProvider>
);

export default ThemeProvider;
