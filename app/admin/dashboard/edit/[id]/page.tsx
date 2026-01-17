'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
// import categoriesList from '../../dashboard/new_post/categoriesList';

function slugify(text: string) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

export default function EditBlog() {
	const params = useParams();
	const router = useRouter();

	const blog_id = Array.isArray(params.id) ? params.id[0] : params.id;

	const [title, set_title] = useState('');
	// const [category, set_category] = useState('');
	const [content, set_content] = useState('');
	const [image_file, set_image_file] = useState<File | null>(null);
	const [image_preview, set_image_preview] = useState<string | null>(null);
	const [loading, set_loading] = useState(true);

	// 🔹 Load blog data
	useEffect(() => {
		async function load_blog() {
			const { data, error } = await supabase
				.from('blogs')
				.select('*')
				.eq('id', blog_id)
				.single();

			if (error || !data) {
				alert('Blog not found');
				router.replace('/admin/dashboard');
				return;
			}

			set_title(data.blog_title);
			// set_category(data.blog_category);
			set_content(data.blog_post);
			set_image_preview(data.blog_img);
			set_loading(false);
		}

		if (blog_id) load_blog();
	}, [blog_id, router]);

	function handle_image_change(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		set_image_file(file);
		set_image_preview(URL.createObjectURL(file));
	}

	async function handle_submit(e: React.FormEvent) {
		e.preventDefault();

		let blog_img_url = image_preview || '';

		// Upload new image if selected
		if (image_file) {
			const file_path = `blogs/${blog_id}-${Date.now()}.${image_file.name
				.split('.')
				.pop()}`;

			const { error: upload_error } = await supabase.storage
				.from('images')
				.upload(file_path, image_file);

			if (upload_error) {
				alert(upload_error.message);
				return;
			}

			const { data } = supabase.storage
				.from('images')
				.getPublicUrl(file_path);

			blog_img_url = data.publicUrl;
		}

		const { error } = await supabase
			.from('blogs')
			.update({
				blog_title: title,
				blog_slug: slugify(title),
				// blog_category: category,
				blog_post: content,
				blog_img: blog_img_url,
			})
			.eq('id', blog_id);

		if (error) {
			alert(error.message);
		} else {
			alert('Post updated!');
			router.push('/admin/dashboard');
		}
	}

	function reset_form() {
		router.back();
	}

	if (loading) return <p>Loading...</p>;

	return (
		<div className="newPost editPost">
			<h2>Edit Blog Post</h2>

			{image_preview && <img src={image_preview} alt={title} />}

			<form onSubmit={handle_submit}>
				<div className="blogInput">
					<label>Title:</label>
					<input
						value={title}
						onChange={(e) => set_title(e.target.value)}
						required
					/>
				</div>

				<div className="blogInput">
					<label>Image:</label>
					<input
						type="file"
						accept="image/*"
						onChange={handle_image_change}
					/>
				</div>

				{/* <div className="blogInput">
					<label>Category:</label>
					<select
						value={category}
						onChange={(e) => set_category(e.target.value)}
					>
						{categoriesList.map((c) => (
							<option key={c.id} value={c.value}>
								{c.catName}
							</option>
						))}
					</select>
				</div> */}

				<div className="blogInput">
					<label>Blog Post:</label>
					<textarea
						rows={15}
						value={content}
						onChange={(e) => set_content(e.target.value)}
						required
					/>
				</div>

				<div className="newPostBtns">
					<button type="submit">Edit Post</button>
					<button type="button" onClick={reset_form}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
