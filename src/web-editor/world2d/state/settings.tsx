import { atom, useAtomValue, useSetAtom } from "jotai";
import { Subject } from "rxjs";

export type EditorSettings = {
  unit: "ft" | "in" | "m";
  enableWallMeasure: boolean;
  enableRoomLabels: boolean;
  viewMode: "color" | "wireframe";
};

const settingsAtom = atom<EditorSettings>({
  unit: "ft",
  enableWallMeasure: true,
  enableRoomLabels: true,
  viewMode: "color"
});

export function useSettings() {
  return useAtomValue(settingsAtom);
}

export function useSetSettings() {
  const set = useSetAtom(settingsAtom);
  return (settings: Partial<EditorSettings>) => {
    set(old => ({
      ...old,
      ...settings
    }));
  };
}

/* ================= */

export type SubjectEventTypes =
  | { type: "recenter" }
  | { type: "set-zoom", zoomPercent: number }

export const eventSubject = new Subject<SubjectEventTypes>();
