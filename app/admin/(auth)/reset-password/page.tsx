'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
	const [password, setPassword] = useState('');
	const router = useRouter();

	async function handleSubmit() {
		const { error } = await supabase.auth.updateUser({ password });

		if (error) {
			alert(error.message);
		} else {
			alert('Password updated successfully');
			router.replace('/admin/login');
		}
	}

	return (
		<div className="mainContent">
			<div className="loginFormSection">
				<h2>Reset Password</h2>
				<form onSubmit={handleSubmit} className="loginForm">
					<div className="loginSection">
						<label htmlFor="loginPassword">New Password:</label>
						<input
							type="password"
							id="loginPassword"
							name="loginPassword"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button type="submit">Set New Password</button>
				</form>
			</div>
		</div>
	);
}
