"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import IdeaForm from "./IdeaForm";

function CreateGameCard({ gameCount }: { gameCount: number }) {
	const [open, setOpen] = useState(false);

	return gameCount >= 3 ? (
		<Card className="w-72 h-72 bg-secondary-background/30 cursor-not-allowed transition-all">
			<CardContent className="w-full h-full flex flex-col items-center justify-center font-medium text-gray-500">
				<p className="text-3xl">
					You have reached the maximum number of games.
				</p>
				<p className="text-sm">Delete a game to create a new one.</p>
			</CardContent>
		</Card>
	) : (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Card className="w-72 h-72 bg-secondary-background/60 cursor-pointer hover:bg-secondary-background/80 transition-all">
					<CardContent className="w-full h-full flex flex-col items-center justify-center font-medium text-gray-500">
						<Plus className="w-52 h-52" />
						<p className="text-sm">Create a new game</p>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new game</DialogTitle>
				</DialogHeader>
				<IdeaForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

export default CreateGameCard;
