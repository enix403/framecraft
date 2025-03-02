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
  hintWidth = 180,
  hintHeight = 150,
  fillColor = "#b2dd98",
  inStrokeColor = fillColor,
  inStrokeWidth = 1,
  className
}: {
  rectangles: Rect[];
  hintWidth?: number;
  hintHeight?: number;
  fillColor?: string;
  inStrokeColor?: string;
  inStrokeWidth?: number;
  className?: string;
}) {
  const [scaledRects, setScaledRects] = useState<Rect[]>([]);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);

  useEffect(() => {
    if (rectangles.length === 0) return;

    // Compute bounding box of all rectangles
    const minX = Math.min(...rectangles.map(r => r.left));
    const maxX = Math.max(...rectangles.map(r => r.left + r.width));
    const minY = Math.min(...rectangles.map(r => r.top));
    const maxY = Math.max(...rectangles.map(r => r.top + r.height));

    const originalWidth = maxX - minX;
    const originalHeight = maxY - minY;

    const aspectRatio = originalWidth / originalHeight;

    let scale = 1;

    if (aspectRatio < 1) {
      // more taller than wide
      // fit height
      scale = hintHeight / originalHeight;
    } else {
      // more wider than tall
      // fit width
      scale = hintWidth / originalWidth;
    }

    setCanvasWidth(originalWidth * scale);
    setCanvasHeight(originalHeight * scale);

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
      <Stage className='mx-auto' width={canvasWidth} height={canvasHeight}>
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
