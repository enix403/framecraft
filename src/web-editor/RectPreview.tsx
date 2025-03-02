import clsx from "clsx";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import { mapRange } from "canvas-sketch-util/math";
import { polygonHull } from "d3-polygon";

(window as any).polygonHull = polygonHull;
(window as any).mapRange = mapRange;

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function RectPreview({
  rectangles,
  canvasHeight = 150,
  className,
  fillColor = "#E6DBF3",
  inStrokeColor = fillColor,
  inStrokeWidth = 1,
  outStrokeColor = "#a055f7",
  outStrokeWidth = 4
}: {
  rectangles: Rect[];
  canvasHeight?: number;
  className?: string;

  fillColor?: string;
  inStrokeColor?: string;
  outStrokeColor?: string;
  inStrokeWidth?: number;
  outStrokeWidth?: number;
}) {
  const [scaledRects, setScaledRects] = useState<Rect[]>([]);
  // const [outline, setOutline] = useState<number[]>([]);

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
    const scale = canvasHeight / originalHeight;
    const width = originalWidth * scale;

    // Scale and translate rectangles
    const transformedRects = rectangles.map(r => ({
      left: (r.left - minX) * scale,
      top: (r.top - minY) * scale,
      width: r.width * scale,
      height: r.height * scale
    }));
    setScaledRects(transformedRects);

    return;

    // Compute outer border using d3.polygonHull
    const points = rectangles.flatMap(
      r =>
        [
          [r.left, r.top],
          [r.left + r.width, r.top],
          [r.left + r.width, r.top + r.height],
          [r.left, r.top + r.height],
        ] as [number, number][]
    );

    const hull = polygonHull(points)?.map(([x, y]) => [
      mapRange(x, minX, maxX, 0, width),
      mapRange(y, minY, maxY, 0, canvasHeight)
    ]) as number[][];

    // setOutline(hull ? hull.flat() : []);
  }, [rectangles, canvasHeight]);

  return (
    <div className={clsx("flex overflow-x-auto pb-2", className)}>
      <Stage
        className='mx-auto'
        width={
          scaledRects.length > 0
            ? scaledRects.reduce((max, r) => Math.max(max, r.left + r.width), 0)
            : 0
        }
        height={canvasHeight}
      >
        <Layer>
          {scaledRects.map((r, i) => (
            <Rect
              key={i}
              x={r.left}
              y={r.top}
              width={r.width}
              height={r.height}
              // fill='lightblue'
              fill={fillColor}
              stroke={inStrokeColor}
              strokeWidth={inStrokeWidth}
            />
          ))}
          {/* {outline.length > 0 && (
            <Line
              points={outline}
              stroke={outStrokeColor}
              strokeWidth={outStrokeWidth}
              closed
            />
          )} */}
        </Layer>
      </Stage>
    </div>
  );
}
