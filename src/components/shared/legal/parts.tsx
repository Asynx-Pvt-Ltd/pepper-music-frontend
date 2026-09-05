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
			'space-y-4 text-[15px] leading-relaxed text-gray-400',
			className
		)}
	>
		{children}
	</div>
);

export const Term = ({ children }: { children: ReactNode }) => (
	<span className="font-medium text-white">{children}</span>
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
				<span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-white/40" />
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
	<div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
		{title && (
			<p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
				{title}
			</p>
		)}
		<div className="text-[15px] leading-relaxed text-gray-400">{children}</div>
	</div>
);

export const DataTable = ({
	rows,
}: {
	rows: { label: string; detail: ReactNode; purpose: ReactNode }[];
}) => (
	<div className="overflow-hidden rounded-lg border border-white/10">
		<div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-4 border-b border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/60 sm:grid">
			<span>What we store</span>
			<span>Why we store it</span>
		</div>
		<div className="divide-y divide-white/[0.07]">
			{rows.map((row) => (
				<div
					key={row.label}
					className="grid gap-2 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-4"
				>
					<div>
						<p className="text-sm font-medium text-white">{row.label}</p>
						<p className="mt-1 text-[13px] leading-relaxed text-gray-500">
							{row.detail}
						</p>
					</div>
					<p className="text-[14px] leading-relaxed text-gray-400">
						{row.purpose}
					</p>
				</div>
			))}
		</div>
	</div>
);
