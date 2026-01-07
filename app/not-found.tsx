import Link from 'next/link';
export default function NotFound() {
	return (
		<div className="mainContent notFound">
			<div>
				<img
					src="/not-found.svg"
					alt="Illustration of a page not found"
				/>
				<h2>Sorry, the page you are looking for does not exist.</h2>
				<Link href="/">Go back to Home</Link>
			</div>
		</div>
	);
}
