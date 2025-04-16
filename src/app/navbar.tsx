"use client";
import Link from "next/link";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";
import { Github, LogOut, User } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as UserType } from "better-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";
import GetStartedModal from "./get-started";

export default function Navbar() {
	const { data, isPending } = useSession();

	return (
		<nav className="w-full h-16 px-16 py-4 border-b border-muted-foreground/20">
			<div className="w-full h-full flex justify-between">
				<Link href="/">
					<LineShadowText className="text-2xl font-bold">
						GridLock
					</LineShadowText>
				</Link>

					{data?.user ? (
						<UserButton user={data?.user} />
					) : isPending ? (
						<Skeleton className="w-8 h-8 rounded-full" />
					) : (
						<GetStartedModal />
					)}
				</div>
		</nav>
	);
}

function UserButton({ user }: { user: UserType }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="w-8 h-8">
					<AvatarImage src={user?.image ?? ""} />
					<AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-secondary-background min-w-64 m-4">
				<DropdownMenuLabel className="flex items-center justify-between">
					User Info <User className="w-4 h-4" />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem disabled className="bg-transparent" asChild>
					<div className="flex flex-col items-start">
						<p className="font-medium p-0">{user?.name}</p>
						<p className="text-xs text-muted-foreground p-0">{user?.email}</p>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="bg-transparent flex justify-between items-center"
					onClick={() => {
						signOut();
						window.location.href = "/";
					}}
				>
					Sign Out
					<LogOut />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
