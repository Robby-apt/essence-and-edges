import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
	try {
		const { bioImgInput, bioInfoInput } = await req.json();

		const { error } = await supabaseServer().from('bio').upsert({
			id: true, // singleton
			bio_img: bioImgInput,
			bio_text: bioInfoInput,
			updated_at: new Date(),
		});

		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });

		return NextResponse.json({ message: 'Bio updated successfully' });
	} catch (err) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
