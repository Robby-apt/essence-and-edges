'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminRoot() {
	const router = useRouter();

	useEffect(() => {
		const run = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				router.replace('/admin/dashboard');
			} else {
				router.replace('/admin/login');
			}
		};

		run();
	}, [router]);

	return <p>Checking session...</p>;
}
