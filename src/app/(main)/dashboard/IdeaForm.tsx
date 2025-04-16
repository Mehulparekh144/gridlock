"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateBoard } from "../actions";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function IdeaForm({
	setOpen,
}: {
	setOpen: (open: boolean) => void;
}) {
	const [idea, setIdea] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setLoading(true);
			await generateBoard(idea);
			setLoading(false);
			toast.success("Board generated successfully");
			setOpen(false);
		} catch (error) {
			toast.error("Error generating board");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="max-w-lg space-y-4 h-full" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-2">
				<Label htmlFor="title">Title</Label>
				<Input
					id="title"
					name="idea"
					value={idea}
					onChange={(e) => setIdea(e.target.value)}
					placeholder="The Office TV Show"
				/>
			</div>
			<Button type="submit" disabled={loading || idea.trim() === ""}>
				{loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
				Submit
			</Button>
		</form>
	);
}
