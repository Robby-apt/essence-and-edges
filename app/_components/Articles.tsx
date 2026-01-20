'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { articles as fallbackArticles } from './props/articles';

type Article = {
	id: number | string;
	title: string;
	date: string;
	img: string;
	slug: string;
};

type Blog = {
	id: number;
	blog_title: string;
	blog_slug: string;
	blog_upload_date: string;
	blog_img: string | null;
};

export default function Articles() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadBlogs() {
			const { data, error } = await supabase
				.from('blogs')
				.select('id, blog_title, blog_slug, blog_upload_date, blog_img')
				.order('blog_upload_date', { ascending: false })
				.limit(3);

			if (!error && data && data.length > 0) {
				const mapped: Article[] = data.map((blog: Blog) => ({
					id: blog.id,
					title: blog.blog_title,
					date: new Date(blog.blog_upload_date).toLocaleDateString(),
					img: blog.blog_img || '/author.jpg',
					slug: blog.blog_slug,
				}));

				setArticles(mapped);
			} else {
				// fallback only if DB empty or error
				setArticles(
					fallbackArticles.map((a) => ({
						id: a.id,
						title: a.title,
						date: a.date,
						img: a.img,
						slug:
							a.readMoreLink
								.replace(/^\/+|\/+$/g, '')
								.split('/')
								.pop() || String(a.id),
					}))
				);
			}

			setLoading(false);
		}

		loadBlogs();
	}, []);

	return (
		<section className="articlesSection recent-articles">
			<h2>Recent Articles {'>'}</h2>

			<div className="articlesDisplay">
				{loading ? (
					<p>Loading...</p>
				) : (
					articles.map((article) => (
						<ArticleCard
							key={article.id}
							article={{
								title: article.title,
								date: article.date,
								img: article.img,
								readMoreLink: `/all-blogs/${article.slug}`,
							}}
						/>
					))
				)}
			</div>

			<div className="moreArticles">
				<Link href="/all-blogs">See more articles →</Link>
			</div>
		</section>
	);
}
