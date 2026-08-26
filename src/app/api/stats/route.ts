import { NextRequest, NextResponse } from 'next/server';

import { getStatsBundle } from '@/lib/stats-api';

const clampLimit = (value: string | null, fallback: number): number => {
	const parsed = Number.parseInt(value ?? '', 10);
	if (!Number.isFinite(parsed) || parsed < 1) return fallback;
	return Math.min(parsed, 100); // the bot caps limits at 100
};

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	try {
		const bundle = await getStatsBundle({
			songs: clampLimit(searchParams.get('songs') ?? searchParams.get('limit'), 20),
			requesters: clampLimit(searchParams.get('requesters'), 10),
			playtime: clampLimit(searchParams.get('playtime'), 10),
			servers: clampLimit(searchParams.get('servers'), 10),
		});
		return NextResponse.json(bundle);
	} catch (error) {
		console.error('Error fetching stats data:', error);
		return NextResponse.json(
			{ status: 'error', message: 'Failed to fetch stats data' },
			{ status: 500 },
		);
	}
};

export const dynamic = 'force-dynamic';
