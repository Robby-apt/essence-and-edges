'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import ArticleRow from './ArticleRow';

type Blog = {
	id: number;
	blog_title: string;
	blog_img: string | null;
};

export default function BlogListDisplay() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadBlogs() {
			const { data, error } = await supabase
				.from('blogs')
				.select('id, blog_title, blog_img')
				.order('id', { ascending: false });

			if (!error && data) setBlogs(data);
			setLoading(false);
		}

		loadBlogs();
	}, []);

	function removeBlogFromState(id: number) {
		setBlogs((prev) => prev.filter((b) => b.id !== id));
	}

	return (
		<div className="dashboardContent blogListDisplay">
			<h3>Manage your posts here</h3>

			{loading ? (
				<p>Loading...</p>
			) : blogs.length === 0 ? (
				<p className="noPost">
					No posts yet. Create your first post to get started!
				</p>
			) : (
				blogs.map((blog) => (
					<ArticleRow
						key={blog.id}
						blog={blog}
						onDelete={removeBlogFromState}
					/>
				))
			)}
		</div>
	);
}
