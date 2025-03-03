import Konva from "konva";
import { useState, useEffect, RefObject } from "react";

const MIN_SCALE_REL = 1;
const MAX_SCALE_REL = 5;

export function useStageZoom(
  stageRef: RefObject<Konva.Stage | null>,
  baseScale: number
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const minScale = MIN_SCALE_REL * baseScale;
    const maxScale = MAX_SCALE_REL * baseScale;

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

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      };

      stage.position(newPos);
      setScale(newScale);
    }

    function onWheel(e: WheelEvent) {
      onWheelImpl(stage!, e);
    }

    stage.content.addEventListener("wheel", onWheel);

    return () => {
      stage.content.removeEventListener("wheel", onWheel);
    };
  }, [baseScale]);

  return { scale };
}
