import { NextRequest, NextResponse } from 'next/server';

import { feedbackCategories, feedbackLimits } from '@/constants';
import { FeedbackCategory } from '@/enums';
import { sendFeedbackWebhook } from '@/lib/discord-webhook';
import { FeedbackResponse } from '@/types';

/**
 * Receives the feedback form and forwards it to the Discord webhook. Every
 * field is re-validated here — the browser's checks are a convenience only.
 */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

/**
 * Per-IP submission times. The app runs as a single long-lived server, so an
 * in-memory window is enough; it resets on deploy, which is acceptable here.
 */
const submissions = new Map<string, number[]>();

const clientKey = (request: NextRequest): string => {
	const forwarded = request.headers.get('x-forwarded-for');
	return (
		forwarded?.split(',')[0]?.trim() ||
		request.headers.get('x-real-ip')?.trim() ||
		'unknown'
	);
};

/** Returns false once an address has used up its window. */
const withinRateLimit = (key: string): boolean => {
	const now = Date.now();
	const recent = (submissions.get(key) ?? []).filter(
		(at) => now - at < RATE_LIMIT_WINDOW_MS,
	);

	if (recent.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
		submissions.set(key, recent);
		return false;
	}

	recent.push(now);
	submissions.set(key, recent);

	// Opportunistic cleanup so the map cannot grow without bound.
	if (submissions.size > 5000) {
		for (const [entry, times] of submissions) {
			if (times.every((at) => now - at >= RATE_LIMIT_WINDOW_MS)) {
				submissions.delete(entry);
			}
		}
	}

	return true;
};

const validCategories = new Set(feedbackCategories.map((option) => option.value));

/** Modern handles (`someone`, `@someone`) and legacy `Name#1234` tags. */
const USERNAME_PATTERN = /^@?(?:[a-z0-9._]{2,32}|[^\s#@`]{2,32}#\d{4})$/i;

const fail = (message: string, status: number) =>
	NextResponse.json<FeedbackResponse>({ success: false, message }, { status });

export const POST = async (request: NextRequest) => {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return fail('That request could not be read. Please try again.', 400);
	}

	const payload = (body ?? {}) as Record<string, unknown>;

	// Honeypot: hidden from real users, so anything here is automated.
	if (typeof payload.website === 'string' && payload.website.trim() !== '') {
		return NextResponse.json<FeedbackResponse>({
			success: true,
			message: 'Thanks for the feedback!',
		});
	}

	const rating = Number(payload.rating);
	if (
		!Number.isInteger(rating) ||
		rating < feedbackLimits.ratingMin ||
		rating > feedbackLimits.ratingMax
	) {
		return fail('Pick a star rating before sending.', 400);
	}

	const category = String(payload.category ?? '') as FeedbackCategory;
	if (!validCategories.has(category)) {
		return fail('Choose what your feedback is about.', 400);
	}

	const message = typeof payload.message === 'string' ? payload.message.trim() : '';
	if (message.length < feedbackLimits.messageMin) {
		return fail(
			`Tell us a little more — at least ${feedbackLimits.messageMin} characters.`,
			400,
		);
	}
	if (message.length > feedbackLimits.messageMax) {
		return fail(
			`That is a bit long — keep it under ${feedbackLimits.messageMax} characters.`,
			400,
		);
	}

	const rawUsername =
		typeof payload.discordUsername === 'string'
			? payload.discordUsername.trim().replace(/^@/, '')
			: '';
	if (rawUsername && !USERNAME_PATTERN.test(rawUsername)) {
		return fail('That does not look like a Discord username.', 400);
	}

	if (!withinRateLimit(clientKey(request))) {
		return fail(
			'You have sent a few already — try again in about ten minutes.',
			429,
		);
	}

	try {
		await sendFeedbackWebhook({
			rating,
			category,
			message,
			discordUsername: rawUsername || undefined,
		});
	} catch (error) {
		console.error('Error delivering feedback to Discord:', error);

		const detail = error instanceof Error ? error.message : '';
		const misconfigured = detail.startsWith('DISCORD_FEEDBACK_WEBHOOK_URL');

		// In development the real reason (Discord's own 400 body, say) is far more
		// use than a polite apology; production keeps it out of the browser.
		if (process.env.NODE_ENV === 'development' && detail) {
			return fail(detail, misconfigured ? 503 : 502);
		}

		return fail(
			misconfigured
				? 'Feedback is not configured on this server yet.'
				: 'We could not deliver that right now. Please try again shortly.',
			misconfigured ? 503 : 502,
		);
	}

	return NextResponse.json<FeedbackResponse>({
		success: true,
		message: 'Thanks — your feedback is with the team.',
	});
};

export const dynamic = 'force-dynamic';
