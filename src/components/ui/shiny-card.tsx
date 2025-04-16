"use client";
import { cn, logger } from "@/lib/utils";
import { Card, CardContent } from "./card";
import type { GameGridItem } from "@/app/generated/prisma";
import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useGamesInPlay from "@/hooks/use-current-game";

// Define color mapping based on points
const pointColorMap: { [key: number]: string } = {
	100: "bg-blue-200 hover:bg-blue-300",
	200: "bg-green-200 hover:bg-green-300",
	300: "bg-yellow-200 hover:bg-yellow-300",
	400: "bg-orange-200 hover:bg-orange-300",
	500: "bg-red-200 hover:bg-red-300",
};
const defaultColor = "bg-gray-200 hover:bg-gray-300";
const playedColor = `${defaultColor} opacity-50`;

const overlayVariants = {
	hidden: {
		opacity: 0,
		scale: 0.7, // Start smaller
		transition: {
			duration: 0.2, // Faster exit
		},
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 100, // Controls the "springiness"
			damping: 10, // Controls the "bounce"
		},
	},
};

// Animation variants for the answer text
const answerVariants = {
	hidden: { opacity: 0, y: 10 }, // Start invisible and slightly down
	visible: {
		opacity: 1,
		y: 0, // Slide up to original position
		transition: { duration: 0.3, ease: "easeOut" }, // Simple fade/slide duration
	},
	exit: { opacity: 0, y: -5, transition: { duration: 0.1 } }, // Optional: slightly different exit
};

function ShinyCard({
	children,
	item,
	className,
	gameId,
	...props
}: {
	gameId: string;
	children: React.ReactNode;
	item: GameGridItem;
	className?: string;
} & React.ComponentProps<typeof Card>) {
	const [isOpen, setIsOpen] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);
	const colorClass = pointColorMap[item.points] || defaultColor;
	const { setGames, games } = useGamesInPlay();

	const currentGame = games?.find((game) => game[gameId]?.length > 0);
	console.log("currentGame", currentGame);

	// Effect to focus the overlay when it opens
	useEffect(() => {
		if (isOpen) {
			// Reset answer visibility when modal opens
			setShowAnswer(false);
			// Focus the overlay for keyboard events
			setTimeout(() => overlayRef.current?.focus(), 0); // Timeout helps ensure focus after render
		}
	}, [isOpen]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		// Close on Escape
		if (e.key === "Escape") {
			setIsOpen(false);
		}
		// Show answer on Space, prevent default scroll
		if (e.key === " " && !showAnswer) {
			// Check for literal space " " and only trigger once
			e.preventDefault(); // Prevent scrolling page
			setShowAnswer(true);
			if (currentGame && currentGame[gameId]?.length > 0) {
				games.find((game) => game[gameId]?.length > 0)?.[gameId].push(item.id);
				setGames(games);
			} else {
				setGames([...games, { [gameId]: [item.id] }]);
			}
		}
	};

	return (
		<>
			<Card
				onClick={() => setIsOpen(true)}
				className={cn(
					"relative overflow-hidden group cursor-pointer transition-colors duration-200",
					currentGame?.[gameId]?.includes(item.id) ? playedColor : colorClass,
					className,
				)}
				{...props}
			>
				<CardContent className="relative z-10">{children}</CardContent>
				<div
					className={cn(
						"absolute inset-0 z-0",
						"bg-gradient-to-r from-transparent via-white/50 to-transparent",
						"translate-x-[-100%]",
						"skew-x-[-15deg]",
						"transition-transform duration-700 ease-in-out",
						"group-hover:translate-x-[100%]",
					)}
				/>
			</Card>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={overlayRef}
						tabIndex={-1}
						className={cn(
							"fixed inset-0 w-screen h-screen z-50 outline-none flex items-center justify-center p-4",
							currentGame?.[gameId]?.includes(item.id)
								? playedColor
								: colorClass,
						)}
						onKeyDown={handleKeyDown}
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<div className="flex flex-col gap-4 items-center text-center max-w-2xl mx-auto">
							<p className="text-4xl sm:text-5xl font-bold">{item.question}</p>
							{currentGame?.[gameId]?.includes(item.id) ? (
								<p className="text-2xl sm:text-3xl font-bold">{item.answer}</p>
							) : (
								<>
									<AnimatePresence mode="wait">
										{" "}
										{/* Added mode='wait' for smoother transition if needed */}
										{showAnswer && (
											<motion.p
												key="answer" // Add a key for AnimatePresence to track
												className="text-2xl sm:text-3xl font-bold" // Removed animate-fade-in if using motion
												variants={answerVariants}
												initial="hidden"
												animate="visible"
												exit="hidden" // Use the same hidden variant for exit, or define specific exit
											>
												{item.answer}
											</motion.p>
										)}
									</AnimatePresence>
									{/* Conditionally Render Instruction Text */}
									{/* Wrap instruction text for potential exit animation too */}
									<AnimatePresence>
										{!showAnswer && (
											<motion.p
												key="instruction"
												className="text-lg font-bold mt-4"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.2 }}
											>
												Press Space to show answer
											</motion.p>
										)}
									</AnimatePresence>
								</>
							)}
						</div>
						<Button
							size="icon"
							type="button"
							onClick={() => setIsOpen(false)}
							className="absolute top-4 right-4 p-1 text-black bg-white/70 hover:bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-black"
							aria-label="Close"
						>
							<X className="w-5 h-5" />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default ShinyCard;
