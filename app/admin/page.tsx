'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminRoot() {
	const router = useRouter();

	useEffect(() => {
		const run = async () => {
			const { data, error } = await supabase.auth.getSession();

			console.log('Session check:', data.session);

			if (data.session) {
				router.replace('/admin/dashboard');
			} else {
				router.replace('/admin/login');
			}
		};

		run();
	}, [router]);

	return <p>Checking session...</p>;
}
