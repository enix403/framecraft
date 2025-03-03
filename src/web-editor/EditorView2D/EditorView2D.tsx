import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Line, Text } from "react-konva";

import { getInitialPlan } from "./initialPlan";
import { useMeasure } from "@uidotdev/usehooks";
(window as any).getInitialPlan = getInitialPlan;

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

const initialPlan = getInitialPlan();

const CELL_SIZE = 5;

// const BG_COLOR = "#37424E";
// const WALL_COLOR = "#C9246A";

const BG_COLOR = "#26102b";
const ROOM_COLOR = "rgba(107, 30, 189, 0.3)";

const WALL_COLOR = "#CAC0C9";
const ACTIVE_COLOR = "#1c5ce8";

const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;

type Item = { type: string; id: any };
type Action = { plan: any; selectedOnUndoRedo: Item | null };

export function EditorView2D() {
  const [containerRef, containerSize] = useMeasure();

  const [plan, setPlan] = useState(initialPlan);
  const [viewport, setViewport] = useState({
    scale: 1
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      // stage.on("dragmove", () => {
      //   const pos = stage.position();
      //   setViewport(prev => ({ ...prev, x: -pos.x, y: -pos.y }));
      // });

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
        setViewport(prev => ({
          ...prev,
          scale: newScale
        }));
      });
    }
  }, []);

  const firstPlaced = useRef(false);
  useLayoutEffect(() => {
    if (firstPlaced.current) {
      return;
    }

    const stage = stageRef.current;

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
  }, [containerSize]);

  const [undoStack, setUndoStack] = useState<Action[]>([]);
  const [redoStack, setRedoStack] = useState<Action[]>([]);

  const pushToHistory = (newPlan, affectedItem) => {
    setUndoStack(prev => [...prev, { plan, selectedOnUndoRedo: affectedItem }]);
    setRedoStack([]); // Clear redo stack on a new action
    setPlan(newPlan);
    setSelectedItem(affectedItem); // Ensure the item stays selected
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.ctrlKey && e.key === "z" && undoStack.length > 0) {
        const lastState = undoStack[undoStack.length - 1];
        setRedoStack(prev => [
          { plan, selectedOnUndoRedo: selectedItem },
          ...prev
        ]);
        setPlan(lastState.plan);
        setSelectedItem(lastState.selectedOnUndoRedo); // Auto-select the affected item
        setUndoStack(prev => prev.slice(0, -1));
      }
      if (e.ctrlKey && e.key === "y" && redoStack.length > 0) {
        const nextState = redoStack[0];
        setUndoStack(prev => [
          ...prev,
          { plan, selectedOnUndoRedo: selectedItem }
        ]);
        setPlan(nextState.plan);
        setSelectedItem(nextState.selectedOnUndoRedo); // Auto-select the affected item
        setRedoStack(prev => prev.slice(1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undoStack, redoStack, plan, selectedItem]);

  return (
    <div ref={containerRef} className='h-full max-h-full w-full max-w-full'>
      <Stage
        width={containerSize.width || 0}
        height={containerSize.height || 0}
        draggable
        ref={stageRef}
        scaleX={viewport.scale}
        scaleY={viewport.scale}
        style={{ background: BG_COLOR }}
        onClick={() => setSelectedItem(null)}
      >
        <Layer>
          {/* <Rect
            x={-10 * CELL_SIZE}
            width={10 * CELL_SIZE}
            y={0}
            height={10 * CELL_SIZE}
            fill='rgba(0, 255, 0, 0.3)'
          /> */}
          {/* Draw Rooms First */}
          {plan.rooms.map((room, i) =>
            room.rects.map(([row, col, width, height], j) => (
              <>
                <Rect
                  key={`room-${i}-${j}`}
                  x={col * CELL_SIZE}
                  y={row * CELL_SIZE}
                  width={width * CELL_SIZE}
                  height={height * CELL_SIZE}
                  // fill='rgba(245, 118, 236, 0.3)'
                  fill={ROOM_COLOR}
                  // stroke='green'
                  // strokeWidth={1}
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
              stroke={selectedItem?.id === id ? ACTIVE_COLOR : WALL_COLOR}
              strokeWidth={selectedItem?.id === id ? 3 : 1}
              draggable
              onDragStart={e => {
                setSelectedItem({ type: "Wall", id });
              }}
              onDragMove={e => {
                const newX = snapToGrid(e.target.x());
                const newY = snapToGrid(e.target.y());
                e.target.x(newX);
                e.target.y(newY);
              }}
              onDragEnd={e => {
                const newX = snapToGrid(e.target.x());
                const newY = snapToGrid(e.target.y());
                pushToHistory(
                  prev => ({
                    ...prev,
                    walls: prev.walls.map(wall =>
                      wall.id === id
                        ? {
                            ...wall,
                            col: newX / CELL_SIZE,
                            row: newY / CELL_SIZE
                          }
                        : wall
                    )
                  }),
                  { type: "Wall", id }
                );
              }}
              onClick={e => {
                e.cancelBubble = true;
                setSelectedItem({ type: "Wall", id });
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
