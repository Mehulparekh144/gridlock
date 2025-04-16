"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2, Trash2 } from "lucide-react";
import { deleteGame } from "../actions";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteGame({ id }: { id: string }) {
	const [isLoading, setIsLoading] = useState(false);
	async function handleDeleteGame(id: string) {
		setIsLoading(true);
		try {
			await deleteGame(id);
			toast.success("Game deleted successfully");
		} catch (error) {
			toast.error("Failed to delete game");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"neutral"} disabled={isLoading} size={"icon"}>
					{isLoading ? (
						<Loader2 className="animate-spin" />
					) : (
						<EllipsisVertical />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => handleDeleteGame(id)}>
					<Trash2 />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
