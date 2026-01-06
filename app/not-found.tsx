export default function NotFound() {
	return (
		<div className="mainContent notFound">
			<div>
				<img src="/not-found.svg" alt="Page not found" />
				<h2>Sorry, the page you are looking for does not exist.</h2>
				<a href="/">Go back to Home</a>
			</div>
		</div>
	);
}
