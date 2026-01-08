'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { articles as fallback_articles } from './props/articles';
import ArticleCard from './ArticleCard';

type Blog = {
	id: number;
	blog_title: string;
	blog_category: string;
	blog_slug: string;
	blog_upload_date: string;
	blog_img: string | null;
};

export default function Articles() {
	const [blogs, set_blogs] = useState<Blog[]>([]);
	const [loading, set_loading] = useState(true);

	useEffect(() => {
		async function load_blogs() {
			const { data, error } = await supabase
				.from('blogs')
				.select(
					'id, blog_title, blog_category, blog_slug, blog_upload_date, blog_img'
				)
				.order('blog_upload_date', { ascending: false })
				.limit(3);

			if (!error && data) set_blogs(data);
			set_loading(false);
		}

		load_blogs();
	}, []);

	const has_blogs = blogs.length > 0;

	return (
		<section className="articlesSection recent-articles">
			<h2>Recent Articles {'>'}</h2>

			<div className="articlesDisplay">
				{loading ? (
					<p>Loading...</p>
				) : has_blogs ? (
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
					fallback_articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))
				)}
			</div>

			<div className="moreArticles">
				<Link href="/all-blogs">See more articles →</Link>
			</div>
		</section>
	);
}
