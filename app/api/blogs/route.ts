import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

function slugify(title: string) {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

export async function POST(req: NextRequest) {
	try {
		const {
			blog_title,
			blog_slug,
			blog_img,
			// blog_category,
			blog_upload_date,
			blog_post,
		} = await req.json();

		if (!blog_title || !blog_img || !blog_post) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			);
		}

		const supabase = await createSupabaseServerClient();

		const { error } = await supabase.from('blogs').insert({
			blog_title,
			blog_slug: blog_slug || slugify(blog_title),
			blog_img,
			// blog_category,
			blog_upload_date: blog_upload_date || null,
			blog_post,
		});

		if (error) {
			console.error('BLOG INSERT ERROR:', error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json(
			{ message: 'Post created successfully' },
			{ status: 200 },
		);
	} catch (err) {
		console.error('BLOG API ERROR:', err);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
