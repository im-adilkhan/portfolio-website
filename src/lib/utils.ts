import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Data Analyst" -> ["D","a","t","a"," ", ...] with spaces preserved for split-text animation */
export function splitChars(text: string) {
  return Array.from(text);
}

export function splitWords(text: string) {
  return text.split(" ");
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}
