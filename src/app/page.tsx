import { LineShadowText } from "@/components/magicui/line-shadow-text";
import GetStartedModal from "./get-started";
import { GridPattern } from "@/components/magicui/grid-pattern";
import StaticShiningCard from "@/components/ui/static-shining-card";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Home", // Will be combined with layout template: "Home | GridLock"
	description:
		"Generate unique Jeopardy-style trivia games instantly with GridLock's AI power. Enter a topic and get started!",
	// openGraph and twitter tags will inherit from layout unless overridden here
};

const STATIC_SHINING_CARD_ITEMS = [
	{
		points: 100,
		question: "Who is the president of the United States?",
		className:
			"absolute top-[15%] left-[10%] -rotate-12 w-64 h-32 md:w-72 md:h-36",
		textSize: "text-2xl md:text-3xl",
	},
	{
		points: 200,
		question: "What is the capital of France?",
		className:
			"absolute top-[10%] right-[15%] rotate-6 w-64 h-32 md:w-80 md:h-40",
		textSize: "text-2xl md:text-3xl",
	},
	{
		points: 300,
		question: "Who played the character of the Joker in the Dark Knight?",
		className:
			"absolute bottom-[15%] left-[10%] rotate-3 w-64 h-32 md:w-72 md:h-36",
		textSize: "text-xl md:text-2xl",
	},
	{
		points: 400,
		question: "What is the rarest Pokémon card in the world?",
		className:
			"absolute bottom-[15%] right-[10%] -rotate-4 w-64 h-32 md:w-96 md:h-48",
		textSize: "text-2xl md:text-3xl",
	},
	{
		points: 500,
		question: "What is the deepest part of the ocean?",
		className:
			"absolute bottom-[5%] left-1/2 -translate-x-1/2 rotate-1 w-64 h-32 md:w-72 md:h-36",
		textSize: "text-xl md:text-2xl",
	},
];
export default function Home() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center  relative overflow-hidden">
			<div className="relative z-10 w-screen h-screen flex flex-row items-center bg-background justify-center gap-32 px-8 overflow-hidden border-12 border-black">
				<GridPattern className="absolute inset-0 z-0 opacity-50" />
				{STATIC_SHINING_CARD_ITEMS.map((item) => (
					<StaticShiningCard
						key={item.points}
						points={item.points}
						question={item.question}
						className={item.className}
						textSize={item.textSize}
					/>
				))}
				<div className="flex flex-col items-center justify-center gap-4 text-center max-w-xl">
					<div className="bg-secondary-background px-4 py-2 rounded-full border-2 border-border shadow-[var(--shadow)]">
						Create 3 games for free - no credit card required
					</div>
					<LineShadowText className="text-8xl md:text-9xl font-black">
						GridLock
					</LineShadowText>
					<p className="text-muted-foreground text-lg md:text-xl">
						Create your own Jeopardy-style trivia game board in seconds.
					</p>
					<div className="flex gap-2 items-center">
						<GetStartedModal />
						<Button variant="neutral" size="icon" className="gap-2" asChild>
							<Link href="https://github.com/Mehulparekh144/gridlock">
								<Github />
								<p className="sr-only">Contribute to the project</p>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
