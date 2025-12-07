import SocialIcons from './SocialIcons';

export default function ContactInfo() {
	return (
		<div className="contactInfo">
			<div className="infoDisplay">
				<p>
					Do you have any suggestions or questions?
					<br />
					Feel free to get in touch with me on the
					<br />
					following platforms
				</p>

				<SocialIcons />
			</div>
		</div>
	);
}
