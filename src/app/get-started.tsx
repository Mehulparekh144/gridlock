"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signIn, signOut, signUp, useSession } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import type { ErrorContext } from "better-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GetStartedModal() {
	const { data } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				onClick={() => {
					if (data?.user) {
						window.location.href = "/dashboard";
					} else {
						setIsOpen(true);
					}
				}}
				asChild
			>
				<Button>Get Started</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Get Started</DialogTitle>
					<DialogDescription>
						Create your own Jeopardy-style trivia game board and save it to your
						account.
					</DialogDescription>
				</DialogHeader>
				<AuthTab />
			</DialogContent>
		</Dialog>
	);
}

function AuthTab() {
	return (
		<Tabs defaultValue="signin">
			<TabsList className="w-full">
				<TabsTrigger className="w-full" value="signin">
					Sign In
				</TabsTrigger>
				<TabsTrigger className="w-full" value="signup">
					Sign Up
				</TabsTrigger>
			</TabsList>
			<TabsContent value="signin">
				<SignIn />
			</TabsContent>
			<TabsContent value="signup">
				<SignUp />
			</TabsContent>
		</Tabs>
	);
}

function SignIn() {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		await signIn.email(
			{
				email,
				password,
				callbackURL: "/dashboard",
			},
			{
				onRequest: () => setIsLoading(true),
				onSuccess: () => {
					toast.success("Welcome to GridLock!");
				},
				onResponse: () => setIsLoading(false),
				onError: (error: ErrorContext) => {
					toast.error(error.error.message);
					setIsLoading(false);
				},
			},
		);
	};
	return (
		<Card className="bg-secondary-background">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Sign in to your account to get started.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" name="email" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input type="password" id="password" name="password" />
					</div>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign In"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

function SignUp() {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		await signUp.email(
			{
				name,
				email,
				password,
				callbackURL: "/dashboard",
			},
			{
				onRequest: () => setIsLoading(true),
				onSuccess: () => {
					toast.success("Account created successfully!");
				},
				onResponse: () => setIsLoading(false),
				onError: (error: ErrorContext) => {
					toast.error(error.error.message);
					setIsLoading(false);
				},
			},
		);
	};
	return (
		<Card className="bg-secondary-background">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create an account to get started.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input type="text" id="name" name="name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" name="email" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input type="password" id="password" name="password" />
					</div>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Signing up..." : "Sign Up"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
