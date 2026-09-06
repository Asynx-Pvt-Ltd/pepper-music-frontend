'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, MessageSquare, Send } from 'lucide-react';

import { ActionLink } from '@/components/shared/page/parts';
import {
	discordServerLink,
	feedbackCategories,
	feedbackLimits,
} from '@/constants';
import { FeedbackCategory } from '@/enums';
import { cn } from '@/lib/utils';
import { FeedbackCategoryOption, FeedbackResponse } from '@/types';
import { showToast } from '@/utils/toast';

import StarRating from './parts/starRating';

const initialForm = {
	rating: 0,
	category: FeedbackCategory.GENERAL,
	message: '',
	discordUsername: '',
};

const fieldClass =
	'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/30 focus:bg-white/[0.05] disabled:opacity-60';

const FieldLabel = ({
	htmlFor,
	children,
	optional = false,
}: {
	htmlFor?: string;
	children: React.ReactNode;
	optional?: boolean;
}) => (
	<label
		htmlFor={htmlFor}
		className="flex items-baseline gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60"
	>
		{children}
		{optional && (
			<span className="text-[11px] font-medium normal-case tracking-normal text-gray-500">
				optional
			</span>
		)}
	</label>
);

const CategoryChip = ({
	option,
	checked,
	disabled,
	onSelect,
}: {
	option: FeedbackCategoryOption;
	checked: boolean;
	disabled: boolean;
	onSelect: () => void;
}) => (
	<label
		className={cn(
			'cursor-pointer rounded-lg border p-4 transition-colors focus-within:ring-2 focus-within:ring-white/40',
			checked
				? 'border-white/40 bg-white/[0.07]'
				: 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]',
			disabled && 'cursor-not-allowed opacity-60'
		)}
	>
		<input
			type="radio"
			name="category"
			value={option.value}
			checked={checked}
			disabled={disabled}
			onChange={onSelect}
			// Also on click: a click that lands before hydration checks the input
			// natively, and `change` never fires again once the DOM already agrees.
			onClick={onSelect}
			className="sr-only"
		/>
		<span className="flex items-center gap-2 text-[15px] font-semibold text-white">
			<span
				aria-hidden
				className={cn(
					'h-1.5 w-1.5 rounded-full',
					checked ? 'bg-white' : 'bg-white/25'
				)}
			/>
			{option.label}
		</span>
		<span className="mt-1.5 block text-[13px] leading-relaxed text-gray-400">
			{option.hint}
		</span>
	</label>
);

/**
 * The feedback form. Four fields is the whole thing — a score, what it is
 * about, the note itself, and an optional handle so we can credit the sender.
 * Everything is re-validated in `/api/feedback` before it reaches Discord.
 */
