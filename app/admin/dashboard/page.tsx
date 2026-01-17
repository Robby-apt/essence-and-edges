import DashboardBtns from '@/app/_components/DashboardBtns';
import BlogListDisplay from '@/app/_components/BlogListDisplay';
import ManageBio from '@/app/_components/ManageBio';

export default function Dashboard() {
	// Get time of day for greeting
	const currentHour = new Date().getHours();
	let greeting =
		currentHour < 12
			? 'Good morning'
			: currentHour < 18
			? 'Good afternoon'
			: 'Good evening';

	return (
		<div className="mainContent">
			<div className="infoAndBtns dashboardContent">
				<div className="dashboardInfo">
					<h2>{greeting} Bella👋</h2>
					<p>Welcome to your admin panel.</p>
				</div>
				<DashboardBtns />
			</div>
			<ManageBio />
			<BlogListDisplay />
		</div>
	);
}
