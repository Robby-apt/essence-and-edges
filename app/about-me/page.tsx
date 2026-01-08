'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type BioData = {
	bio_img: string;
	bio_text: string;
	updated_at: string | null;
};

const fallbackBio: BioData = {
	bio_img: '/author.jpg',
	bio_text: `Lorem ipsum dolor sit amet consectetur. Luctus nunc
imperdiet convallis enim. Duis aliquam semper nibh viverra
elit facilisi sapien velit vulputate. Augue accumsan urna
arcu scelerisque. Amet non tempus purus id metus. Porttitor
diam mattis risus id pharetra sem. Vestibulum vivamus tortor
viverra ac gravida. In erat felis aliquam gravida ac. Vitae
scelerisque est non risus dignissim tempus placerat ipsum
nunc. Enim proin ultrices sed ac convallis...`,
	updated_at: null,
};

export default function AboutMe() {
	const [bio, setBio] = useState<BioData>(fallbackBio);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadBio() {
			const { data, error } = await supabase
				.from('bio')
				.select('bio_img, bio_text, updated_at')
				.single();

			// Debug: log raw row returned from Supabase
			console.debug('bio row:', { data, error });

			if (!error && data) {
				let imageUrl = data.bio_img || fallbackBio.bio_img;

				// If the stored value is a path in Supabase Storage (not an absolute URL),
				// attempt to build a public URL. Replace the bucket name below with
				// your actual bucket or set NEXT_PUBLIC_SUPABASE_BUCKET.
				try {
					if (
						imageUrl &&
						!imageUrl.startsWith('http') &&
						process.env.NEXT_PUBLIC_SUPABASE_BUCKET
					) {
						const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
						const { data: pub } = await supabase.storage
							.from(bucket)
							.getPublicUrl(imageUrl);
						if (pub?.publicUrl) imageUrl = pub.publicUrl;
					}
				} catch (err) {
					console.warn('failed to resolve storage public url', err);
				}

				setBio({
					bio_img: imageUrl,
					bio_text: data.bio_text || fallbackBio.bio_text,
					updated_at: data.updated_at || null,
				});
			}
			setLoading(false);
		}

		loadBio();
	}, []);

	// Format date as dd/mm/yyyy or fallback to "Recent"
	const formattedDate = bio.updated_at
		? new Date(bio.updated_at).toLocaleDateString('en-GB')
		: 'Recent';

	// Split bio_text into paragraphs by double newline
	const paragraphs = bio.bio_text ? bio.bio_text.split(/\n\s*\n/) : [];

	return (
		<div className="mainContent blogArticle">
			<div className="blogHero">
				<img
					src={bio.bio_img || fallbackBio.bio_img}
					alt="Image of the author"
				/>
				<div className="blogDate">
					<p className="uploadDate">{formattedDate}</p>
				</div>
			</div>
			<div className="blogBody">
				<h2 className="blogHeading">About Me</h2>
				{loading ? (
					<p>Loading...</p>
				) : paragraphs.length > 0 ? (
					paragraphs.map((para, idx) => (
						<p key={idx} className="blogPost">
							{para}
						</p>
					))
				) : (
					<p className="blogPost">{fallbackBio.bio_text}</p>
				)}
			</div>
		</div>
	);
}
