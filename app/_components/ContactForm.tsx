export default function ContactForm() {
	return (
		<div className="contactForm">
			<form action="">
				<div className="nameSection">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" />
				</div>
				<div className="emailSection">
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" />
				</div>
				<div className="messageSection">
					<label htmlFor="message">Message:</label>
					<textarea name="message" id="message" />
				</div>

				<button>Send Message</button>
			</form>
		</div>
	);
}
