import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const Prose = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<div
		className={cn(
			'space-y-4 text-[15px] leading-relaxed text-muted-foreground',
			className
		)}
	>
		{children}
	</div>
);

export const Term = ({ children }: { children: ReactNode }) => (
	<span className="font-medium text-foreground">{children}</span>
);

export const Bullets = ({
	items,
	className,
}: {
	items: ReactNode[];
	className?: string;
}) => (
	<ul className={cn('space-y-2.5', className)}>
		{items.map((item, index) => (
			<li key={index} className="relative pl-5">
				<span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-foreground/40" />
				{item}
			</li>
		))}
	</ul>
);

export const Note = ({
	title,
	children,
}: {
	title?: string;
	children: ReactNode;
}) => (
	<div className="rounded-lg border border-border bg-surface-hover p-4">
		{title && (
			<p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/75">
				{title}
			</p>
		)}
		<div className="text-[15px] leading-relaxed text-muted-foreground">
			{children}
		</div>
	</div>
);

export const DataTable = ({
	rows,
}: {
	rows: { label: string; detail: ReactNode; purpose: ReactNode }[];
}) => (
	<div className="overflow-hidden rounded-lg border border-border">
		<div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-4 border-b border-border bg-surface-hover px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70 sm:grid">
			<span>What we store</span>
			<span>Why we store it</span>
		</div>
		<div className="divide-y divide-border">
			{rows.map((row) => (
				<div
					key={row.label}
					className="grid gap-2 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-4"
				>
					<div>
						<p className="text-sm font-medium text-foreground">{row.label}</p>
						<p className="mt-1 text-[13px] leading-relaxed text-muted-foreground/85">
							{row.detail}
						</p>
					</div>
					<p className="text-[14px] leading-relaxed text-muted-foreground">
						{row.purpose}
					</p>
				</div>
			))}
		</div>
	</div>
);
