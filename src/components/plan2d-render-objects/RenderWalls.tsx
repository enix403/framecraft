import { Rect } from "react-konva";

import { calcLineRect } from "./common";
import { useRenderObjectComponents } from "./RenderObjectsProvider";
import { useResolvedTheme } from "../theme-provider";
import { wallStyles } from "@/lib/node-styles";

export function RenderWalls({
  // fill = "#000000",
  // stroke = "#000000"
  wireframeMode = false
}: {
  // fill?: string;
  // stroke?: string;
  wireframeMode?: boolean;
}) {
  const components = useRenderObjectComponents();
  const isDark = useResolvedTheme() === "dark";
  const wallStyle = isDark ? wallStyles.dark : wallStyles.light;

  const fill = wireframeMode ? wallStyle.wireframeColor : wallStyle.normalColor;
  const stroke = wallStyle.normalColor;

  return components.walls.map(
    ({ id, row, col, length, direction, width: thickness }) => {
      const { x, y, width, height } = calcLineRect(
        row,
        col,
        length,
        direction,
        thickness
      );

      return (
        <Rect
          key={id}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.5}
        />
      );
    }
  );
}
