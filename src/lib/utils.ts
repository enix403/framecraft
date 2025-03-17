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

export type VoidCallback = () => void;
export type ParamVoidCallback<T> = (value: T) => void;

export function toNumOrNull(
  val: string | undefined | null | number
): number | null {
  if (val == undefined) return null;

  if (typeof val === "number") return val;

  val = val.trim();
  let asnum = +val;
  return val === "" ? null : (asnum as any) == val ? asnum : null;
}

export const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
