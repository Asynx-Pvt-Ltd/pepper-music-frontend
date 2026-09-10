'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Light/dark switch for the navbar.
 *
 * Both icons are always rendered and swapped with the `dark:` variant rather
 * than with state, so the correct one is painted on the very first frame and
 * there is no post-hydration flicker. Only the accessible label — which needs
 * to know the resolved theme — waits for mount.
 */
const ThemeToggle = ({ className }: { className?: string }) => {
	const { resolvedTheme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => setIsMounted(true), []);

	const label = !isMounted
		? 'Toggle theme'
		: resolvedTheme === 'dark'
			? 'Switch to light theme'
			: 'Switch to dark theme';

	return (
		<button
			type="button"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			aria-label={label}
			title={label}
			className={cn(
				'flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors outline-none hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring',
				className
			)}
		>
			<Sun size={18} className="hidden dark:block" />
			<Moon size={18} className="block dark:hidden" />
		</button>
	);
};

export default ThemeToggle;
