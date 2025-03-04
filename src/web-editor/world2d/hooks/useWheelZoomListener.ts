import Konva from "konva";
import { useEffect, RefObject } from "react";
import { useSetZoomLevel } from "../state/settings";

const MIN_SCALE_REL = 0.5;
const MAX_SCALE_REL = 4;

export function scaleStageTo(
  stage: Konva.Stage,
  newScale: number,
  focusPoint?: Konva.Vector2d
) {
  if (!focusPoint)
    focusPoint = {
      x: stage.width() / 2,
      y: stage.height() / 2
    };

  const oldScale = stage.scaleX();

  const mousePointTo = {
    x: (focusPoint.x - stage.x()) / oldScale,
    y: (focusPoint.y - stage.y()) / oldScale
  };

  stage.scale({ x: newScale, y: newScale });

  const newPos = {
    x: focusPoint.x - mousePointTo.x * newScale,
    y: focusPoint.y - mousePointTo.y * newScale
  };

  stage.position(newPos);
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

    function onWheelImpl(stage: Konva.Stage, zoomAmount: number) {
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, stage.scaleX() - zoomAmount * 0.001)
      );

      scaleStageTo(stage, newScale, pointer);
      setZoomLevel(newScale / baseScale);
    }

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      onWheelImpl(stage!, event.deltaY);
    }

    stage.content.addEventListener("wheel", onWheel);

    return () => {
      stage.content.removeEventListener("wheel", onWheel);
    };
  }, [baseScale]);
}
