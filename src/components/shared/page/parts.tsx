import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared building blocks for the marketing pages. Mirrors the design language
 * introduced on the legal pages: black canvas, hairline borders, white icon
 * chips and uppercase eyebrows.
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
			'inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70',
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
			'rounded-xl border border-white/10 bg-white/[0.03]',
			interactive &&
				'transition-colors hover:border-white/25 hover:bg-white/[0.06]',
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
			'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black',
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
	<div className="relative overflow-hidden border-b border-white/10">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[min(48rem,90%)] rounded-full bg-white/[0.07] blur-3xl"
		/>
		<div className="container relative mx-auto px-4 py-14 md:py-20">
			<div className="mx-auto max-w-5xl">
				<Eyebrow>{eyebrow}</Eyebrow>
				<h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
					{title}
				</h1>
				<p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
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
			<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
				{label}
			</p>
		)}
		<h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
			{title}
		</h2>
		{description && (
			<p className="mt-3 text-[15px] leading-relaxed text-gray-400">
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
		<h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
		<p className="mt-2 text-[14px] leading-relaxed text-gray-400">
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
			'grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4',
			className
		)}
	>
		{metrics.map((metric) => (
			<div key={metric.label} className="bg-black px-5 py-6">
				<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
					{metric.label}
				</p>
				<p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-white">
					{metric.value}
				</p>
				{metric.hint && (
					<p className="mt-1 text-[12px] text-gray-500">{metric.hint}</p>
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
	<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center md:px-12">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[min(32rem,80%)] rounded-full bg-white/10 blur-3xl"
		/>
		<div className="relative">
			<h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
				{title}
			</h2>
			<p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">
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
				? 'bg-white text-black hover:bg-gray-200'
				: 'border border-white/15 text-white hover:border-white/40 hover:bg-white/[0.06]',
			className
		)}
	>
		{children}
	</a>
);
