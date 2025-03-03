import { atom, useAtomValue, useSetAtom } from "jotai";
import Konva from "konva";
import { useState, useEffect, RefObject } from "react";

const MIN_SCALE_REL = 0.5;
const MAX_SCALE_REL = 4;

const zoomLevelAtom = atom(1);

export function useZoomLevel() {
  return useAtomValue(zoomLevelAtom);
}

export function useSetZoomLevel() {
  return useSetAtom(zoomLevelAtom);
}

export function useWheelZoomListener(
  stageRef: RefObject<Konva.Stage | null>,
  baseScale: number
) {
  const setZoomLevel = useSetZoomLevel();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const minScale = MIN_SCALE_REL * baseScale;
    const maxScale = MAX_SCALE_REL * baseScale;

    setZoomLevel(stage.scaleX() / baseScale);

    function onWheelImpl(stage: Konva.Stage, e: WheelEvent) {
      e.preventDefault();

      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
      };

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, oldScale - e.deltaY * 0.001)
      );
      stage.scale({ x: newScale, y: newScale });
      setZoomLevel(newScale / baseScale);

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      };

      stage.position(newPos);


    }

    function onWheel(e: WheelEvent) {
      onWheelImpl(stage!, e);
    }

    stage.content.addEventListener("wheel", onWheel);

    return () => {
      stage.content.removeEventListener("wheel", onWheel);
    };
  }, [baseScale]);
}
