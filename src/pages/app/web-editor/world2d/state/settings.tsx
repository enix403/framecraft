import { atom, getDefaultStore, useAtomValue, useSetAtom } from "jotai";
import Konva from "konva";
import { createRef, useCallback, useMemo } from "react";

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

/* ===================== */

// The 2D stage is stored in a "global" react RefObject created using
// createRef(...) instead of the usual useRef(...) function, since
// there is always ever going to be only a single editor stage
// mounted on the editor page
//
// This is because the stage object is needed in other parts of the editor
// such as exporting the plan, and it is not practical to re-architect the
// app currently.
//
// Forgive me for this.
//
// TODO: Clean this mess up
export const stageRef = createRef<Konva.Stage | null>();
stageRef.current = null;
(window as any).stageRef = stageRef;
