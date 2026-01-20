'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		async function checkSession() {
			// 🔓 public admin routes
			if (
				pathname === '/admin/login' ||
				pathname === '/admin/reset-password'
			) {
				return;
			}

			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) {
				router.replace('/admin/login');
			}
		}

		checkSession();
	}, [router, pathname]);

	return <>{children}</>;
}
