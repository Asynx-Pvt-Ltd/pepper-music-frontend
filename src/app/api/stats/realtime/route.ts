import { NextResponse } from 'next/server';

import { getRealtime } from '@/lib/stats-api';

/** Polled by the live "now playing" card, so it is never cached. */
export const GET = async () => {
	try {
		return NextResponse.json(await getRealtime());
	} catch (error) {
		console.error('Error fetching realtime stats:', error);
		return NextResponse.json(
			{ status: 'error', message: 'Failed to fetch realtime stats' },
			{ status: 500 },
		);
	}
};

export const dynamic = 'force-dynamic';
