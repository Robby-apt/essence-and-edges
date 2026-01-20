'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

type BlogData = {
	blog_title: string;
	blog_img: string | null;
	blog_upload_date: string | null;
	blog_slug: string;
};

const fallbackBlog: BlogData = {
	blog_title: `How meditation helps me relax
and boost my energy levels`,
	blog_img: '/hero-bg.jpg',
	blog_upload_date: '2025-11-03',
	blog_slug: '',
};

export default function Hero() {
	const [blog, setBlog] = useState<BlogData>(fallbackBlog);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadLatestBlog() {
			const { data, error } = await supabase
				.from('blogs')
				.select('blog_title, blog_img, blog_upload_date, blog_slug')
				.order('blog_upload_date', { ascending: false })
				.limit(1)
				.maybeSingle(); // ✅ prevents 406 when table is empty

			if (error) {
				console.error('Hero blog load error:', error);
				setLoading(false);
				return;
			}

			// ✅ If blogs exist, replace fallback
			if (data) {
				setBlog({
					blog_title: data.blog_title,
					blog_img: data.blog_img ?? fallbackBlog.blog_img,
					blog_upload_date: data.blog_upload_date,
					blog_slug: data.blog_slug,
				});
			}

			setLoading(false);
		}

		loadLatestBlog();
	}, []);

	// Format date
	const formattedDate = blog.blog_upload_date
		? new Date(blog.blog_upload_date).toLocaleDateString('en-GB')
		: 'Recent';

	// Correct article route
	const readMoreLink = blog.blog_slug
		? `/all-blogs/${blog.blog_slug}`
		: '/all-blogs';

	return (
		<div
			className="heroSection"
			style={{
				backgroundImage: `url('${
					blog.blog_img || fallbackBlog.blog_img
				}')`,
			}}
		>
			<div className="heroDetails">
				<h2 className="blogTitle">{blog.blog_title}</h2>
				<p className="date">{formattedDate}</p>

				<Link href={readMoreLink}>Read more</Link>
			</div>
		</div>
	);
}
