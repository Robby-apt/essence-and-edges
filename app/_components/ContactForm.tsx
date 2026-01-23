'use client';

import emailjs from '@emailjs/browser';
import { useState, useRef, ChangeEvent } from 'react';

export default function ContactForm() {
	const formRef = useRef<HTMLFormElement | null>(null);

	const [contactFormData, setContactFormData] = useState({
		contactName: '',
		contactEmail: '',
		contactMessage: '',
	});

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = event.target;

		setContactFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (!formRef.current) return;

		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				formRef.current, // ✅ REQUIRED
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
			)
			.then(
				(result) => {
					console.log('EmailJS success:', result.text);
					alert('Message sent successfully!');

					// reset form
					setContactFormData({
						contactName: '',
						contactEmail: '',
						contactMessage: '',
					});
				},
				(error) => {
					console.error('EmailJS error:', error.text);
					alert('Failed to send message. Please try again later.');
				},
			);
	}

	return (
		<div className="contactForm">
			<form ref={formRef} onSubmit={handleSubmit}>
				<div className="nameSection">
					<label htmlFor="contactName">Name:</label>
					<input
						type="text"
						id="contactName"
						name="contactName" // ✅ REQUIRED
						value={contactFormData.contactName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="emailSection">
					<label htmlFor="contactEmail">Email:</label>
					<input
						type="email"
						id="contactEmail"
						name="contactEmail" // ✅ REQUIRED
						value={contactFormData.contactEmail}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="messageSection">
					<label htmlFor="contactMessage">Message:</label>
					<textarea
						id="contactMessage"
						name="contactMessage" // ✅ REQUIRED
						value={contactFormData.contactMessage}
						onChange={handleChange}
						rows={6}
						required
					/>
				</div>

				<button type="submit">Send Message</button>
			</form>
		</div>
	);
}
