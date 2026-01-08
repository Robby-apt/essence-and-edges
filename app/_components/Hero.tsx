'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

type BlogData = {
	blog_title: string;
	blog_img: string | null;
	blog_upload_date: string | null;
	slug: string;
	blog_category: string;
};

const fallbackBlog: BlogData = {
	blog_title: `How meditation helps me relax
and boost my energy levels`,
	blog_img: '/hero-bg.jpg',
	blog_upload_date: '2025-11-03',
	slug: '',
	blog_category: '',
};

export default function Hero() {
	const [blog, setBlog] = useState<BlogData>(fallbackBlog);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadLatestBlog() {
			const { data, error } = await supabase
				.from('blogs')
				.select(
					'blog_title, blog_img, blog_upload_date, slug, blog_category'
				)
				.order('blog_upload_date', { ascending: false })
				.limit(1)
				.single();

			if (!error && data) {
				let imageUrl = data.blog_img ?? fallbackBlog.blog_img;

				if (
					imageUrl &&
					!imageUrl.startsWith('http') &&
					process.env.NEXT_PUBLIC_SUPABASE_BUCKET
				) {
					const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
					const { data: urlData } = supabase.storage
						.from(bucket)
						.getPublicUrl(imageUrl);
					if (urlData?.publicUrl) imageUrl = urlData.publicUrl;
				}

				setBlog({
					blog_title: data.blog_title,
					blog_img: imageUrl,
					blog_upload_date: data.blog_upload_date,
					slug: data.slug,
					blog_category: data.blog_category,
				});
			}

			setLoading(false);
		}

		loadLatestBlog();
	}, []);

	// Format date as dd/mm/yyyy or fallback to "Recent"
	const formattedDate = blog.blog_upload_date
		? new Date(blog.blog_upload_date).toLocaleDateString('en-GB')
		: 'Recent';

	// Build the read more link: /{category}/{slug} or fallback to home
	const readMoreLink =
		blog.slug && blog.blog_category
			? `/${blog.blog_category}/${blog.slug}`
			: '/';

	return (
		<div
			className="heroSection"
			style={{
				backgroundImage: `url('${
					blog.blog_img ?? fallbackBlog.blog_img
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
