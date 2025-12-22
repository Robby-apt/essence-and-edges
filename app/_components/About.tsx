import SocialIcons from './SocialIcons';

export default function About() {
	return (
		<div className="aboutMe">
			<img src="/author.jpg" alt="My picture" className="myPic" />
			<div className="aboutText">
				<h2>About Me</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur. Luctus nunc
					<br />
					imperdiet convallis enim. Duis aliquam semper nibh viverra
					<br />
					elit facilisi sapien velit vulputate. Augue accumsan urna
					<br />
					arcu scelerisque. Amet non tempus purus id metus. Porttitor
					<br />
					diam mattis risus id pharetra sem. Vestibulum vivamus tortor
					<br />
					viverra ac gravida. In erat felis aliquam gravida ac. Vitae
					<br />
					scelerisque est non risus dignissim tempus placerat ipsum
					<br />
					nunc. Enim proin ultrices sed ac convallis...
				</p>

				<a href="#" className="moreIntro">
					Get to know me
				</a>

				<SocialIcons />
			</div>
		</div>
	);
}
