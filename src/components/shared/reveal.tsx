'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const MARGIN = 64;

/**
 * Fade-and-rise wrapper for below-fold sections.
 *
 * The motion itself is a CSS transition (`.reveal` in `globals.css`); this
 * component only decides when to add the class. That keeps an animation library
 * out of the bundle on pages that do not otherwise need one — routing the stats
 * sections through a framer-motion wrapper cost that page 41 kB of first load
 * for what is ultimately a fade.
 *
 * Children are passed through as a slot, so server components wrapped in this
 * stay server-rendered. The hero deliberately does not use it: the hero is in
 * view on load, where waiting on an observer only holds back the largest paint.
 *
 * Content stranded at `opacity: 0` is far worse than content that never
 * animated, so visibility is decided three ways rather than one:
 *
 *   - a synchronous measurement at mount, which shows anything already on
 *     screen outright — a deep link, a restored scroll position, a short page;
 *   - an IntersectionObserver, the cheap path for ordinary scrolling;
 *   - a rAF-throttled scroll and resize check, plus two deferred re-measures,
 *     which cover sections whose DOM arrives late through Suspense streaming.
 *
 * Everything tears itself down as soon as the section is shown. Reduced motion
 * is handled in CSS, which shows `.reveal` outright.
 */
export const Reveal = ({
	children,
	delay = 0,
	className,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [shown, setShown] = useState(false);
	// Set when the section was already on screen as it mounted; it should appear
	// as part of the page rather than replay an entrance the reader never saw.
	const [instant, setInstant] = useState(false);

	useEffect(() => {
		if (shown) return;

		const element = ref.current;
		if (!element) return;

		const onScreen = () => {
			const rect = element.getBoundingClientRect();
			// A zero-height rect means the node is still parked off-document.
			return (
				rect.height > 0 &&
				rect.bottom > 0 &&
				rect.top < window.innerHeight - MARGIN
			);
		};

		if (onScreen()) {
			setInstant(true);
			setShown(true);
			return;
		}

		let frame = 0;
		const timers: ReturnType<typeof setTimeout>[] = [];

		const check = () => {
			frame = 0;
			if (onScreen()) setShown(true);
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) setShown(true);
			},
			{ rootMargin: `-${MARGIN}px` }
		);
		observer.observe(element);

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		// Re-measure once the browser has laid out, and again after streaming has
		// had time to move the nodes into place.
		timers.push(setTimeout(check, 0), setTimeout(check, 400));

		return () => {
			if (frame) cancelAnimationFrame(frame);
			timers.forEach(clearTimeout);
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [shown]);

	return (
		<div
			ref={ref}
			className={cn(
				'reveal',
				shown && 'reveal--shown',
				instant && 'reveal--instant',
				className
			)}
			style={delay && !instant ? { transitionDelay: `${delay}s` } : undefined}
		>
			{children}
		</div>
	);
};

export default Reveal;
