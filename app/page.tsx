import Articles from './_components/Articles';
import Hero from './_components/Hero';
import Info from './_components/Info';

export default function Home() {
	return (
		<div className="mainContent">
			<Hero />
			<Info />
			<Articles />
		</div>
	);
}
