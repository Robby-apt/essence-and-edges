import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	// faYoutube,
	// faXTwitter,
    faTiktok,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export default function SocialIcons() {
	return (
		<div className="socialIcons">
			{/* <a href="#" target="_blank" aria-label="YouTube">
				<FontAwesomeIcon icon={faYoutube} />
			</a> */}
			<a href="https://www.tiktok.com/@_nechesa?_r=1&_t=ZM-938yTBiD6BI" target="_blank" aria-label="Tiktok">
				<FontAwesomeIcon icon={faTiktok} />
			</a>
			<a
				href="https://www.instagram.com/nechesa.kakaii__/"
				target="_blank"
				aria-label="Instagram"
			>
				<FontAwesomeIcon icon={faInstagram} />
			</a>
		</div>
	);
}
