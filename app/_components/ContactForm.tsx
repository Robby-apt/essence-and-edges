'use client';
import { useState, useEffect, ChangeEvent } from 'react';

export default function ContactForm() {
	const [contactFormData, setContactFormData] = useState({
		contactName: '',
		contactEmail: '',
		contactMessage: '',
	});

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		let { name, value } = event.target;
		setContactFormData((prev) => ({ ...prev, [name]: value }));
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
	}

	return (
		<div className="contactForm">
			<form onSubmit={handleSubmit}>
				<div className="nameSection">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						value={contactFormData.contactName}
						onChange={handleChange}
					/>
				</div>
				<div className="emailSection">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={contactFormData.contactEmail}
						onChange={handleChange}
					/>
				</div>
				<div className="messageSection">
					<label htmlFor="message">Message:</label>
					<textarea
						name="message"
						id="message"
						value={contactFormData.contactMessage}
						onChange={handleChange}
					/>
				</div>

				<button>Send Message</button>
			</form>
		</div>
	);
}
