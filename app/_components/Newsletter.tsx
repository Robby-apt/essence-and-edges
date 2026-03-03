'use client';

import { useState } from 'react';

export default function Newsletter() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || 'Failed to subscribe');
			}

			setMessage('🎉 Successfully subscribed!');
			setEmail('');
		} catch (error: any) {
			setMessage(error.message);
		}

		setLoading(false);
	}

	return (
		<div className="newsletter">
			<img src="/newsletter.jpg" alt="Newsletter" className="mailImg" />

			<div className="newsletterInfo">
				<h2>Newsletter</h2>
				<p>Sign up for our newsletter to never miss a blog</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor="subEmail">Email:</label>
					<input
						type="email"
						id="subEmail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<button type="submit" disabled={loading}>
						{loading ? 'Subscribing...' : 'Subscribe'}
					</button>
				</form>

				{message && <p>{message}</p>}
			</div>
		</div>
	);
}
