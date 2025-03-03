import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Line } from "react-konva";

import { getInitialPlan } from "./initialPlan";
import { useMeasure } from "@uidotdev/usehooks";
import { useStageZoom } from "./zoom";
import { useRecenter } from "./recenter";
import { CELL_SIZE, roomInfoFromNodeType, snapToGrid } from "./common";
import { eventSubject, useSettings } from "./settings";
import { PlanContext, usePlan } from "./PlanProvider";

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

function RenderWalls() {
  const plan = usePlan();
  const settings = useSettings();

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
          // fill={"#919191"}
          fill={settings.viewMode === "color" ? "#000000" : "#919191"}
          stroke='black'
          strokeWidth={1.5}
        />
      );
    }
  );
}

function WallMeasure({ side, x, y, width, height, gap = 8, textGap = 8 }) {
  const { unit } = useSettings();

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
        text={`1000 ${unit}`}
        fontSize={16}
        fill='#848484'
        x={lineCenterX}
        y={lineCenterY}
        width={1000}
        height={1000}
        offsetX={500}
        offsetY={500}
        align='center'
        verticalAlign='middle'
        rotation={rot}
      />
    </>
  );
}

function RenderWallMeasures() {
  const plan = usePlan();

  return plan.walls.map(
    ({ id, row, col, length, direction, width: thickness }) => {
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
          key={id}
          x={x}
          y={y}
          width={width}
          height={height}
          side={direction === "h" ? "top" : "right"}
        />
      );
    }
  );
}

function RenderDoors() {
  const plan = usePlan();

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

function RenderRoomLabels() {
  const plan = usePlan();

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

    const label = roomInfoFromNodeType(room.type)?.title;

    if (!label) return;

    return (
      <Text
        key={room.id}
        x={(col + width / 2) * CELL_SIZE - 20}
        y={(row + height / 2) * CELL_SIZE - 10}
        text={label}
        fontSize={13}
        fill={"black"}
      />
    );
  });
}

function RenderRooms() {
  const plan = usePlan();
  return plan.rooms.map((room, i) => {
    const color = roomInfoFromNodeType(room.type)?.rectColor || "#ff0000";
    return room.rects.map(([row, col, width, height], j) => (
      <Rect
        key={`room-${i}-${j}`}
        x={col * CELL_SIZE}
        y={row * CELL_SIZE}
        width={width * CELL_SIZE}
        height={height * CELL_SIZE}
        fill={color}
        stroke={color}
      />
    ));
  });
}

const plan = initialPlan;

export function EditorView2D() {
  const [containerRef, containerSize] = useMeasure();
  const stageRef = useRef<Konva.Stage | null>(null);

  const { forceRecenter, baseScale } = useRecenter(
    stageRef,
    plan,
    containerSize
  );
  const { scale } = useStageZoom(stageRef, baseScale);

  useEffect(() => {
    const subscription = eventSubject.subscribe(event => {
      if (event === "recenter") {
        forceRecenter();
      }
    });

    return () => subscription.unsubscribe();
  }, [forceRecenter]);

  const settings = useSettings();

  useEffect(() => {
    console.log(scale);
  }, [scale]);

  return (
    <PlanContext.Provider value={plan}>
      <div ref={containerRef} className='h-full max-h-full w-full max-w-full'>
        <Stage
          ref={stageRef}
          width={containerSize.width || 0}
          height={containerSize.height || 0}
          draggable
          // scaleX={scale}
          // scaleY={scale}
          style={{ background: "#F6F6F6" }}
        >
          <Layer>
            {settings.viewMode === "color" && <RenderRooms />}
            <RenderWalls />
            <RenderDoors />
            {settings.enableRoomLabels && <RenderRoomLabels />}
            {settings.enableWallMeasure && <RenderWallMeasures />}
          </Layer>
        </Stage>
      </div>
    </PlanContext.Provider>
  );
}
