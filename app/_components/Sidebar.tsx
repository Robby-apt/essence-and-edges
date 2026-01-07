import Link from 'next/link';

export default function Sidebar() {
	return (
		<div className="sideBar">
			<ul>
				<li>
					<Link href="/about-me">About me</Link>
				</li>
				<li>
					<Link href="/the-office-edit">The Office Edit</Link>
				</li>
				<li>
					<Link href="/under-open-skies">Under Open Skies</Link>
				</li>
				<li>
					<Link href="/papers-from-my-mind">Papers From My Mind</Link>
				</li>
				<li>
					<Link href="/the-heart-archive">The Heart Archive</Link>
				</li>
				<li>
					<Link href="/the-living-room">The Living Room</Link>
				</li>
			</ul>
		</div>
	);
}
