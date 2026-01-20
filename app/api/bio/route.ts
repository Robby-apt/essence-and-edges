import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
	try {
		const { bio_img, bio_text } = await req.json();

		const supabase = await createSupabaseServerClient();

		const { error } = await supabase.from('bio').upsert({
			id: 1, // ✅ fixed singleton row
			bio_img,
			bio_text,
			updated_at: new Date().toISOString(),
		});

		if (error) {
			console.error('BIO UPSERT ERROR:', error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({
			message: 'Bio updated successfully',
		});
	} catch (err) {
		console.error('BIO API ERROR:', err);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
