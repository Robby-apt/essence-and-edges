import BlogListDisplay from '@/app/_components/BlogListDisplay';
import ManageBio from '@/app/_components/ManageBio';

export default function Dashboard() {
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
			<div className="infoAndBtns dashboardContent">
				<div className="dashboardInfo">
					<h2>{greeting} Bella👋</h2>
					<p>Welcome to your admin panel.</p>
				</div>
				<div className="dashboardBtns">
					<a
						className="dashboardBtn"
						href="/admin/dashboard/new_post"
					>
						+ New Post
					</a>
					<a className="dashboardBtn">Log out</a>
				</div>
			</div>
			<ManageBio />
			<BlogListDisplay />
		</div>
	);
}
