import Konva from "konva";
import {
  useRef,
  useLayoutEffect,
  RefObject,
  useState,
  useCallback
} from "react";

export function useRecenter(
  stageRef: RefObject<Konva.Stage | null>,
  baseScale: number,
  initialPos: Konva.Vector2d,
  scaleStageTo: any
) {
  const firstPlaced = useRef(false);

  const performRecenter = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (isNaN(initialPos.x)) {
      return;
    }

    firstPlaced.current = true;

    scaleStageTo(baseScale);
    stage.position(initialPos);
  }, [baseScale, initialPos]);

  useLayoutEffect(() => {
    if (isNaN(initialPos.x)) return;

    if (firstPlaced.current) {
      return;
    }

    performRecenter();
  }, [baseScale, initialPos]);

  return {
    forceRecenter: performRecenter
  };
}
