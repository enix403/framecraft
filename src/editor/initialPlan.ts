import planJsonRaw from "./plan.json";
(window as any).planJsonRaw = planJsonRaw;

export function getInitialPlan() {
  const { shape, rooms, walls, doors } = planJsonRaw;

  const [canvasRows, canvasCols] = shape;

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
    let rects: number[][] = [];

    for (let i = 0; i < flatRects.length; i += 4) {
      rects.push([
        3 * flatRects[i],
        3 * flatRects[i + 1],
        3 * flatRects[i + 2],
        3 * flatRects[i + 3]
      ]);
    }

    return {
      label: `Room ${index}`,
      rects
    };
  });

  return {
    canvasRows,
    canvasCols,
    walls: wallsN,
    doors: doorsN,
    rooms: roomsN
  };
}

// const initialPlan = {
//   canvasRows: 192,
//   canvasCols: 192,
//   walls: [
//     { id: "wall-1", row: 5, col: 10, length: 5, direction: "h", width: 1 },
//     { id: "wall-2", row: 12, col: 8, length: 3, direction: "v", width: 1 },
//   ],
//   doors: [
//     { id: "door-1", row: 5, col: 10, length: 2, direction: "h" },
//     { id: "door-2", row: 12, col: 8, length: 1, direction: "v" },
//   ],
//   rooms: [
//     { label: "Living Room", rects: [[2, 2, 50, 40]] },
//     { label: "Bedroom", rects: [[100, 50, 40, 60]] },
//   ],
// };
