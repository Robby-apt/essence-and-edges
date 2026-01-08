'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
	blog: {
		id: number;
		blog_title: string;
		blog_img: string | null;
	};
	onDelete: (id: number) => void;
};

export default function ArticleRow({ blog, onDelete }: Props) {
	async function handleDelete() {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${blog.blog_title}"?`
		);
		if (!confirmed) return;

		const { error } = await supabase
			.from('blogs')
			.delete()
			.eq('id', blog.id);

		if (error) {
			alert('Failed to delete post: ' + error.message);
		} else {
			onDelete(blog.id);
		}
	}

	return (
		<div className="articleRow">
			<FontAwesomeIcon icon={faList} />
			<img src={blog.blog_img || '/author.jpg'} alt={blog.blog_title} />
			<h4>{blog.blog_title}</h4>

			<div className="manageBtns">
				<Link href={`/admin/edit/${blog.id}`}>
					<FontAwesomeIcon icon={faPen} />
				</Link>
				<button onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
}
