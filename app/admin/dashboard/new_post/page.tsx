'use client';
import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase/client';
import categoriesList from './categoriesList';

// Helper to create URL-friendly slugs
function slugify(text: string) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // remove special chars
		.replace(/\s+/g, '-'); // spaces → hyphens
}

export default function NewPost() {
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState(categoriesList[0].value);
	const [date, setDate] = useState('');
	const [content, setContent] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0] || null;
		setImageFile(file);
		setImagePreview(file ? URL.createObjectURL(file) : null);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!imageFile) return alert('Please select an image');

		// Upload image to Supabase storage
		const path = `blogs/${Date.now()}-${imageFile.name}`;
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('images')
			.upload(path, imageFile);

		if (uploadError) return alert(uploadError.message);

		const { data: urlData } = supabase.storage
			.from('images')
			.getPublicUrl(uploadData.path);

		// Generate slug from title
		const blog_slug = slugify(title);

		// Save blog in Supabase
		const res = await fetch('/api/blogs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				blog_title: title,
				blog_slug,
				blog_img: urlData.publicUrl,
				blog_category: category,
				blog_upload_date: date,
				blog_post: content,
			}),
		});

		if (res.ok) {
			alert('Post created');
			resetForm();
		} else {
			const errorData = await res.json();
			alert('Error creating post: ' + errorData.error);
		}
	}

	function resetForm() {
		setTitle('');
		setCategory(categoriesList[0].value);
		setDate('');
		setContent('');
		setImageFile(null);
		setImagePreview(null);
	}

	return (
		<div className="newPost">
			<h2>Create New Blog Post</h2>

			{imagePreview && <img src={imagePreview} alt="Preview" />}

			<form onSubmit={handleSubmit}>
				<div className="blogInput">
					<label>Title:</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>

				<div className="blogInput">
					<label>Image:</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						required
					/>
				</div>

				<div className="blogInput">
					<label>Category:</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						{categoriesList.map((c) => (
							<option key={c.id} value={c.value}>
								{c.catName}
							</option>
						))}
					</select>
				</div>

				<div className="blogInput">
					<label>Date:</label>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</div>

				<div className="blogInput">
					<label>Blog Post:</label>
					<textarea
						rows={15}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</div>

				<div className="newPostBtns">
					<button type="submit">Create Post</button>
					<button type="reset" onClick={resetForm}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
