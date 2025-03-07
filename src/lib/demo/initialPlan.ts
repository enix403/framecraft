import { serverIdToNodeType } from "../nodes";
import planJsonRaw from "./planA.json";

export type RoomRect = [
  number /* row */,
  number /* col */,
  number /* width */,
  number /* height */
];

export function getInitialPlan() {
  const { shape, rooms, walls, doors, scale } = planJsonRaw;

  const [canvasRows, canvasCols] = shape;
  const [scaleRows, scaleCols] = scale;

  let wallsN = walls.map((wall, index) => ({
    id: `wall-${index}`,
    row: wall[0] as number,
    col: wall[1] as number,
    length: wall[2] as number,
    direction: wall[3] as "h" | "v",
    width: 1
  }));

  let doorsN = doors.map((door, index) => ({
    id: `door-${index}`,
    row: door[0] as number,
    col: door[1] as number,
    length: door[2] as number,
    direction: door[3] as "h" | "v"
  }));

  let roomsN = rooms.map((room, index) => {
    let [type, ...flatRects] = room;
    let rects: RoomRect[] = [];

    for (let i = 0; i < flatRects.length; i += 4) {
      rects.push([
        scaleRows * flatRects[i],
        scaleCols * flatRects[i + 1],
        scaleCols * flatRects[i + 2],
        scaleRows * flatRects[i + 3]
      ]);
    }

    const nodeType = serverIdToNodeType[type];

    return {
      typeId: nodeType.id,
      id: `room-${index}`,
      label: nodeType.title ?? "Room",
      rects
    }
  });

  return {
    canvasRows,
    canvasCols,
    walls: wallsN,
    doors: doorsN,
    rooms: roomsN
  };
}
