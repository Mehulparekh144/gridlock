import Navbar from "../navbar";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="w-screen h-[calc(100vh-4rem)]">
			<Navbar />
			{children}
		</section>
	);
}
