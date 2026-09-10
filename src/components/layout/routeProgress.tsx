'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

/**
 * A thin bar across the top of the page that appears the moment an internal
 * link is clicked and finishes when the new route renders.
 *
 * Several pages here are server-rendered from the bot's API, so a click can sit
 * for a beat with nothing on screen changing. This is the acknowledgement:
 * cheap, global, and it needs no change to the links themselves.
 */

/** How far the bar creeps while waiting — never to 100%, that is for arrival. */
const CEILING = 92;

const isPlainLeftClick = (event: MouseEvent): boolean =>
	event.button === 0 &&
	!event.metaKey &&
	!event.ctrlKey &&
	!event.shiftKey &&
	!event.altKey &&
	!event.defaultPrevented;

/** True only for links that will actually cause an in-app route change. */
const navigatesInApp = (anchor: HTMLAnchorElement): boolean => {
	if (anchor.target && anchor.target !== '_self') return false;
	if (anchor.hasAttribute('download')) return false;

	const href = anchor.getAttribute('href');
	if (!href || href.startsWith('#')) return false;

	const url = new URL(anchor.href, window.location.href);
	if (url.origin !== window.location.origin) return false;

	// Same page, different anchor — the browser just scrolls.
	return url.pathname !== window.location.pathname || url.search !== window.location.search;
};

const RouteProgress: React.FC = () => {
	const pathname = usePathname();
	const [progress, setProgress] = React.useState(0);
	const [active, setActive] = React.useState(false);

	React.useEffect(() => {
		const onClick = (event: MouseEvent) => {
			if (!isPlainLeftClick(event)) return;

			const anchor = (event.target as HTMLElement | null)?.closest('a');
			if (!anchor || !navigatesInApp(anchor)) return;

			setActive(true);
			setProgress(12);
		};

		document.addEventListener('click', onClick, { capture: true });
		return () => document.removeEventListener('click', onClick, { capture: true });
	}, []);

	// Creep forward while the next route is being prepared.
	React.useEffect(() => {
		if (!active) return;

		const timer = setInterval(() => {
			setProgress((value) => (value >= CEILING ? value : value + (CEILING - value) * 0.12));
		}, 180);

		return () => clearInterval(timer);
	}, [active]);

	// The new route has rendered: fill the bar, then clear it.
	React.useEffect(() => {
		if (!active) return;

		setProgress(100);
		const timer = setTimeout(() => {
			setActive(false);
			setProgress(0);
		}, 280);

		return () => clearTimeout(timer);
		// Intentionally keyed on the path alone: `active` changing must not
		// re-run this, or the bar would complete the instant it started.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
		>
			<div
				className="h-full bg-white transition-[width,opacity] duration-200 ease-out"
				style={{ width: `${progress}%`, opacity: active ? 1 : 0 }}
			/>
		</div>
	);
};

export default RouteProgress;
