import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import { mapRange } from "canvas-sketch-util/math";
import { polygonHull } from "d3-polygon";

export const RectPreview = ({ rectangles, height = 500 }) => {
  const [scaledRects, setScaledRects] = useState<any[]>([]);
  const [outline, setOutline] = useState([]);

  useEffect(() => {
    if (rectangles.length === 0) return;

    // Compute bounding box of all rectangles
    const minX = Math.min(...rectangles.map(r => r.left));
    const maxX = Math.max(...rectangles.map(r => r.left + r.width));
    const minY = Math.min(...rectangles.map(r => r.top));
    const maxY = Math.max(...rectangles.map(r => r.top + r.height));
    const originalWidth = maxX - minX;
    const originalHeight = maxY - minY;

    // Compute scale to fit fixed height while maintaining aspect ratio
    const scale = height / originalHeight;
    const width = originalWidth * scale;

    // Scale and translate rectangles
    const transformedRects = rectangles.map(r => ({
      x: (r.left - minX) * scale,
      y: (r.top - minY) * scale,
      width: r.width * scale,
      height: r.height * scale
    }));
    setScaledRects(transformedRects);

    // Compute outer border using d3.polygonHull
    const points = rectangles.flatMap(r => [
      [r.left, r.top],
      [r.left + r.width, r.top],
      [r.left, r.top + r.height],
      [r.left + r.width, r.top + r.height]
    ]);
    const hull = polygonHull(points)?.map(([x, y]) => [
      mapRange(x, minX, maxX, 0, width),
      mapRange(y, minY, maxY, 0, height)
    ]);
    setOutline(hull ? hull.flat() : []);
  }, [rectangles, height]);

  return (
    <Stage
    className="mx-auto"
      width={
        scaledRects.length > 0
          ? scaledRects.reduce((max, r) => Math.max(max, r.x + r.width), 0)
          : 0
      }
      height={height}
    >
      <Layer>
        {scaledRects.map((r, i) => (
          <Rect
            key={i}
            x={r.x}
            y={r.y}
            width={r.width}
            height={r.height}
            fill='lightblue'
            stroke='black'
            strokeWidth={1}
          />
        ))}
        {outline.length > 0 && (
          <Line points={outline} stroke='black' strokeWidth={2} closed />
        )}
      </Layer>
    </Stage>
  );
};
