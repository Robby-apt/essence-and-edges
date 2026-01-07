'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardBtns() {
	const router = useRouter();

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			alert(error.message);
			return;
		}

		router.replace('/admin/login');
	}

	return (
		<div className="dashboardBtns">
			<Link className="dashboardBtn" href="/admin/dashboard/new_post">
				+ New Post
			</Link>
			<button onClick={handleLogout} className="dashboardBtn">
				Log out
			</button>
		</div>
	);
}
