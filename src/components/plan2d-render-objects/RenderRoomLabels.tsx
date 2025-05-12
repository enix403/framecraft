import { Text } from "react-konva";
import { useRenderObjectComponents } from "./RenderObjectsProvider";
import { CELL_SIZE } from "@/lib/units";
import { useSettings } from "@/pages/app/web-editor/world2d/state/settings";
import { useResolvedTheme } from "../theme-provider";

export function RenderRoomLabels() {
  const components = useRenderObjectComponents();
  const settings = useSettings();
  const wireframeMode = settings.viewMode === "wireframe";
  const isDark = useResolvedTheme() === "dark";

  return components.rooms.map((room, i) => {
    let largestRectIndex = -1;
    let largestArea = -1;

    for (let i = 0; i < room.rects.length; ++i) {
      const { width, height } = room.rects[i];
      let area = width * height;

      if (area > largestArea) {
        largestArea = area;
        largestRectIndex = i;
      }
    }

    let { row, col, width, height } = room.rects[largestRectIndex];

    const label = room.label;

    if (!label) return;

    return (
      <Text
        key={room.id}
        x={(col + width / 2) * CELL_SIZE}
        y={(row + height / 2) * CELL_SIZE}
        width={1000}
        height={1000}
        offsetX={500}
        offsetY={500}
        align='center'
        verticalAlign='middle'
        text={label}
        fontSize={13}
        // fill={"var(--color-primary)"}
        fill={wireframeMode && isDark ? "white" : "black"}
      />
    );
  });
}