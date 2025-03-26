import { atom, useAtomValue, useSetAtom } from "jotai";

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

/* ===================== */

const zoomLevelAtom = atom(1);

export function useZoomLevel() {
  return useAtomValue(zoomLevelAtom);
}

export function useSetZoomLevel() {
  return useSetAtom(zoomLevelAtom);
}
