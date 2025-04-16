import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function logger(message: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}

export function someThingWentWrong(message: string) {
  logger(`Something went wrong: ${message}`);
  throw new Error(message);
}