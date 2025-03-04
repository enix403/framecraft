import { atom, useAtom } from "jotai";

export type SelectedObject =
  /* add other types */
  { type: "room"; index: number };

const selectedObjectAtom = atom<SelectedObject | null>(null);

export function useSelectedObject() {
  return useAtom(selectedObjectAtom);
}
