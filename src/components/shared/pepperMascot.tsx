import { cn } from '@/lib/utils';

/**
 * Pepper, drawn as vector art rather than the rendered PNG in `/public/images`.
 *
 * The raster mascot ships a baked-in peach background and drop shadow, which is
 * why every existing placement crops it to a circle to hide them. Redrawing it
 * as paths solves that and buys the parts we need to animate: the stem, the
 * eyes and the ear cups each move on their own.
 *
 * Every animation lives in `globals.css` under `.pepper-*`, is CSS-only so this
 * stays a server component, and is switched off under `prefers-reduced-motion`.
 * `idle` is the ambient loop; turn it off for favicon-sized placements where the
 * motion is too small to read as anything but noise. Pass `decorative` where the
 * mascot sits inside an already-labelled control, so it is not announced twice.
 */
const PepperMascot = ({
	className,
	idle = true,
	decorative = false,
	title = 'Pepper, a bell pepper wearing headphones',
}: {
	className?: string;
	idle?: boolean;
	decorative?: boolean;
	title?: string;
}) => (
	<svg
		viewBox="0 0 200 200"
		xmlns="http://www.w3.org/2000/svg"
		{...(decorative
			? { 'aria-hidden': true as const, focusable: false as const }
			: { role: 'img' as const, 'aria-label': title })}
		className={cn('pepper', idle && 'pepper--idle', className)}
	>
		{/* Contact shadow. Anchors the body so the bob reads as lift, not drift. */}
		<ellipse
			className="pepper__shadow"
			cx="100"
			cy="188"
			rx="46"
			ry="7"
			fill="var(--pepper-shadow)"
		/>

		<g className="pepper__rig">
			{/* Headband first: the stem crosses in front of it, as it would in life. */}
			<path
				d="M 24 118 A 76 76 0 0 1 176 118"
				fill="none"
				stroke="var(--pepper-gear)"
				strokeWidth="8"
				strokeLinecap="round"
			/>

			{/* Body, drawn top-down: round shoulders, three lobes along the bottom. */}
			<g className="pepper__body">
				<path
					d="M 100 56
					   C 136 56 166 82 166 116
					   C 166 148 152 178 134 178
					   C 126 178 122 170 118 164
					   C 114 171 108 175 100 175
					   C 92 175 86 171 82 164
					   C 78 170 74 178 66 178
					   C 48 178 34 148 34 116
					   C 34 82 64 56 100 56 Z"
					fill="var(--pepper-red)"
				/>
				{/* Gloss. Two soft ovals angled along the shoulder read as a shine;
				    a crescent along the same contour reads as a split in the skin. */}
				<ellipse
					cx="70"
					cy="94"
					rx="8.5"
					ry="18"
					transform="rotate(-34 70 94)"
					fill="var(--pepper-red-light)"
					opacity="0.55"
				/>
				<ellipse
					cx="85"
					cy="79"
					rx="4"
					ry="7"
					transform="rotate(-34 85 79)"
					fill="var(--pepper-red-light)"
					opacity="0.4"
				/>

				<g className="pepper__face">
					<g className="pepper__eyes">
						<ellipse
							cx="82"
							cy="116"
							rx="6.5"
							ry="8"
							fill="var(--pepper-face)"
						/>
						<ellipse
							cx="118"
							cy="116"
							rx="6.5"
							ry="8"
							fill="var(--pepper-face)"
						/>
						<circle cx="84.5" cy="113" r="2" fill="var(--pepper-glint)" />
						<circle cx="120.5" cy="113" r="2" fill="var(--pepper-glint)" />
					</g>
					<path
						d="M 87 137 Q 100 148 113 137"
						fill="none"
						stroke="var(--pepper-face)"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
				</g>
			</g>

			{/* Calyx and stem, hinged at the crown so the sway pivots correctly. */}
			<g className="pepper__stem">
				<path
					d="M 100 64 C 90 62 83 58 80 52 C 87 49 94 50 100 54
					   C 106 50 113 49 120 52 C 117 58 110 62 100 64 Z"
					fill="var(--pepper-green-dark)"
				/>
				<path
					d="M 99 60 C 96 46 98 32 106 26 C 113 21 121 24 122 31 C 123 37 118 41 114 38"
					fill="none"
					stroke="var(--pepper-green)"
					strokeWidth="7"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>

			{/* Ear cups pulse off-beat from one another, as if tracking a bassline. */}
			<g className="pepper__cup pepper__cup--left">
				<rect
					x="8"
					y="100"
					width="32"
					height="52"
					rx="15"
					fill="var(--pepper-gear)"
				/>
				<rect
					x="14"
					y="107"
					width="20"
					height="38"
					rx="10"
					fill="var(--pepper-gear-light)"
				/>
			</g>
			<g className="pepper__cup pepper__cup--right">
				<rect
					x="160"
					y="100"
					width="32"
					height="52"
					rx="15"
					fill="var(--pepper-gear)"
				/>
				<rect
					x="166"
					y="107"
					width="20"
					height="38"
					rx="10"
					fill="var(--pepper-gear-light)"
				/>
			</g>
		</g>
	</svg>
);

export default PepperMascot;
