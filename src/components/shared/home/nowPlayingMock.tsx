import { Disc3, ListMusic, Repeat2, SkipForward } from 'lucide-react';

/**
 * Stylised illustration of what Pepper puts in the channel after `/play`.
 *
 * This replaces the wordmark PNG that used to sit here — an opaque black
 * rectangle that punched a hole in the light theme and showed the logo on a page
 * that already says "Pepper" three times above it. A depiction of the output is
 * doing more work than a second logo.
 *
 * The track is placeholder copy, not a real response; swap it for whatever reads
 * best. Nothing here is fetched — it is an illustration, and it should not imply
 * a live reading.
 */

const Equalizer = () => (
	<span aria-hidden className="flex h-4 items-end gap-[3px]">
		{[0, 1, 2, 3, 4].map((bar) => (
			<span
				key={bar}
				className="eq__bar block h-full w-[3px] rounded-full bg-[var(--pepper-red)]"
			/>
		))}
	</span>
);

const NowPlayingMock = () => (
	<div className="overflow-hidden rounded-xl border border-border bg-surface">
		{/* Command line */}
		<div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
			<span className="flex h-5 w-5 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
				P
			</span>
			<code className="font-mono text-[13px] text-foreground">
				<span className="font-semibold">/play</span>{' '}
				<span className="text-muted-foreground">
					query: kite season — nightshift
				</span>
			</code>
		</div>

		{/* Response */}
		<div className="p-4">
			<p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
				Now playing
			</p>

			<div className="mt-3 flex items-center gap-3.5">
				{/* Vinyl, echoing the turntable in the Pepper wordmark. */}
				<span
					aria-hidden
					className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--pepper-face)] ring-1 ring-inset ring-foreground/10"
				>
					<span className="absolute inset-[7px] rounded-full border border-white/15" />
					<span className="absolute inset-[13px] rounded-full border border-white/10" />
					<Disc3 className="relative h-4 w-4 text-[var(--pepper-red)]" />
				</span>

				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2.5">
						<p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-foreground">
							Nightshift
						</p>
						<Equalizer />
					</div>
					<p className="mt-0.5 truncate text-[13px] text-muted-foreground">
						Kite Season · added by you
					</p>
				</div>
			</div>

			{/* Scrubber */}
			<div className="mt-4">
				<div
					aria-hidden
					className="h-1 overflow-hidden rounded-full bg-surface-strong"
				>
					<div className="h-full w-[36%] rounded-full bg-[var(--pepper-red)]" />
				</div>
				<div className="mt-2 flex items-center justify-between font-mono text-[11px] tabular-nums text-muted-foreground">
					<span>1:24</span>
					<span>3:52</span>
				</div>
			</div>
		</div>

		{/* Controls */}
		<div className="flex items-center gap-2 border-t border-border px-4 py-3">
			{[
				{ icon: <SkipForward className="h-3.5 w-3.5" />, label: 'Skip' },
				{ icon: <Repeat2 className="h-3.5 w-3.5" />, label: 'Loop' },
				{ icon: <ListMusic className="h-3.5 w-3.5" />, label: 'Queue' },
			].map((control) => (
				<span
					key={control.label}
					className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[12px] font-medium text-foreground/80"
				>
					{control.icon}
					{control.label}
				</span>
			))}
			<span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
				Spotify
			</span>
		</div>
	</div>
);

export default NowPlayingMock;
