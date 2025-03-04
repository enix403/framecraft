import Konva from "konva";
import { useRef, RefObject, useMemo } from "react";

import { CELL_SIZE } from "../common";
import { usePlan } from "@/web-editor/PlanProvider";

export type PlanFocus = {
  planCenter: Konva.Vector2d;
  baseScale: number;
};

const noFocus: PlanFocus = {
  planCenter: { x: NaN, y: NaN },
  baseScale: 1
};

export function usePlanFocus(
  stageRef: RefObject<Konva.Stage | null>,
  containerSize: {
    width: number | null;
    height: number | null;
  }
) {
  const plan = usePlan();
  const firstPlaced = useRef(false);

  return useMemo(() => {
    const stage = stageRef.current;
    if (!stage) return noFocus;

    if (plan.rooms.length === 0) return noFocus;
    if (!containerSize.width || !containerSize.height) return noFocus;

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
    const baseScale = Math.min(scaleX, scaleY); // Fit to the smaller dimension

    // Compute center of bounding box
    const centerX = ((minCol + maxCol) / 2) * CELL_SIZE;
    const centerY = ((minRow + maxRow) / 2) * CELL_SIZE;

    // Compute new viewport offset to center it
    const screenCenterX = containerSize.width / 2;
    const screenCenterY = containerSize.height / 2;

    const planCenter = {
      x: screenCenterX - centerX * baseScale,
      y: screenCenterY - centerY * baseScale
    };

    return { planCenter, baseScale } as PlanFocus;
  }, [plan, containerSize]);
}
