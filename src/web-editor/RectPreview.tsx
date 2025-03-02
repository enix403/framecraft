import clsx from "clsx";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// fillColor = "#E6DBF3",
// fillColor = "#b898dd",

export function RectPreview({
  rectangles,
  canvasHeight = 150,
  className,
  fillColor = "#b2dd98",
  inStrokeColor = fillColor,
  inStrokeWidth = 1,
}: {
  rectangles: Rect[];
  canvasHeight?: number;
  className?: string;

  fillColor?: string;
  inStrokeColor?: string;
  inStrokeWidth?: number;
}) {
  const [scaledRects, setScaledRects] = useState<Rect[]>([]);

  useEffect(() => {
    if (rectangles.length === 0) return;

    // Compute bounding box of all rectangles
    const minX = Math.min(...rectangles.map(r => r.left));
    const maxX = Math.max(...rectangles.map(r => r.left + r.width));
    const minY = Math.min(...rectangles.map(r => r.top));
    const maxY = Math.max(...rectangles.map(r => r.top + r.height));
    // const originalWidth = maxX - minX;
    const originalHeight = maxY - minY;

    // Compute scale to fit fixed height while maintaining aspect ratio
    const scale = canvasHeight / originalHeight;
    // const width = originalWidth * scale;

    // Scale and translate rectangles
    const transformedRects = rectangles.map(r => ({
      left: (r.left - minX) * scale,
      top: (r.top - minY) * scale,
      width: r.width * scale,
      height: r.height * scale
    }));
    setScaledRects(transformedRects);
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
