import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import prisma from "@/lib/prisma";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import CreateGameCard from "./CreateGameCard";
import Link from "next/link";
import DeleteGame from "./delete-game";
import { getGameCount } from "../actions";
const DashboardPage = async () => {
	const gameCount = await getGameCount();
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/");
	}

	const games = await prisma.game.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			updatedAt: "desc",
		},
		include: {
			grid: true,
		},
	});

	return (
		<section className="w-full h-full flex flex-col max-w-7xl p-3 mx-auto">
			<p className="text-lg font-bold">Your Games</p>
			<Suspense key={games?.length} fallback={<div>Loading...</div>}>
				<div className="flex mt-4 gap-4 items-center justify-start flex-wrap w-full">
					{games?.map((game) => (
						<Card className="w-72 h-72 bg-secondary-background" key={game.id}>
							<CardHeader className="flex items-start  justify-between">
								<CardTitle className="leading-tight">{game.name}</CardTitle>
								<p className="text-xs text-muted-foreground">
									{game.updatedAt.toLocaleDateString()}
								</p>
							</CardHeader>
							<CardContent className="h-full overflow-y-auto ">
								<p>{game.description}</p>
							</CardContent>
							<CardFooter className="flex items-center justify-between">
								<Button asChild>
									<Link prefetch href={`/play/${game.id}`}>
										<Play /> Play
									</Link>
								</Button>
								<DeleteGame id={game.id} />
							</CardFooter>
						</Card>
					))}
					{gameCount && <CreateGameCard gameCount={gameCount} />}
				</div>
			</Suspense>
		</section>
	);
};

export default DashboardPage;
