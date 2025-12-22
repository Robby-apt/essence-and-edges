// app/_components/ArticleCard.jsx
type Article = {
	// category: string;
	title: string;
	date: string;
	readMoreLink: string;
    img: string;
};

export default function ArticleCard({ article }: { article: Article }) {
	return (
		<div className="articleCard">
			<img src={article.img} alt="" />
			<h3 className="article-title">{article.title}</h3>
			<p className="article-date">{article.date}</p>
			<a href={article.readMoreLink} className="read-more">
				Read more
			</a>
		</div>
	);
}
