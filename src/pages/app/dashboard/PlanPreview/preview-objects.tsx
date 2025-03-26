import { Rect } from "react-konva";
import { appNodeStyle } from "@/lib/node-styles";

export const CELL_SIZE = 5;
export const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;

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

export function RenderWalls({ components }: { components: any }) {
  return components.walls.map(
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
          fill={"#000000"}
          stroke='black'
          strokeWidth={1.5}
        />
      );
    }
  );
}

export function RenderDoors({ components }: { components: any }) {
  return components.doors.map(({ id, row, col, length, direction }) => {
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

/* TODO: proper typing of components */
export function RenderRooms({ components }: { components: any }) {
  return components.rooms.map((room, i) => {
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
