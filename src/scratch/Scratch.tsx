import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text, Line } from "react-konva";

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
        <>
          <Rect
            key={id}
            x={x}
            y={y}
            width={width}
            height={height}
            fill={"#919191"}
            stroke='black'
            strokeWidth={1.5}
          />
        </>
      );
    }
  );
}

function WallMeasure({ side, x, y, width, height, gap = 8, textGap = 8 }) {
  let points: any[] = [];

  {
    const w = width - 1;
    const h = height - 1;

    if (side === "top") {
      points = [x, y, x, y - gap, x + w, y - gap, x + w, y];
    } else if (side === "bottom") {
      points = [x, y + h, x, y + h + gap, x + w, y + h + gap, x + w, y + h];
    } else if (side === "left") {
      points = [x, y, x - gap, y, x - gap, y + h, x, y + h];
    } else if (side === "right") {
      points = [x + w, y, x + w + gap, y, x + w + gap, y + h, x + w, y + h];
    }
  }

  let lineCenterX = Math.round((points[2] + points[4]) / 2);
  let lineCenterY = Math.round((points[3] + points[5]) / 2);

  if (side == "top") lineCenterY -= textGap;
  if (side == "bottom") lineCenterY += textGap;
  if (side == "left") lineCenterX -= textGap;
  if (side == "right") lineCenterX += textGap;

  let rot = 0;
  if (side === "right") {
    rot = 90;
  } else if (side === "left") {
    rot = -90;
  }

  return (
    <>
      <Line points={points} stroke='#AAAAAA' />
      <Text
        text='1000ft'
        fontSize={13}
        fill='#848484'
        x={lineCenterX}
        y={lineCenterY}
        width={1000}
        height={1000}
        offsetX={500}
        offsetY={500}
        align='center'
        verticalAlign='middle'
        rotationDeg={rot}
      />
    </>
  );
}

function RenderWallMeasures({ plan }: { plan: any }) {
  return plan.walls.map(({ row, col, length, direction, width: thickness }) => {
    if (length < 25) return null;

    const { x, y, width, height } = calcLineRect(
      row,
      col,
      length,
      direction,
      thickness
    );

    return (
      <WallMeasure
        x={x}
        y={y}
        width={width}
        height={height}
        side={direction === "h" ? "top" : "right"}
      />
    );
  });
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
  useInitialRecenter(stageRef.current, plan, containerSize);
  const { scale } = useStageZoom(stageRef.current);

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
          <RenderWallMeasures plan={plan} />
        </Layer>
      </Stage>
    </div>
  );
}

export function Scratch() {
  return <ScratchEditorView2D plan={initialPlan} />;
}
