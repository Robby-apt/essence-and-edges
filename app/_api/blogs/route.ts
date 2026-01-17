import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient as supabaseServer } from '@/lib/supabase/server';

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
			titleInput,
			imageInput,
			// categoryInput,
			dateInput,
			postInput,
		} = await req.json();

		// Basic validation
		if (!titleInput || !imageInput || !postInput) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		const supabase = await supabaseServer();

		const { error } = await supabase.from('blogs').insert({
			blog_title: titleInput,
			blog_slug: slugify(titleInput),
			blog_img: imageInput,
			// blog_category: categoryInput,
			blog_upload_date: dateInput || null,
			blog_post: postInput,
		});

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: 'Post created successfully' },
			{ status: 200 }
		);
	} catch (err) {
		console.error('BLOG CREATE ERROR:', err);

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
