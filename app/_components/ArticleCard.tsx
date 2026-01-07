import Link from 'next/link';
type Article = {
	// category: string;
	title: string;
	category: string;
	date: string;
	readMoreLink: string;
	img: string;
};

export default function ArticleCard({ article }: { article: Article }) {
	return (
		<div className="articleCard">
			<img src={article.img} alt="" />
			<h3 className="article-title">{article.title}</h3>
			<p className="articleCat">{article.category}</p>
			<p className="article-date">{article.date}</p>
			<Link href={article.readMoreLink} className="read-more">
				Read more
			</Link>
		</div>
	);
}
