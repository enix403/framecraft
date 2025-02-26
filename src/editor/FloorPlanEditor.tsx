// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
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
const ROOM_COLOR = 'rgba(107, 30, 189, 0.3)';

const WALL_COLOR = "#CAC0C9";
const ACTIVE_COLOR = "#1c5ce8";

const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;

const FloorPlanEditor = () => {
  const [containerRef, containerSize] = useMeasure();

  const [plan, setPlan] = useState(initialPlan);
  const [viewport, setViewport] = useState({
    scale: 1
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const stageRef = useRef(null);

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

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

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
    <div ref={containerRef} className='w-full max-w-full h-full max-h-full'>
      <Stage
        width={containerSize.width}
        height={containerSize.height}
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
};

export default FloorPlanEditor;

/*

Great. Now I want you to implement some other editing features. Note that all of these are very interactive and you might need to do some serious code refactoring for this.

Editing Features
  - walls can be moved around interactively (without breaking contact with other wall joints)
  - walls endpoints can be extended and shortend interactively (without breaking contact with other wall joints)

I also noticed a bug. The things should be rendered in this order room -> walls -> doors, otherwise the events do not correctly flow and get blocked. Fix this too.


  - new walls can added (independently or by "extruding" an orthognal existing wall from some point)
  - wall width can be changed (individual per wall)



*/
