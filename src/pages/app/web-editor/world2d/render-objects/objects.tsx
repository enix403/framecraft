import { Rect, Text, Line } from "react-konva";

import { useSettings } from "../state/settings";
import { appNodeStyle } from "@/lib/node-styles";

import {
  CELL_SIZE,
  snapToGrid,
  CELL_PHYSICAL_LENGTH,
  unitFactor
} from "@/lib/units";

import { usePlanComponents } from "../../plan-state";

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

export function RenderWalls() {
  const plan = usePlanComponents();
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

function WallMeasure({
  side,
  x,
  y,
  width,
  height,
  length,
  gap = 8,
  textGap = 8
}) {
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

  const physicalLength = Math.round(
    length * CELL_PHYSICAL_LENGTH * (unitFactor[unit] || 1)
  );

  return (
    <>
      <Line points={points} stroke='#AAAAAA' />
      <Text
        text={`${physicalLength} ${unit}`}
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

export function RenderWallMeasures() {
  const plan = usePlanComponents();

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
          length={length}
          side={direction === "h" ? "top" : "right"}
        />
      );
    }
  );
}

export function RenderDoors() {
  const plan = usePlanComponents();

  return plan.doors.map(({ id, row, col, length, direction }) => {
    const { x, y, width, height } = calcLineRect(
      row,
      col,
      length,
      direction,
      1
    );

    return (
      <Rect key={id} x={x} y={y} width={width} height={height} fill='#F6F6F6' />
    );
  });
}

export function RenderRoomLabels() {
  const plan = usePlanComponents();

  return plan.rooms.map((room, i) => {
    let largestRectIndex = -1;
    let largestArea = -1;

    for (let i = 0; i < room.rects.length; ++i) {
      const { width, height } = room.rects[i];
      let area = width * height;

      if (area > largestArea) {
        largestArea = area;
        largestRectIndex = i;
      }
    }

    let { row, col, width, height } = room.rects[largestRectIndex];

    const label = room.label;

    if (!label) return;

    return (
      <Text
        key={room.id}
        x={(col + width / 2) * CELL_SIZE}
        y={(row + height / 2) * CELL_SIZE}
        width={1000}
        height={1000}
        offsetX={500}
        offsetY={500}
        align='center'
        verticalAlign='middle'
        text={label}
        fontSize={13}
        fill={"black"}
      />
    );
  });
}

export function RenderRooms() {
  const plan = usePlanComponents();
  return plan.rooms.map((room, i) => {
    // const color = roomInfoFromNodeType(room.type)?.rectColor || "#ff0000";
    const style = appNodeStyle[room.typeId];
    const color = style.mapRectColor;
    return room.rects.map(({ row, col, width, height }, j) => (
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
