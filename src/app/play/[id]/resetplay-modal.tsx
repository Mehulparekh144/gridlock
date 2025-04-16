"use client";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import useGamesInPlay from "@/hooks/use-current-game";

const ResetPlayModal = ({ gameId }: { gameId: string }) => {
	const [open, setOpen] = useState(false);
	const { games, setGames } = useGamesInPlay();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const game = games?.find((card) => card[gameId]?.length > 0);
		if (game && game[gameId].length > 0 && game[gameId].length < 25) {
			setOpen(true);
		}
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="hidden">Invisible</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Game's in progress</DialogTitle>
					<DialogDescription>
						You were in the middle of a game. Do you want to start a new one or
						continue?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						onClick={() => {
							const newGames = games.filter(
								(card) => Object.keys(card)[0] !== gameId,
							);
							setGames(newGames);
							setOpen(false);
						}}
						variant="neutral"
					>
						Start new game
					</Button>
					<Button onClick={() => setOpen(false)} variant="default">
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ResetPlayModal;
