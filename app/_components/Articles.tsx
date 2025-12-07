import { articles } from './props/articles';
import ArticleCard from './ArticleCard';

export default function Articles() {
	return (
		<section className="articlesSection recent-articles">
			<h2>Recent Articles {'>'} </h2>
			<div className="articlesDisplay">
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
			<div className="moreArticles">
				<a href="#">See more articles →</a>
			</div>
		</section>
	);
}
