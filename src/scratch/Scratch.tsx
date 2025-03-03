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

function calcLineRect(
  row: number,
  col: number,
  length: number,
  direction: "h" | "v",
  thickness = 1
) {
  const x = snapToGrid(col * CELL_SIZE);
  const y = snapToGrid(row * CELL_SIZE);

  let width = thickness;
  let height = thickness;

  if (direction == "h") {
    width = length;
  } else {
    height = length;
  }

  width *= CELL_SIZE;
  height *= CELL_SIZE;

  return { x, y, width, height };
}

function RenderWalls({ plan }: { plan: any }) {
  return plan.walls.map(
    ({ id, row, col, length, direction, width: thickness }) => {
      const { x, y, width, height } = calcLineRect(
        row,
        col,
        length,
        direction,
        thickness
      );

      return (
        <Rect
          key={id}
          x={x}
          y={y}
          width={width}
          height={height}
          fill='#919191'
          stroke='black'
          strokeWidth={1.5}
        />
      );
    }
  );
}

function RenderDoors({ plan }: { plan: any }) {
  return plan.doors.map(
    ({ id, row, col, length, direction, width: thickness }) => {
      const { x, y, width, height } = calcLineRect(
        row,
        col,
        length,
        direction,
        thickness
      );

      return (
        <Rect
          key={id}
          x={x}
          y={y}
          width={width}
          height={height}
          fill='#F6F6F6'
        />
      );
    }
  );
}

function RenderRoomLabels({ plan }: { plan: any }) {
  return plan.rooms.map((room, i) => {
    let largestRectIndex = -1;
    let largestArea = -1;

    for (let i = 0; i < room.rects.length; ++i) {
      const [_row, _col, width, height] = room.rects[i];
      let area = width * height;

      if (area > largestArea) {
        largestArea = area;
        largestRectIndex = i;
      }
    }

    let [row, col, width, height] = room.rects[largestRectIndex];

    return (
      <Text
        x={(col + width / 2) * CELL_SIZE - 20}
        y={(row + height / 2) * CELL_SIZE - 10}
        text={room.label}
        fontSize={13}
        fill={"black"}
      />
    );
  });
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
        style={{ background: "#F6F6F6" }}
      >
        <Layer>
          <RenderWalls plan={plan} />
          <RenderDoors plan={plan} />
          <RenderRoomLabels plan={plan} />
        </Layer>
      </Stage>
    </div>
  );
}

export function Scratch() {
  return <ScratchEditorView2D plan={initialPlan} />;
}
