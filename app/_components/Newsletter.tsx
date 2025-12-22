export default function Newsletter() {
	return (
		<div className="newsletter">
			<img src="/newsletter.jpg" alt="Newsletter" className="mailImg" />
			<div className="newsletterInfo">
				<h2>Newsletter</h2>
				<p>Sign up for our newsletter to never miss a blog</p>
				<form action="">
					<label htmlFor="subEmail">Email:</label>
					<input type="email" id="subEmail" name="email" required />
					<button type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	);
}
