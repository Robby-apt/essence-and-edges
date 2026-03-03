import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json(
				{ error: 'Email is required' },
				{ status: 400 },
			);
		}

		const response = await fetch(
			`https://api.convertkit.com/v3/forms/9155969/subscribe`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					api_secret: process.env.KIT_API_SECRET,
					email,
				}),
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 },
		);
	}
}
