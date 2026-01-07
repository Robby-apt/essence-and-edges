import ArticleRow from './ArticleRow';
export default function BlogListDisplay() {
	return (
		<div className="dashboardContent blogListDisplay">
			<h3>Manage your posts here</h3>
			<ArticleRow />
			{/* <p className="noPost">No posts yet. Create your first post to get started!</p> */}
		</div>
	);
}
