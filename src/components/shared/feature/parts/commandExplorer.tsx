'use client';

import React from 'react';
import { ChevronDown, Languages, Loader2, Search } from 'lucide-react';

import CommandListSkeleton from '@/components/skeletons/commandListSkeleton';
import { cn } from '@/lib/utils';
import { BotCommand, BotLanguage, CommandCatalogue } from '@/types';
import { showToast } from '@/utils/toast';

/**
 * The command reference, read live from the bot's `/api/v1/commands` endpoint
 * rather than restated here — so a command added to Pepper shows up on the site
 * without anyone editing this file.
 *
 * Switching language re-reads the catalogue in that locale. Each locale is kept
 * once it has been loaded, and an in-flight request is aborted when another
 * language is picked, so flicking through the list costs at most one request
 * per language.
 */

interface CommandExplorerProps {
	initial: CommandCatalogue;
	languages: BotLanguage[];
}

const ALL_CATEGORIES = 'all';

const OptionChip = ({ label, required }: { label: string; required: boolean }) => (
	<span
		className={cn(
			'rounded border px-1.5 py-0.5 font-mono text-[11px]',
			required
				? 'border-white/25 text-gray-300'
				: 'border-white/10 text-gray-500',
		)}
	>
		{required ? `<${label}>` : `[${label}]`}
	</span>
);

