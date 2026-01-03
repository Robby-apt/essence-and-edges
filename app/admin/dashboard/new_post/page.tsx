'use client';
import { redirect } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import categoriesList from './categoriesList';

export default function NewPost() {
	const [formInput, setFormInput] = useState({
		titleInput: '',
		imageInput: '',
		categoryInput: categoriesList[0].value,
		dateInput: '',
		postInput: '',
	});

	function handleFormChange(
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) {
		let { name, value } = event.target;
		setFormInput((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleFormSubmit(event: React.FormEvent) {
		event.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formInput);
	}

	function resetFormInput() {
		setFormInput({
			titleInput: '',
			imageInput: '',
			categoryInput: categoriesList[0].value,
			dateInput: '',
			postInput: '',
		});
	}

	return (
		<div className="newPost">
			<h2>Create New Blog Post</h2>

			<form action="" id="newPostForm" onSubmit={handleFormSubmit}>
				<div className="blogInput titleInput">
					<label htmlFor="titleInput">Title:</label>
					<input
						type="text"
						id="titleInput"
						name="titleInput"
						value={formInput.titleInput}
						onChange={handleFormChange}
						required
					/>
				</div>

				<div className="blogInput imageInput">
					<label htmlFor="imageInput">Image URL:</label>
					<input
						type="text"
						id="imageInput"
						name="imageInput"
						value={formInput.imageInput}
						onChange={handleFormChange}
						required
					/>
				</div>

				<div className="blogInput categoryInput">
					<label htmlFor="categoryInput">Category:</label>
					<select
						name="categoryInput"
						id="categoryInput"
						value={formInput.categoryInput}
						onChange={handleFormChange}
						required
					>
						{categoriesList.map((category) => (
							<option key={category.id} value={category.value}>
								{category.catName}
							</option>
						))}
					</select>
				</div>

				<div className="blogInput dateInput">
					<label htmlFor="dateInput">Date:</label>
					<input
						type="date"
						id="dateInput"
						name="dateInput"
						value={formInput.dateInput}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div className="blogInput postInput">
					<label htmlFor="postInput">Post Content:</label>
					<textarea
						id="postInput"
						name="postInput"
						rows={15}
						value={formInput.postInput}
						onChange={handleFormChange}
						required
					/>
				</div>

				<div className="newPostBtns">
					<button type="submit" className="submitBtn">
						Create Post
					</button>
					<button className="resetBtn" onClick={resetFormInput}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
