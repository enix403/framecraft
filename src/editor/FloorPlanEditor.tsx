// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";

const initialPlan = {
  canvasRows: 192,
  canvasCols: 192,
  walls: [
    { id: "wall-1", row: 5, col: 10, length: 5, direction: "h", width: 1 },
    { id: "wall-2", row: 12, col: 8, length: 3, direction: "v", width: 1 },
  ],
  doors: [
    { id: "door-1", row: 5, col: 10, length: 2, direction: "h" },
    { id: "door-2", row: 12, col: 8, length: 1, direction: "v" },
  ],
  rooms: [
    { label: "Living Room", rects: [[2, 2, 50, 40]] },
    { label: "Bedroom", rects: [[100, 50, 40, 60]] },
  ],
};

const CELL_SIZE = 5;
const VIEWPORT_SIZE = 800;

const snapToGrid = (value) => Math.round(value / CELL_SIZE) * CELL_SIZE;

const FloorPlanEditor = () => {
  const [plan, setPlan] = useState(initialPlan);
  const [viewport, setViewport] = useState({ x: 0, y: 0, width: VIEWPORT_SIZE, height: VIEWPORT_SIZE, scale: 1 });
  const [selectedItem, setSelectedItem] = useState(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.on("dragmove", () => {
        const pos = stage.position();
        setViewport((prev) => ({ ...prev, x: -pos.x, y: -pos.y }));
      });

      stage.content.addEventListener("wheel", (e) => {
        if (e.shiftKey) {
          e.preventDefault();
          const oldScale = stage.scaleX();
          const pointer = stage.getPointerPosition();
          if (!pointer) return;

          const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
          };

          const newScale = Math.max(0.5, Math.min(2, oldScale - e.deltaY * 0.001));
          stage.scale({ x: newScale, y: newScale });

          const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
          };

          stage.position(newPos);
          setViewport((prev) => ({ ...prev, scale: newScale, x: -newPos.x, y: -newPos.y }));
        }
      });
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "200px", padding: "10px", background: "#ddd" }}>
        <h3>Selected Item</h3>
        {selectedItem ? (
          <div>
            <p><strong>Type:</strong> {selectedItem.type}</p>
            <p><strong>ID:</strong> {selectedItem.id}</p>
          </div>
        ) : (
          <p>No item selected</p>
        )}
      </div>
      <Stage
        width={VIEWPORT_SIZE}
        height={VIEWPORT_SIZE}
        draggable
        ref={stageRef}
        scaleX={viewport.scale}
        scaleY={viewport.scale}
        style={{ background: "#f0f0f0" }}
        onClick={() => setSelectedItem(null)}
      >
        <Layer>
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
                  fill="rgba(0, 255, 0, 0.3)"
                  stroke="green"
                  strokeWidth={1}
                />
                <Text
                  x={(col + width / 2) * CELL_SIZE - 20}
                  y={(row + height / 2) * CELL_SIZE - 10}
                  text={room.label}
                  fontSize={12}
                  fill="black"
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
              height={direction === "v" ? length * CELL_SIZE : width * CELL_SIZE}
              fill="black"
              stroke={selectedItem?.id === id ? "pink" : "black"}
              strokeWidth={selectedItem?.id === id ? 3 : 1}
              draggable
              onDragMove={(e) => {
                const newX = snapToGrid(e.target.x());
                const newY = snapToGrid(e.target.y());
                e.target.x(newX);
                e.target.y(newY);
              }}
              onDragEnd={(e) => {
                const newX = snapToGrid(e.target.x());
                const newY = snapToGrid(e.target.y());
                setPlan((prev) => ({
                  ...prev,
                  walls: prev.walls.map((wall) =>
                    wall.id === id ? { ...wall, col: newX / CELL_SIZE, row: newY / CELL_SIZE } : wall
                  ),
                }));
              }}
              onClick={(e) => {
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