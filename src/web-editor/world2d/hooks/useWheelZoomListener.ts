import Konva from "konva";
import { useEffect, RefObject, useCallback } from "react";
import { useSetZoomLevel } from "../state/settings";
import { CameraController } from "../state/camera";

const MIN_SCALE_REL = 0.5;
const MAX_SCALE_REL = 4;

/* export function useStageScaler(
  stageRef: RefObject<Konva.Stage | null>,
  baseScale: number
) {
  const setZoomLevel = useSetZoomLevel();

  const scaleStageTo = useCallback(
    (newScale: number, focusPoint?: Konva.Vector2d) => {

      setZoomLevel(newScale / baseScale);

      const stage = stageRef.current;
      if (!stage) return;

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
    },
    [baseScale]
  );

  // const resetScale() {}

  return scaleStageTo;
} */

export function useWheelZoomListener(camera: CameraController) {
  useEffect(() => {
    if (!camera.isStageActive()) {
      return;
    }
    const stage = camera.Stage!;

    const minScale = MIN_SCALE_REL * camera.BaseScale;
    const maxScale = MAX_SCALE_REL * camera.BaseScale;

    function onWheelImpl(stage: Konva.Stage, zoomAmount: number) {
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, stage.scaleX() - zoomAmount * 0.001)
      );

      camera.scaleStageTo(newScale, pointer);
    }

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      onWheelImpl(stage!, event.deltaY);
    }

    stage.content.addEventListener("wheel", onWheel);

    return () => {
      stage.content.removeEventListener("wheel", onWheel);
    };

  }, [camera]);
}

/*
export function useWheelZoomListener(
  stageRef: RefObject<Konva.Stage | null>,
  baseScale: number
) {
  const scaleStageTo = useStageScaler(stageRef, baseScale);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const minScale = MIN_SCALE_REL * baseScale;
    const maxScale = MAX_SCALE_REL * baseScale;

    scaleStageTo(stage.scaleX());

    function onWheelImpl(stage: Konva.Stage, zoomAmount: number) {
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, stage.scaleX() - zoomAmount * 0.001)
      );

      scaleStageTo(newScale, pointer);
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
 */
