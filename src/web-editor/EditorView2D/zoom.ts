import Konva from "konva";
import { useState, useEffect, RefObject } from "react";

export function useStageZoom(stageRef: RefObject<Konva.Stage | null>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.content.addEventListener("wheel", e => {
        e.preventDefault();

        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const oldScale = stage.scaleX();
        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale
        };

        const newScale = Math.max(
          0.1,
          Math.min(5, oldScale - e.deltaY * 0.001)
        );
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale
        };

        stage.position(newPos);
        setScale(newScale);
      });
    }
  }, []);

  return { scale };
}

