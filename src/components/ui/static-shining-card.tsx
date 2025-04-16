"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

// Define color mapping based on points
const pointColorMap: { [key: number]: string } = {
	100: "bg-blue-200",
	200: "bg-green-200",
	300: "bg-yellow-200",
	400: "bg-orange-200",
	500: "bg-red-200",
};
const defaultColor = "bg-gray-200";

function StaticShiningCard({
	question,
	points,
	className,
	textSize,
	...props
}: {
	points: number;
	question: string;
	className?: string;
	textSize?: string;
} & React.ComponentProps<typeof Card>) {
	const colorClass = pointColorMap[points] || defaultColor;

	return (
		<Card
			className={cn(
				"relative overflow-hidden group transition-colors duration-200 h-24 w-40", // Added fixed size
				colorClass,
				className,
			)}
			{...props}
		>
			<CardContent className="relative z-10 flex flex-col items-center justify-center h-full">
				<span className={cn("font-bold text-black/70", textSize)}>
					{question}
				</span>
				<span className={cn("font-bold text-black/70", textSize)}>
					{points}
				</span>
			</CardContent>
			<div
				className={cn(
					"absolute inset-0 z-0",
					"bg-gradient-to-r from-transparent via-white/50 to-transparent",
					"translate-x-[-100%]",
					"skew-x-[-15deg]",
					"transition-transform duration-700 ease-in-out",
					"group-hover:translate-x-[100%]", // Keep hover effect
				)}
			/>
		</Card>
	);
}

export default StaticShiningCard;
