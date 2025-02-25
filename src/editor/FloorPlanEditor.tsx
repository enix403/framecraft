// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";

const initialPlan = {
  canvasRows: 800,
  canvasCols: 800,
  walls: [
    { row: 5, col: 10, length: 5, direction: "h", width: 1 },
    { row: 12, col: 8, length: 3, direction: "v", width: 1 }
  ],
  doors: [
    // [5, 10, 2, "h"],
    // [12, 8, 1, "v"],
  ],
  rooms: [
    { label: "Living Room", rects: [[2, 2, 50, 40]] },
    { label: "Bedroom", rects: [[100, 50, 40, 60]] }
  ]
};

const CELL_SIZE = 5;
const VIEWPORT_SIZE = 800;

const FloorPlanEditor = () => {
  const [plan, setPlan] = useState(initialPlan);
  const [viewport, setViewport] = useState({
    x: 0,
    y: 0,
    width: VIEWPORT_SIZE,
    height: VIEWPORT_SIZE,
    scale: 1
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.on("dragmove", () => {
        const pos = stage.position();
        setViewport(prev => ({ ...prev, x: -pos.x, y: -pos.y }));
      });

      stage.content.addEventListener("wheel", e => {
        if (e.shiftKey) {
          e.preventDefault();
          const stage = stageRef.current;
          const oldScale = stage.scaleX();
          const pointer = stage.getPointerPosition();
          if (!pointer) return;

          const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale
          };

          const newScale = Math.max(
            0.5,
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
            scale: newScale,
            x: -newPos.x,
            y: -newPos.y
          }));
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
            <p>
              <strong>Type:</strong> {selectedItem.type}
            </p>
            <p>
              <strong>ID:</strong> {selectedItem.id}
            </p>
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
        listening
      >
        <Layer listening>
          {/* Draw Rooms */}
          {plan.rooms.map((room, i) =>
            room.rects.map(([row, col, width, height], j) => (
              <>
                <Rect
                  key={`room-${i}-${j}`}
                  x={col * CELL_SIZE}
                  y={row * CELL_SIZE}
                  width={width * CELL_SIZE}
                  height={height * CELL_SIZE}
                  fill='rgba(0, 255, 0, 0.3)'
                  stroke='green'
                  strokeWidth={1}
                />
                <Text
                  x={(col + width / 2) * CELL_SIZE - 20}
                  y={(row + height / 2) * CELL_SIZE - 10}
                  text={room.label}
                  fontSize={12}
                  fill='black'
                />
              </>
            ))
          )}

          {/* Draw Walls as Runs */}
          {plan.walls.map(({ row, col, length, direction, width }, index) => (
            <Rect
              key={`wall-${index}`}
              x={col * CELL_SIZE}
              y={row * CELL_SIZE}
              width={direction === "h" ? length * CELL_SIZE : width * CELL_SIZE}
              height={
                direction === "v" ? length * CELL_SIZE : width * CELL_SIZE
              }
              fill='blue'
              stroke={selectedItem?.id === `wall-${index}` ? "pink" : "blue"}
              strokeWidth={selectedItem?.id === `wall-${index}` ? 3 : 1}
              onClick={e => {
                console.log("Hello");
                e.cancelBubble = true;
                setSelectedItem({ type: "Wall", id: `wall-${index}` });
              }}
            />
          ))}

          {/* Draw Doors */}
          {plan.doors.map(([row, col, len, dir], index) => (
            <Line
              key={`door-${index}`}
              points={
                dir === "h"
                  ? [
                      col * CELL_SIZE,
                      row * CELL_SIZE,
                      (col + len) * CELL_SIZE,
                      row * CELL_SIZE
                    ]
                  : [
                      col * CELL_SIZE,
                      row * CELL_SIZE,
                      col * CELL_SIZE,
                      (row + len) * CELL_SIZE
                    ]
              }
              stroke={selectedItem?.id === `door-${index}` ? "pink" : "red"}
              strokeWidth={selectedItem?.id === `door-${index}` ? 3 : 2}
              onClick={e => {
                e.cancelBubble = true;
                setSelectedItem({ type: "Door", id: `door-${index}` });
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default FloorPlanEditor;
