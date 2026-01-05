import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

function slugify(title: string) {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

export async function POST(req: NextRequest) {
	try {
		const { titleInput, imageInput, categoryInput, dateInput, postInput } =
			await req.json();

		const { error } = await supabaseServer()
			.from('blogs')
			.insert({
				blog_title: titleInput,
				blog_slug: slugify(titleInput),
				blog_img: imageInput,
				blog_category: categoryInput,
				blog_upload_date: dateInput,
				blog_post: postInput,
			});

		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });

		return NextResponse.json({ message: 'Post created successfully' });
	} catch (err) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