export const FeedbackComponent: React.FC = () => {
	const [form, setForm] = React.useState(initialForm);
	const [submitting, setSubmitting] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);
	/** Honeypot value — hidden from real users, so anything here is a bot. */
	const [website, setWebsite] = React.useState('');

	const remaining = feedbackLimits.messageMax - form.message.length;
	const tooShort = form.message.trim().length < feedbackLimits.messageMin;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;

		if (!form.rating) {
			showToast('Add a rating', 'Pick a star before sending.', {
				type: 'warning',
			});
			return;
		}

		if (tooShort) {
			showToast(
				'Tell us a little more',
				`At least ${feedbackLimits.messageMin} characters, so we know what to act on.`,
				{ type: 'warning' }
			);
			return;
		}

		setSubmitting(true);

		try {
			const response = await fetch('/api/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rating: form.rating,
					category: form.category,
					message: form.message.trim(),
					discordUsername: form.discordUsername.trim() || undefined,
					website,
				}),
			});

			const result = (await response
				.json()
				.catch(() => null)) as FeedbackResponse | null;

			if (!response.ok || !result?.success) {
				throw new Error(
					result?.message ?? 'We could not send that. Please try again.'
				);
			}

			setSubmitted(true);
			showToast('Feedback sent', result.message);
		} catch (error) {
			showToast(
				'That did not go through',
				error instanceof Error
					? error.message
					: 'Something went wrong. Please try again.',
				{ type: 'error' }
			);
		} finally {
			setSubmitting(false);
		}
	};

	const reset = () => {
		setForm(initialForm);
		setWebsite('');
		setSubmitted(false);
	};

	// A plain swap rather than an animated exit: the confirmation has to appear
	// even when the animation never runs — a backgrounded tab, say.
	if (submitted) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2 }}
				className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-12"
			>
				<span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
					<CheckCircle2 className="h-6 w-6" />
				</span>
				<h2 className="mt-5 text-2xl font-bold tracking-tight text-white">
					Thanks — that landed with the team
				</h2>
				<p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-gray-400">
					Every submission is read. If yours turns into a fix or a feature, you
					will see it in the release notes — with your name on it if you left a
					Discord handle.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<ActionLink href={discordServerLink} external>
						<MessageSquare className="h-4 w-4" />
						Join the support server
					</ActionLink>
					<button
						type="button"
						onClick={reset}
						className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
					>
						Send more feedback
					</button>
				</div>
			</motion.div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="space-y-10 rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
		>
			{/* Rating */}
			<fieldset disabled={submitting}>
				<legend className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">
					How is Pepper treating you?
				</legend>
				<div className="mt-4">
					<StarRating
						value={form.rating}
						onChange={(rating) => setForm((current) => ({ ...current, rating }))}
						disabled={submitting}
					/>
				</div>
			</fieldset>

			{/* Category */}
			<fieldset disabled={submitting}>
				<legend className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">
					What is this about?
				</legend>
				<div className="mt-4 grid gap-3 sm:grid-cols-2">
					{feedbackCategories.map((option) => (
						<CategoryChip
							key={option.value}
							option={option}
							checked={form.category === option.value}
							disabled={submitting}
							onSelect={() =>
								setForm((current) => ({ ...current, category: option.value }))
							}
						/>
					))}
				</div>
			</fieldset>

			{/* Message */}
			<div>
				<FieldLabel htmlFor="feedback-message">Your feedback</FieldLabel>
				<textarea
					id="feedback-message"
					name="message"
					rows={6}
					required
					maxLength={feedbackLimits.messageMax}
					disabled={submitting}
					value={form.message}
					onChange={(event) =>
						setForm((current) => ({ ...current, message: event.target.value }))
					}
					placeholder="What happened, what you expected, and which command you were using. Specifics help us reproduce it."
					className={cn(fieldClass, 'mt-4 resize-y leading-relaxed')}
				/>
				<div className="mt-2 flex items-center justify-between text-[12px] text-gray-500">
					<span>
						{tooShort
							? `At least ${feedbackLimits.messageMin} characters`
							: 'Enough detail to act on — thank you'}
					</span>
					<span
						className={cn(
							'font-mono tabular-nums',
							remaining < 100 && 'text-gray-400'
						)}
					>
						{remaining}
					</span>
				</div>
			</div>

			{/* Discord handle */}
			<div>
				<FieldLabel htmlFor="feedback-username" optional>
					Discord username
				</FieldLabel>
				<input
					id="feedback-username"
					name="discordUsername"
					type="text"
					autoComplete="off"
					maxLength={feedbackLimits.usernameMax}
					disabled={submitting}
					value={form.discordUsername}
					onChange={(event) =>
						setForm((current) => ({
							...current,
							discordUsername: event.target.value,
						}))
					}
					placeholder="yourname"
					className={cn(fieldClass, 'mt-4')}
				/>
				<p className="mt-2 text-[13px] leading-relaxed text-gray-500">
					Leave it and we can follow up in the support server, credit you by name
					in the release announcement when your report ships, and send perks for
					the reports that help most. Leave it blank to stay anonymous.
				</p>
			</div>

			{/* Honeypot — display:none, so only automated fillers reach it. */}
			<div aria-hidden className="hidden">
				<label htmlFor="feedback-website">Website</label>
				<input
					id="feedback-website"
					name="website"
					type="text"
					tabIndex={-1}
					autoComplete="off"
					value={website}
					onChange={(event) => setWebsite(event.target.value)}
				/>
			</div>

			<div className="border-t border-white/10 pt-6">
				<button
					type="submit"
					disabled={submitting}
					className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{submitting ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Sending
						</>
					) : (
						<>
							<Send className="h-4 w-4" />
							Send feedback
						</>
					)}
				</button>
				<p className="mt-3 text-center text-[13px] text-gray-500">
					Goes straight to the maintainers. No account needed.
				</p>
			</div>
		</form>
	);
};

export default FeedbackComponent;
