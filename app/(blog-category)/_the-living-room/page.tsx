'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import ArticleCard from '@/app/_components/ArticleCard';

type Blog = {
	id: number;
	blog_title: string;
	blog_category: string;
	blog_upload_date: string;
	blog_img: string | null;
	blog_slug: string;
};

export default function TheLivingRoom() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);

	const categorySlug = 'the-living-room';
	const categoryTitle = 'The Living Room';

	useEffect(() => {
		async function fetchBlogs() {
			const { data, error } = await supabase
				.from('blogs')
				.select(
					'id, blog_title, blog_category, blog_upload_date, blog_img, blog_slug'
				)
				.eq('blog_category', categorySlug)
				.order('blog_upload_date', { ascending: false });

			if (!error && data) setBlogs(data);
			setLoading(false);
		}

		fetchBlogs();
	}, []);

	return (
		<div className="mainContent categoryPage">
			<div className="categoryTitle">
				<h2>{categoryTitle}</h2>
			</div>

			<div className="blogArticleGrid">
				{loading ? (
					<p>Loading...</p>
				) : blogs.length > 0 ? (
					blogs.map((blog) => (
						<ArticleCard
							key={blog.id}
							article={{
								title: blog.blog_title,
								category: blog.blog_category,
								date: new Date(
									blog.blog_upload_date
								).toLocaleDateString(),
								img: blog.blog_img || '/author.jpg',
								readMoreLink: `/${blog.blog_category}/${blog.blog_slug}`,
							}}
						/>
					))
				) : (
					<p className="noBlogs">
						No posts yet. Check back soon for new content ✨
					</p>
				)}
			</div>
		</div>
	);
}
