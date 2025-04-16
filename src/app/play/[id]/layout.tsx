export default function PlayLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="w-screen h-screen">
			{children}
		</section>
	);
}
