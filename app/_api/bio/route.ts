import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
	try {
		const { bio_img, bio_text } = await req.json();

		const supabase = await createSupabaseServerClient();

		const { error } = await supabase.from('bio').upsert({
			id: true, // singleton row
			bio_img,
			bio_text,
			updated_at: new Date().toISOString(),
		});

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({
			message: 'Bio updated successfully',
		});
	} catch (err) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
