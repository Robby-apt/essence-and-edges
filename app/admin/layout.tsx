'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	useEffect(() => {
		async function checkSession() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) {
				router.replace('/admin/login');
			}
		}

		checkSession();
	}, [router]);

	return <>{children}</>;
}
