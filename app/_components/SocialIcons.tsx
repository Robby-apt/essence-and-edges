import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faYoutube,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export default function SocialIcons() {
	return (
		<div className="socialIcons">
			<a href="#" aria-label="YouTube">
				<FontAwesomeIcon icon={faYoutube} />
			</a>
			<a href="#" aria-label="X / Twitter">
				<FontAwesomeIcon icon={faTwitter} />
			</a>
			<a href="#" aria-label="Instagram">
				<FontAwesomeIcon icon={faInstagram} />
			</a>
		</div>
	);
}
