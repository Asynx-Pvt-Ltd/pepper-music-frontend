import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Shared building blocks for the marketing pages: a bare page canvas, hairline
 * borders, inverted-ink icon chips and monospaced uppercase labels. Everything
 * is expressed in theme tokens, so the same markup reads correctly in light and
 * dark.
 *
 * Two rules hold the language together. Labels and figures are monospaced while
 * prose is not, which lets a number or a command read as data at a glance. And
 * repeated things are separated by hairlines rather than boxed individually —
 * see `CellGrid` — so a page of six capabilities reads as one object instead of
 * six floating cards.
 */

/** Uppercase micro-label. Takes an icon as its first child. */
export const Eyebrow = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<span
		className={cn(
			'inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70',
			className
		)}
	>
		{children}
	</span>
);

export const Surface = ({
	children,
	className,
	interactive = false,
}: {
	children: ReactNode;
	className?: string;
	interactive?: boolean;
}) => (
	<div
		className={cn(
			'rounded-lg border border-border bg-surface',
			interactive &&
				'transition-colors duration-200 hover:border-foreground/20 hover:bg-surface-hover',
			className
		)}
	>
		{children}
	</div>
);

export const IconChip = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<span
		className={cn(
			'flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground',
			className
		)}
	>
		{children}
	</span>
);

/**
 * Hairline grid. Children are laid out one per cell with a single-pixel rule
 * between them, produced by a `gap-px` grid over a border-coloured ground — no
 * per-cell borders to double up at the seams.
 */
export const CellGrid = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<div
		className={cn(
			'grid gap-px overflow-hidden rounded-lg border border-border bg-border',
			className
		)}
	>
		{children}
	</div>
);

export const Cell = ({
	children,
	className,
	interactive = false,
}: {
	children: ReactNode;
	className?: string;
	interactive?: boolean;
}) => (
	<div
		className={cn(
			'bg-background',
			interactive && 'transition-colors duration-200 hover:bg-surface-hover',
			className
		)}
	>
		{children}
	</div>
);

/** Full-width hairline carrying an optional label, used to open a section. */
export const Rule = ({
	label,
	className,
}: {
	label?: string;
	className?: string;
}) => (
	<div className={cn('flex items-center gap-4', className)}>
		{label && (
			<span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
				{label}
			</span>
		)}
		<span aria-hidden className="h-px flex-1 bg-border" />
	</div>
);

export const PageHero = ({
	eyebrow,
	title,
	summary,
	actions,
	children,
}: {
	eyebrow: ReactNode;
	title: string;
	summary: string;
	actions?: ReactNode;
	children?: ReactNode;
}) => (
	<div className="relative overflow-hidden border-b border-border">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[min(48rem,90%)] rounded-full bg-glow blur-3xl"
		/>
		<div className="container relative mx-auto px-4 py-14 md:py-20">
			<div className="mx-auto max-w-5xl">
				<Eyebrow>{eyebrow}</Eyebrow>
				<h1 className="mt-5 text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
					{title}
				</h1>
				<p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg">
					{summary}
				</p>
				{actions && (
					<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
						{actions}
					</div>
				)}
				{children}
			</div>
		</div>
	</div>
);

export const SectionHeading = ({
	label,
	title,
	description,
	className,
}: {
	label?: string;
	title: string;
	description?: string;
	className?: string;
}) => (
	<div className={cn('max-w-2xl', className)}>
		{label && (
			<p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
				{label}
			</p>
		)}
		<h2 className="mt-3 text-balance text-2xl font-bold tracking-[-0.025em] text-foreground md:text-[2rem] md:leading-[1.15]">
			{title}
		</h2>
		{description && (
			<p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
				{description}
			</p>
		)}
	</div>
);

export const MetricStrip = ({
	metrics,
	className,
}: {
	metrics: { label: string; value: string; hint?: string }[];
	className?: string;
}) => (
	<CellGrid className={cn('sm:grid-cols-2 lg:grid-cols-4', className)}>
		{metrics.map((metric) => (
			<Cell key={metric.label} className="px-5 py-6">
				<p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
					{metric.label}
				</p>
				<p className="mt-2.5 font-mono text-[1.75rem] font-semibold leading-none tabular-nums tracking-[-0.02em] text-foreground">
					{metric.value}
				</p>
				{metric.hint && (
					<p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/85">
						{metric.hint}
					</p>
				)}
			</Cell>
		))}
	</CellGrid>
);

export const CtaBand = ({
	title,
	description,
	actions,
}: {
	title: string;
	description: string;
	actions: ReactNode;
}) => (
	<div className="relative overflow-hidden rounded-xl border border-border bg-surface px-6 py-14 text-center md:px-12">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[min(32rem,80%)] rounded-full bg-glow blur-3xl"
		/>
		<div className="relative">
			<h2 className="text-balance text-2xl font-bold tracking-[-0.025em] text-foreground md:text-[2rem]">
				{title}
			</h2>
			<p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
				{description}
			</p>
			<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
				{actions}
			</div>
		</div>
	</div>
);

/**
 * Primary and secondary call to action. Internal destinations route through
 * `next/link` so they keep client navigation and the route progress bar;
 * anything external, or any explicit `external`, falls back to a plain anchor.
 */
export const ActionLink = ({
	href,
	children,
	variant = 'primary',
	external = false,
	className,
}: {
	href: string;
	children: ReactNode;
	variant?: 'primary' | 'ghost';
	external?: boolean;
	className?: string;
}) => {
	const classes = cn(
		'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		variant === 'primary'
			? 'bg-primary text-primary-foreground hover:bg-primary/90'
			: 'border border-border text-foreground hover:border-foreground/25 hover:bg-surface-hover',
		className
	);

	const isInternal = !external && href.startsWith('/');

	if (isInternal) {
		return (
			<Link href={href} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<a
			href={href}
			{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
			className={classes}
		>
			{children}
		</a>
	);
};
