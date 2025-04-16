import { Button } from "@/components/ui/button";
import ShinyCard from "@/components/ui/shiny-card";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import ResetPlayModal from "./resetplay-modal";

export default async function PlayPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const game = await prisma.game.findUnique({
		where: {
			id,
		},
		include: {
			grid: true,
		},
	});

	const grid = game?.grid.sort((a, b) => a.points - b.points);
	const categories = new Set(game?.grid.map((item) => item.category));

	return (
		<>
			<ResetPlayModal gameId={id} />
			<div className="w-full h-full relative grid grid-cols-5 grid-rows-6 gap-2 p-4">
				<div className="absolute top-2 left-2 flex items-center gap-2">
					<Button variant="default" size="icon" asChild>
						<Link href="/dashboard">
							<ArrowLeftIcon className="w-4 h-4" />
						</Link>
					</Button>
					<p className="text-xl font-bold">{game?.name}</p>
				</div>
				{Array.from(categories).map((category) => (
					<div className="h-fit mt-auto text-center p-4" key={category}>
						<p className="text-xl font-bold">{category}</p>
					</div>
				))}
				{grid?.map((item) => (
					<ShinyCard
						key={item.id}
						gameId={id}
						item={item}
						className="flex items-center justify-center"
					>
						<p className="text-3xl font-bold">{item.points}</p>
					</ShinyCard>
				))}
			</div>
		</>
	);
}
