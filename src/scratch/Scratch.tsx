import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";

import { getInitialPlan } from "@/web-editor/EditorView2D/initialPlan";
import { useMeasure } from "@uidotdev/usehooks";
import { useStageZoom } from "./zoom";
import { useInitialRecenter } from "./recenter";
import {
  BG_COLOR,
  CELL_SIZE,
  ROOM_COLOR,
  snapToGrid,
  WALL_COLOR
} from "./common";

/* ============================================= */

(window as any).getInitialPlan = getInitialPlan;
const initialPlan = getInitialPlan();

/* ============================================= */

function RenderRooms({ plan }: { plan: any }) {
  return (
    <>
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
    </>
  );
}

function RenderWalls({ plan }: { plan: any }) {
  return (
    <>
      {plan.walls.map(({ id, row, col, length, direction, width }) => (
        <Rect
          key={id}
          x={snapToGrid(col * CELL_SIZE)}
          y={snapToGrid(row * CELL_SIZE)}
          width={direction === "h" ? length * CELL_SIZE : width * CELL_SIZE}
          height={direction === "v" ? length * CELL_SIZE : width * CELL_SIZE}
          fill={WALL_COLOR}
        />
      ))}
    </>
  );
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
          <RenderRooms plan={plan} />
          <RenderWalls plan={plan} />
        </Layer>
      </Stage>
    </div>
  );
}

export function Scratch() {
  return <ScratchEditorView2D plan={initialPlan} />;
}
