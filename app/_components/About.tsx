'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SocialIcons from './SocialIcons';
import { supabase } from '@/lib/supabase/client';

type BioData = {
	bio_img: string | null;
	bio_text: string | null;
};

const fallbackBio: BioData = {
	bio_img: '/author.jpg',
	bio_text: `Lorem ipsum dolor sit amet consectetur.
Luctus nunc imperdiet convallis enim.
Duis aliquam semper nibh viverra elit facilisi sapien velit vulputate.
Augue accumsan urna arcu scelerisque.
Amet non tempus purus id metus.
Porttitor diam mattis risus id pharetra sem.
Vestibulum vivamus tortor viverra ac gravida.
In erat felis aliquam gravida ac.
Vitae scelerisque est non risus dignissim tempus placerat ipsum nunc.
Enim proin ultrices sed ac convallis...`,
};

function truncateWords(text: string, maxWords: number) {
	const words = text.split(/\s+/);
	if (words.length <= maxWords) return text;
	return words.slice(0, maxWords).join(' ') + '...';
}

export default function About() {
	const [bio, setBio] = useState<BioData>(fallbackBio);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadBio() {
			const { data, error } = await supabase
				.from('bio')
				.select('bio_img, bio_text')
				.single();

			if (!error && data) {
				setBio({
					bio_img: data.bio_img || fallbackBio.bio_img,
					bio_text: data.bio_text || fallbackBio.bio_text,
				});
			}

			setLoading(false);
		}

		loadBio();
	}, []);

	const truncatedText = truncateWords(
		bio.bio_text || fallbackBio.bio_text!,
		450
	);

	return (
		<div className="aboutMe">
			<img
				src={bio.bio_img || fallbackBio.bio_img!}
				alt="My picture"
				className="myPic"
			/>

			<div className="aboutText">
				<h2>About Me</h2>

				<p>{loading ? 'Loading...' : truncatedText}</p>

				<Link href="/about-me" className="moreIntro">
					Get to know me
				</Link>

				<SocialIcons />
			</div>
		</div>
	);
}
