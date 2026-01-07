import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faList,
	faPenToSquare,
	faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function ArticleRow() {
	return (
		<div className="articleRow">
			<FontAwesomeIcon icon={faList} />
			<img src="/author.jpg" alt="Lorem ipsum" />
			<h4>Title</h4>
			<div className="manageBtns">
				<Link href="">
					<FontAwesomeIcon icon={faPenToSquare} />
				</Link>
				<Link href="">
					<FontAwesomeIcon icon={faDeleteLeft} />
				</Link>
			</div>
		</div>
	);
}
