'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

type BlogData = {
	blog_title: string;
	blog_img: string;
	blog_post: string | null;
	blog_upload_date: string | null;
};

const fallbackBlog: BlogData = {
	blog_title: 'Sample Blog',
	blog_img: '/author.jpg',
	blog_post: `Lorem ipsum dolor sit amet consectetur. Luctus nunc
imperdiet convallis enim. Duis aliquam semper nibh viverra
elit facilisi sapien velit vulputate. Augue accumsan urna
arcu scelerisque. Amet non tempus purus id metus. Porttitor
diam mattis risus id pharetra sem. Vestibulum vivamus tortor
viverra ac gravida. In erat felis aliquam gravida ac. Vitae
scelerisque est non risus dignissim tempus placerat ipsum
nunc. Enim proin ultrices sed ac convallis...`,
	blog_upload_date: null,
};

export default function BlogPage() {
	const params = useParams(); // expects { slug: string }
	const { slug } = params;

	const [blog, setBlog] = useState<BlogData>(fallbackBlog);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadBlog() {
			if (!slug) return;

			const { data, error } = await supabase
				.from('blogs')
				.select('blog_title, blog_img, blog_post, blog_upload_date')
				.eq('slug', slug)
				.single();

			console.debug('fetched blog:', { data, error });

			if (!error && data) {
				let imageUrl = data.blog_img ?? fallbackBlog.blog_img;

				// If the image is a Supabase Storage path (not a full URL), get public URL
				try {
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
				} catch (err) {
					console.warn('Failed to get public URL:', err);
				}

				setBlog({
					blog_title: data.blog_title,
					blog_img: imageUrl,
					blog_post: data.blog_post ?? fallbackBlog.blog_post,
					blog_upload_date: data.blog_upload_date,
				});
			}

			setLoading(false);
		}

		loadBlog();
	}, [slug]);

	// Format date as dd/mm/yyyy or "Recent"
	const formattedDate = blog.blog_upload_date
		? new Date(blog.blog_upload_date).toLocaleDateString('en-GB')
		: 'Recent';

	// Split blog_post into paragraphs by double newline
	const paragraphs = blog.blog_post ? blog.blog_post.split(/\n\s*\n/) : [];

	return (
		<div className="mainContent blogArticle">
			<div className="blogHero">
				<img
					src={blog.blog_img ?? fallbackBlog.blog_img}
					alt={blog.blog_title}
				/>
				<div className="blogDate">
					<p className="uploadDate">{formattedDate}</p>
				</div>
			</div>

			<div className="blogBody">
				<h2 className="blogHeading">{blog.blog_title}</h2>

				{loading ? (
					<p>Loading...</p>
				) : paragraphs.length > 0 ? (
					paragraphs.map((para, idx) => (
						<p key={idx} className="blogPost">
							{para}
						</p>
					))
				) : (
					<p className="blogPost">{fallbackBlog.blog_post}</p>
				)}
			</div>
		</div>
	);
}
