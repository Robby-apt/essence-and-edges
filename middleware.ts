import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return req.cookies.get(name)?.value;
				},
				set() {},
				remove() {},
			},
		}
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const pathname = req.nextUrl.pathname;

	// ✅ Allow login page without auth
	if (pathname === '/admin/login') {
		return res;
	}

	// ✅ Protect everything else under /admin
	if (pathname.startsWith('/admin') && !session) {
		return NextResponse.redirect(new URL('/admin/login', req.url));
	}

	return res;
}

export const config = {
	matcher: ['/admin/:path*'],
};
