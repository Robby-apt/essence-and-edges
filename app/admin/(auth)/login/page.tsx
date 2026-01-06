'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function Login() {
	const router = useRouter();

	const currentHour = new Date().getHours();
	let greeting =
		currentHour < 12
			? 'Good morning'
			: currentHour < 18
			? 'Good afternoon'
			: 'Good evening';

	const [loginCredentials, setLoginCredentials] = useState({
		loginEmail: '',
		loginPassword: '',
	});

	function handleLoginInputChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const { name, value } = event.target;
		setLoginCredentials((prev) => ({ ...prev, [name]: value }));
	}

	async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const { loginEmail, loginPassword } = loginCredentials;

		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword,
		});

		if (error) {
			alert(error.message);
			return;
		}

		console.log('Logged in:', data.session);
		router.replace('/admin/dashboard');
	}

	return (
		<div className="mainContent">
			<div className="loginFormSection">
				<h2>{greeting} Bella 👋</h2>

				<form onSubmit={handleLoginSubmit} className="loginForm">
					<div className="loginSection">
						<label htmlFor="loginEmail">Email:</label>
						<input
							type="email"
							id="loginEmail"
							name="loginEmail"
							value={loginCredentials.loginEmail}
							onChange={handleLoginInputChange}
							required
						/>
					</div>

					<div className="loginSection">
						<label htmlFor="loginPassword">Password:</label>
						<input
							type="password"
							id="loginPassword"
							name="loginPassword"
							value={loginCredentials.loginPassword}
							onChange={handleLoginInputChange}
							required
						/>
					</div>

					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}
