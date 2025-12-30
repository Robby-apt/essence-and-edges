export default function Login() {
	// Get time of day for greeting
	const currentHour = new Date().getHours();
	let greeting;
	if (currentHour < 12) {
		greeting = 'Good morning';
	} else if (currentHour < 18) {
		greeting = 'Good afternoon';
	} else {
		greeting = 'Good evening';
	}

	return (
		<div className="mainContent">
			<div className="loginFormSection">
				<h2>{greeting} Bella👋</h2>
				<form action="" className="loginForm">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						required
					/>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}
