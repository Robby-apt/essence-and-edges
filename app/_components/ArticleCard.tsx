import Link from 'next/link';

type Article = {
	title: string;
	// category: string;
	date: string;
	img: string;
	slug?: string;
	readMoreLink?: string;
};

export default function ArticleCard({ article }: { article: Article }) {
	const href =
		article.readMoreLink ??
		(article.slug ? `/all-blogs/${article.slug}` : '#');

	return (
		<div className="articleCard">
			<img src={article.img} alt="" />

			<h3 className="article-title">{article.title}</h3>

			{/* <p className="articleCat">{article.category}</p> */}

			<p className="article-date">{article.date}</p>

			<Link href={href} className="readMore">
				Read more
			</Link>
		</div>
	);
}
