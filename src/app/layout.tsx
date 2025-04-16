import type { Metadata } from "next";
import { Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const bubblegum = Bubblegum_Sans({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-bubblegum",
});

const siteConfig = {
	name: "GridLock",
	description:
		"Create your own Jeopardy-style trivia game board in seconds using AI.",
	url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000", // Replace with your production URL
	ogImage: `${process.env.NEXT_PUBLIC_URL}/og-image.png`, // Replace with your production URL
};

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
	},
	icons: {
		icon: "/logo.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${bubblegum.className} bg-background antialiased`}>
				<Toaster position="bottom-center" />
				{children}
			</body>
		</html>
	);
}
