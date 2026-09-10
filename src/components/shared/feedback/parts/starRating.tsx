'use client';

import React from 'react';
import { Star } from 'lucide-react';

import { feedbackLimits, feedbackRatingLabels } from '@/constants';
import { cn } from '@/lib/utils';

const stars = Array.from(
	{ length: feedbackLimits.ratingMax },
	(_, index) => index + 1
);

interface StarRatingProps {
	value: number;
	onChange: (rating: number) => void;
	disabled?: boolean;
}

/**
 * Five radio inputs behind star glyphs. Keeping real inputs means arrow-key
 * selection and screen-reader labelling come for free; hover and focus only
 * preview the score until one is actually chosen.
 */
export const StarRating: React.FC<StarRatingProps> = ({
	value,
	onChange,
	disabled = false,
}) => {
	const [preview, setPreview] = React.useState(0);
	const active = preview || value;

	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
			<div className="-ml-1 flex items-center" onMouseLeave={() => setPreview(0)}>
				{stars.map((star) => (
					<label
						key={star}
						onMouseEnter={() => !disabled && setPreview(star)}
						className={cn(
							'group rounded-md p-1 focus-within:ring-2 focus-within:ring-foreground/40',
							disabled ? 'cursor-not-allowed' : 'cursor-pointer'
						)}
					>
						<input
							type="radio"
							name="rating"
							value={star}
							checked={value === star}
							disabled={disabled}
							onChange={() => onChange(star)}
							// A click that lands before hydration leaves the DOM checked while
							// React state is still 0; `change` would then never fire again.
							onClick={() => onChange(star)}
							onFocus={() => setPreview(star)}
							onBlur={() => setPreview(0)}
							className="sr-only"
						/>
						<Star
							aria-hidden
							className={cn(
								'h-7 w-7 transition-colors',
								star <= value
									? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400'
									: star <= preview
										// Dimmer while only previewing, so the committed
										// score stays distinguishable from a hover.
										? 'fill-amber-500/50 text-amber-500/50 dark:fill-amber-400/50 dark:text-amber-400/50'
										: 'fill-transparent text-foreground/40 group-hover:text-foreground/55'
							)}
						/>
						<span className="sr-only">
							{`${star} out of ${feedbackLimits.ratingMax} — ${feedbackRatingLabels[star]}`}
						</span>
					</label>
				))}
			</div>

			<span
				className={cn(
					'text-sm transition-colors',
					value ? 'font-medium text-amber-600 dark:text-amber-200' : 'text-muted-foreground'
				)}
			>
				{active ? feedbackRatingLabels[active] : 'Pick a star'}
			</span>
		</div>
	);
};

export default StarRating;
