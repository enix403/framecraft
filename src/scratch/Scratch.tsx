import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";

import { getInitialPlan } from "@/web-editor/EditorView2D/initialPlan";
import { useMeasure } from "@uidotdev/usehooks";
(window as any).getInitialPlan = getInitialPlan;

const initialPlan = getInitialPlan();

const CELL_SIZE = 5;

const BG_COLOR = "#26102b";
const ROOM_COLOR = "rgba(107, 30, 189, 0.3)";
const WALL_COLOR = "#CAC0C9";
const ACTIVE_COLOR = "#1c5ce8";

const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;

type Item = { type: string; id: any };

function useStageZoom(stage: Konva.Stage | null) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
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
  }, [stage]);

  return { scale };
}

function useInitialRecenter(
  stage: Konva.Stage | null,
  plan: any,
  containerSize: {
    width: number | null;
    height: number | null;
  }
) {
  const firstPlaced = useRef(false);

  useLayoutEffect(() => {
    if (firstPlaced.current) {
      return;
    }

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

    const initialScale = { x: scale, y: scale };

    stage.position(initialPos);
    stage.scale(initialScale);
  }, [stage, containerSize]);
}

function ScratchEditorView2D({ plan }: { plan: any }) {
  const stageRef = useRef<Konva.Stage | null>(null);

  const [containerRef, containerSize] = useMeasure();
  const { scale } = useStageZoom(stageRef.current);
  useInitialRecenter(stageRef.current, plan, containerSize);

  return (
    <div ref={containerRef} className='h-full max-h-full w-full max-w-full'>
      <Stage
        ref={stageRef}
        width={containerSize.width || 0}
        height={containerSize.height || 0}
        draggable
        scaleX={scale}
        scaleY={scale}
        style={{ background: BG_COLOR }}
      >
        <Layer>
          {plan.rooms.map((room, i) =>
            room.rects.map(([row, col, width, height], j) => (
              <>
                <Rect
                  key={`room-${i}-${j}`}
                  x={col * CELL_SIZE}
                  y={row * CELL_SIZE}
                  width={width * CELL_SIZE}
                  height={height * CELL_SIZE}
                  fill={ROOM_COLOR}
                />
                <Text
                  x={(col + width / 2) * CELL_SIZE - 20}
                  y={(row + height / 2) * CELL_SIZE - 10}
                  text={room.label}
                  fontSize={12}
                  fill={"#ffffff"}
                />
              </>
            ))
          )}

          {/* Draw Walls */}
          {plan.walls.map(({ id, row, col, length, direction, width }) => (
            <Rect
              key={id}
              x={snapToGrid(col * CELL_SIZE)}
              y={snapToGrid(row * CELL_SIZE)}
              width={direction === "h" ? length * CELL_SIZE : width * CELL_SIZE}
              height={
                direction === "v" ? length * CELL_SIZE : width * CELL_SIZE
              }
              fill={WALL_COLOR}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export function Scratch() {
  return <ScratchEditorView2D plan={initialPlan} />;
}
