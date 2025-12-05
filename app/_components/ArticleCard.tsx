// app/_components/ArticleCard.jsx
type Article = {
	// category: string;
	title: string;
	date: string;
	readMoreLink: string;
};

export default function ArticleCard({ article }: { article: Article }) {
	return (
		<div className="articleCard">
			{/* <div className="article-category">{article.category}</div> */}
			<h3 className="article-title">{article.title}</h3>
			<div className="article-date">{article.date}</div>
			<a href={article.readMoreLink} className="read-more">
				Read more
			</a>
		</div>
	);
}
