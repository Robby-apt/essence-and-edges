import Articles from './_components/Articles';
import ContactSection from './_components/ContactSection';
import Hero from './_components/Hero';
import Info from './_components/Info';

export default function Home() {
	return (
		<div className="mainContent">
			<Hero />
			<Info />
			<Articles />
			<ContactSection />
		</div>
	);
}
