import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCALE, getCommands, isLocaleShaped } from '@/lib/bot-catalogue';
import { clientKey, createRateLimiter, tooManyRequests } from '@/lib/rate-limit';

/**
 * Backs the language switcher on the features page. The catalogue itself is
 * cached for five minutes per locale, and there are only a handful of locales,
 * so in practice this route is answered from memory almost every time.
 *
 * The locale is shape-checked here rather than passed through: an unbounded
 * `?locale=` would be a free way to create cache keys and upstream requests.
 */

const limiter = createRateLimiter({ windowMs: 60_000, max: 30 });

export const GET = async (request: NextRequest) => {
	const limit = limiter(clientKey(request));
	if (!limit.allowed) return tooManyRequests(limit);

	const requested = request.nextUrl.searchParams.get('locale');
	if (requested && !isLocaleShaped(requested)) {
		return NextResponse.json(
			{ status: 'error', message: 'Invalid locale' },
			{ status: 400, headers: { 'Cache-Control': 'no-store' } },
		);
	}

	try {
		const catalogue = await getCommands(requested ?? DEFAULT_LOCALE);
		return NextResponse.json(catalogue, {
			headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
		});
	} catch (error) {
		console.error('Error fetching command catalogue:', error);
		return NextResponse.json(
			{ status: 'error', message: 'Failed to fetch commands' },
			{ status: 503, headers: { 'Cache-Control': 'no-store' } },
		);
	}
};
