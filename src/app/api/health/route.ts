import { NextRequest, NextResponse } from 'next/server';

import { clientKey, createRateLimiter, tooManyRequests } from '@/lib/rate-limit';
import { fetchUpstream, withCache } from '@/lib/upstream';

/**
 * Liveness probe for the bot's API. Answers from a 15s in-process copy so an
 * external monitor pointed at this route cannot turn into constant traffic
 * against the bot.
 */

const limiter = createRateLimiter({ windowMs: 60_000, max: 20 });

/** The bot's languages endpoint is the cheapest thing it serves — no DB, no cache miss cost. */
const probe = () =>
	// A short failure cooldown: a probe should notice recovery quickly, but not
	// retry a dead endpoint on every single request either.
	withCache('health', { ttlMs: 15_000, staleMs: 0, failureCooldownMs: 5_000 }, () =>
		fetchUpstream<{ total: number }>('/languages', { timeoutMs: 4_000 }),
	);

export const GET = async (request: NextRequest) => {
	const limit = limiter(clientKey(request));
	if (!limit.allowed) return tooManyRequests(limit);

	try {
		await probe();
		return NextResponse.json(
			{ status: 'healthy', timestamp: new Date().toISOString() },
			{ headers: { 'Cache-Control': 'public, max-age=10' } },
		);
	} catch (error) {
		console.error('Error fetching health data:', error);
		return NextResponse.json(
			{ status: 'error', message: 'Bot API is unreachable' },
			{ status: 503, headers: { 'Cache-Control': 'no-store' } },
		);
	}
};

export const dynamic = 'force-dynamic';
