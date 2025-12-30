import categoriesList from './categoriesList';

export default function NewPost() {
	return (
		<div className="newPost">
            <h2>Create New Blog Post</h2>

			<form action="" id="newPostForm">
				<div className="blogInput titleInput">
					<label htmlFor="titleInput">Title:</label>
					<input
						type="text"
						id="titleInput"
						name="titleInput"
						required
					/>
				</div>

				<div className="blogInput imageInput">
					<label htmlFor="imageInput">Image URL:</label>
					<input
						type="text"
						id="imageInput"
						name="imageInput"
						required
					/>
				</div>

				<div className="blogInput categoryInput">
					<label htmlFor="categoryInput">Category:</label>
					<select name="categoryInput" id="categoryInput">
						{categoriesList.map((category) => (
							<option key={category.id} value={category.value}>
								{category.name}
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
                        
                        required
                    />
                </div>
				<div className="blogInput postInput">
                    <label htmlFor="postInput">Post Content:</label>
                    <textarea
                        id="postInput"
                        name="postInput"
                        rows={15}
                        required
                    />
                </div>

				<div className="newPostBtns">
					<button type="submit" className="submitBtn">
						Create Post
					</button>
					<button className="resetBtn">Cancel</button>
				</div>
			</form>
		</div>
	);
}
