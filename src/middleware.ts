import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { commonRoutes, menuItems } from './constants';

const menuRoutes = menuItems.map((item) => item.value);
const publicRoutes = commonRoutes.concat(menuRoutes);

export async function middleware(request: NextRequest) {
	const { pathname, search } = new URL(request.url);

	const isPublicRoute = publicRoutes.some(
		(route) => pathname.startsWith(route) || pathname === '/',
	);

	if (isPublicRoute) {
		return NextResponse.next();
	}

	// TODO: Is there we are going to implement a private route?
	// INFO: Now Itself its working as only for mentioned routes - Other routes to main. `/` routing to home page.
	const token = request.cookies.get('session')?.value;

	if (!token) {
		// Encode the current URL to use as the redirect destination after login
		const currentUrl = encodeURIComponent(pathname + search);
		return NextResponse.redirect(
			new URL(`/auth/login?redirect=${currentUrl}`, request.url),
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// `api` is excluded wholesale: every route under it is public and does its
		// own validation and rate limiting, and a new one should not need a change
		// here to stop being redirected to the login page.
		'/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sitemap|api).*)',
	],
};
