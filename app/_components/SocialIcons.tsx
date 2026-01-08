import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faYoutube,
	faXTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export default function SocialIcons() {
	return (
		<div className="socialIcons">
			<a href="#" target="_blank" aria-label="YouTube">
				<FontAwesomeIcon icon={faYoutube} />
			</a>
			<a href="#" target="_blank" aria-label="X / Twitter">
				<FontAwesomeIcon icon={faXTwitter} />
			</a>
			<a href="#" target="_blank" aria-label="Instagram">
				<FontAwesomeIcon icon={faInstagram} />
			</a>
		</div>
	);
}
