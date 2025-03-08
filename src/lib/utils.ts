import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function repeatNode<T>(
  len: number,
  callback: (index: number) => T
): T[] {
  let elements: T[] = [];
  for (let i = 0; i < len; ++i) {
    elements.push(callback(i));
  }
  return elements;
}

export type StateSet<T> = React.Dispatch<React.SetStateAction<T>>;
