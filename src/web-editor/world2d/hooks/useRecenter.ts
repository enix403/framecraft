import Konva from "konva";
import { useRef, useLayoutEffect, RefObject, useState } from "react";

import { CELL_SIZE } from "../common";
import { useSetZoomLevel } from "../state/settings";
import { usePlan } from "@/web-editor/PlanProvider";

export function useRecenter(
  stageRef: RefObject<Konva.Stage | null>,
  containerSize: {
    width: number | null;
    height: number | null;
  }
) {
  const plan = usePlan();

  const setZoomLevel = useSetZoomLevel();
  const firstPlaced = useRef(false);

  const [baseScale, setBaseScale] = useState(1);

  function performRecenter() {
    const stage = stageRef.current;

    if (!stage) return;

    if (plan.rooms.length === 0) return;
    if (!containerSize.width || !containerSize.height) return;

    firstPlaced.current = true;

    let minRow = Infinity,
      minCol = Infinity;
    let maxRow = -Infinity,
      maxCol = -Infinity;

    // Find bounding box of all room rects
    plan.rooms.forEach(room => {
      room.rects.forEach(([row, col, width, height]) => {
        minRow = Math.min(minRow, row);
        minCol = Math.min(minCol, col);
        maxRow = Math.max(maxRow, row + height);
        maxCol = Math.max(maxCol, col + width);
      });
    });

    // Convert to pixel dimensions
    const boundingWidth = (maxCol - minCol) * CELL_SIZE;
    const boundingHeight = (maxRow - minRow) * CELL_SIZE;

    const paddingFactor = 0.9; // Leave 10% padding around the plan
    const scaleX = (containerSize.width / boundingWidth) * paddingFactor;
    const scaleY = (containerSize.height / boundingHeight) * paddingFactor;
    const scale = Math.min(scaleX, scaleY); // Fit to the smaller dimension

    // Compute center of bounding box
    const centerX = ((minCol + maxCol) / 2) * CELL_SIZE;
    const centerY = ((minRow + maxRow) / 2) * CELL_SIZE;

    // Compute new viewport offset to center it
    const screenCenterX = containerSize.width / 2;
    const screenCenterY = containerSize.height / 2;

    const initialPos = {
      x: screenCenterX - centerX * scale,
      y: screenCenterY - centerY * scale
    };

    setBaseScale(scale);

    const initialScale = { x: scale, y: scale };

    stage.position(initialPos);
    stage.scale(initialScale);
    setZoomLevel(1);
  }

  useLayoutEffect(() => {
    if (!containerSize.width || !containerSize.height) return;

    if (firstPlaced.current) {
      return;
    }
    performRecenter();
  }, [containerSize]);

  return {
    forceRecenter: performRecenter,
    baseScale
  };
}
