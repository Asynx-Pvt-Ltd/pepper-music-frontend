import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared building blocks for the marketing pages. Mirrors the design language
 * introduced on the legal pages: a bare page canvas, hairline borders,
 * inverted-ink icon chips and uppercase eyebrows. Everything is expressed in
 * theme tokens, so the same markup reads correctly in light and dark.
 */

export const Eyebrow = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<span
		className={cn(
			'inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/75',
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
			'rounded-xl border border-border bg-surface',
			interactive &&
				'transition-colors hover:border-foreground/25 hover:bg-surface-hover',
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
			'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground',
			className
		)}
	>
		{children}
	</span>
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
				<h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
					{title}
				</h1>
				<p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
			<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
				{label}
			</p>
		)}
		<h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
			{title}
		</h2>
		{description && (
			<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
				{description}
			</p>
		)}
	</div>
);

export const FeatureTile = ({
	icon,
	title,
	description,
}: {
	icon: ReactNode;
	title: string;
	description: string;
}) => (
	<Surface interactive className="p-6">
		<IconChip>{icon}</IconChip>
		<h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
		<p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
			{description}
		</p>
	</Surface>
);

export const MetricStrip = ({
	metrics,
	className,
}: {
	metrics: { label: string; value: string; hint?: string }[];
	className?: string;
}) => (
	<div
		className={cn(
			'grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4',
			className
		)}
	>
		{metrics.map((metric) => (
			<div key={metric.label} className="bg-background px-5 py-6">
				<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
					{metric.label}
				</p>
				<p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">
					{metric.value}
				</p>
				{metric.hint && (
					<p className="mt-1 text-[12px] text-muted-foreground/85">{metric.hint}</p>
				)}
			</div>
		))}
	</div>
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
	<div className="relative overflow-hidden rounded-2xl border border-border bg-surface-hover px-6 py-12 text-center md:px-12">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[min(32rem,80%)] rounded-full bg-glow blur-3xl"
		/>
		<div className="relative">
			<h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
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
}) => (
	<a
		href={href}
		{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
		className={cn(
			'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors',
			variant === 'primary'
				? 'bg-primary text-primary-foreground hover:bg-primary/90'
				: 'border border-foreground/15 text-foreground hover:border-foreground/40 hover:bg-surface-hover',
			className
		)}
	>
		{children}
	</a>
);