const CommandRow = ({ command }: { command: BotCommand }) => {
	const [open, setOpen] = React.useState(false);
	const hasDetail = command.subcommands.length > 0 || command.options.length > 0;

	return (
		<div className="transition-colors hover:bg-white/[0.04]">
			<div className="grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
				<div className="flex items-center gap-2">
					<code className="font-mono text-sm font-semibold text-white">
						/{command.name}
					</code>
					{command.dj && (
						<span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
							DJ
						</span>
					)}
				</div>

				<div className="min-w-0">
					<p className="text-[14px] leading-relaxed text-gray-400">
						{command.description}
					</p>

					{hasDetail && (
						<button
							type="button"
							onClick={() => setOpen((value) => !value)}
							aria-expanded={open}
							className="mt-2 inline-flex items-center gap-1 rounded text-[12px] font-medium text-gray-500 transition-colors outline-none hover:text-gray-300 focus-visible:ring-2 focus-visible:ring-white/40"
						>
							<ChevronDown
								className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
							/>
							{command.subcommands.length > 0
								? `${command.subcommands.length} subcommand${command.subcommands.length === 1 ? '' : 's'}`
								: `${command.options.length} option${command.options.length === 1 ? '' : 's'}`}
						</button>
					)}

					{open && (
						<div className="mt-3 space-y-2 border-l border-white/10 pl-4">
							{command.options.length > 0 && (
								<div className="flex flex-wrap items-center gap-1.5">
									{command.options.map((option) => (
										<OptionChip
											key={option.name}
											label={option.name}
											required={option.required}
										/>
									))}
								</div>
							)}

							{command.subcommands.map((subcommand) => (
								<div key={`${subcommand.group ?? ''}-${subcommand.name}`}>
									<div className="flex flex-wrap items-center gap-1.5">
										<code className="font-mono text-[12px] text-gray-300">
											/{command.name}
											{subcommand.group ? ` ${subcommand.group}` : ''}{' '}
											{subcommand.name}
										</code>
										{subcommand.options.map((option) => (
											<OptionChip
												key={option.name}
												label={option.name}
												required={option.required}
											/>
										))}
									</div>
									<p className="mt-0.5 text-[12px] leading-relaxed text-gray-500">
										{subcommand.description}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const CommandExplorer: React.FC<CommandExplorerProps> = ({ initial, languages }) => {
	const [catalogue, setCatalogue] = React.useState(initial);
	const [locale, setLocale] = React.useState(initial.locale);
	const [category, setCategory] = React.useState(ALL_CATEGORIES);
	const [query, setQuery] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	// Locales already fetched, so going back to one is instant and free.
	const loaded = React.useRef(new Map<string, CommandCatalogue>([[initial.locale, initial]]));
	const request = React.useRef<AbortController | null>(null);

	React.useEffect(() => () => request.current?.abort(), []);

	const selectLocale = async (next: string) => {
		if (next === locale) return;

		const cached = loaded.current.get(next);
		if (cached) {
			setLocale(next);
			setCatalogue(cached);
			return;
		}

		request.current?.abort();
		const controller = new AbortController();
		request.current = controller;

		setLocale(next);
		setLoading(true);

		try {
			const response = await fetch(`/api/commands?locale=${encodeURIComponent(next)}`, {
				signal: controller.signal,
			});
			if (!response.ok) throw new Error(`status ${response.status}`);

			const payload = (await response.json()) as CommandCatalogue;
			loaded.current.set(next, payload);
			setCatalogue(payload);
		} catch (error) {
			if (controller.signal.aborted) return;
			console.error('[commands] locale fetch failed:', error);
			setLocale(catalogue.locale);
			showToast('Could not load that language', 'Showing the previous list instead.', {
				type: 'error',
			});
		} finally {
			if (!controller.signal.aborted) setLoading(false);
		}
	};

	const visible = React.useMemo(() => {
		const needle = query.trim().toLowerCase();
		return catalogue.commands.filter((command) => {
			if (category !== ALL_CATEGORIES && command.category !== category) return false;
			if (!needle) return true;
			return (
				command.name.toLowerCase().includes(needle) ||
				command.description.toLowerCase().includes(needle)
			);
		});
	}, [catalogue.commands, category, query]);

	return (
		<div>
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative sm:max-w-xs sm:flex-1">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Filter commands"
						aria-label="Filter commands"
						className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 text-[14px] text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/30 focus:bg-white/[0.05]"
					/>
				</div>

				<label className="relative flex items-center gap-2 text-[13px] text-gray-400">
					<Languages className="h-4 w-4 shrink-0 text-gray-500" />
					<span className="sr-only">Command language</span>
					<select
						value={locale}
						onChange={(event) => selectLocale(event.target.value)}
						disabled={loading}
						className="appearance-none rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-3 pr-8 text-[14px] text-white outline-none transition-colors focus:border-white/30 disabled:opacity-60"
					>
						{languages.map((language) => (
							<option key={language.code} value={language.code} className="bg-black">
								{language.nativeName}
							</option>
						))}
					</select>
					{loading ? (
						<Loader2 className="pointer-events-none absolute right-2.5 h-4 w-4 animate-spin text-gray-400" />
					) : (
						<ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-gray-600" />
					)}
				</label>
			</div>

			<div className="mt-5" aria-busy={loading}>
				{loading ? (
					<CommandListSkeleton rows={8} />
				) : (
					<>
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => setCategory(ALL_CATEGORIES)}
								className={cn(
									'rounded-full border px-3.5 py-1.5 text-[13px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40',
									category === ALL_CATEGORIES
										? 'border-white/40 bg-white/[0.08] text-white'
										: 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white',
								)}
							>
								All {catalogue.total}
							</button>
							{catalogue.categories.map((entry) => (
								<button
									key={entry.id}
									type="button"
									onClick={() => setCategory(entry.id)}
									className={cn(
										'rounded-full border px-3.5 py-1.5 text-[13px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40',
										category === entry.id
											? 'border-white/40 bg-white/[0.08] text-white'
											: 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white',
									)}
								>
									<span aria-hidden>{entry.emoji} </span>
									{entry.name} {entry.count}
								</button>
							))}
						</div>

						<div className="mt-6 overflow-hidden rounded-xl border border-white/10">
							{visible.length === 0 ? (
								<p className="px-5 py-10 text-center text-[14px] text-gray-500">
									No command matches “{query}”.
								</p>
							) : (
								<div className="divide-y divide-white/[0.07]">
									{visible.map((command) => (
										<CommandRow key={command.name} command={command} />
									))}
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CommandExplorer;
