import DxfWriter from "dxf-writer";

import { saveAs } from "file-saver";
import { ExportStrategy } from "./ExportStrategy";

export class DXFExportStrategy implements ExportStrategy {
  async exportPlan(plan: any, fileName?: string) {
    const components = plan.canvas.canvasData;

    const dxf = new DxfWriter();
    dxf.setUnits("Meters");

    // Create layers (using addLayer(name, colorNumber, lineTypeName))
    // Color numbers: here we use blue (5), green (3) and red (1).
    dxf.addLayer("Walls", 5, "continuous");
    dxf.addLayer("Doors", 1, "dashed");
    dxf.addLayer("Rooms", 3, "continuous");

    // ---- Step 1: Compute plan bounds for flipping ----
    let minY = Infinity;
    let maxY = -Infinity;

    components.rooms.forEach(room => {
      room.rects.forEach(rect => {
        minY = Math.min(minY, rect.row);
        maxY = Math.max(maxY, rect.row + rect.height);
      });
    });
    const planHeight = maxY - minY;

    const flipY = (y: number) => minY + (planHeight - (y - minY));

    // --------------------
    // Export Walls
    // --------------------
    dxf.setActiveLayer("Walls");
    components.walls.forEach(wall => {
      if (wall.direction === "h") {
        const y = flipY(wall.row);
        dxf.drawLine(wall.col, y, wall.col + wall.length, y);
      } else {
        dxf.drawLine(
          wall.col,
          flipY(wall.row),
          wall.col,
          flipY(wall.row + wall.length)
        );
      }
    });

    // --------------------
    // Export Doors
    // --------------------
    dxf.setActiveLayer("Doors");
    components.doors.forEach(door => {
      if (door.direction === "h") {
        const y = flipY(door.row);
        dxf.drawLine(door.col, y, door.col + door.length, y);
      } else {
        dxf.drawLine(
          door.col,
          flipY(door.row),
          door.col,
          flipY(door.row + door.length)
        );
      }
    });

    // --------------------
    // Export Room Labels
    // --------------------
    dxf.setActiveLayer("Rooms");
    components.rooms.forEach(room => {
      // Compute the bounding box of all rects in the room.
      let minRow = Infinity,
        minCol = Infinity;
      let maxRow = -Infinity,
        maxCol = -Infinity;
      room.rects.forEach(rect => {
        minRow = Math.min(minRow, rect.row);
        minCol = Math.min(minCol, rect.col);
        maxRow = Math.max(maxRow, rect.row + rect.height);
        maxCol = Math.max(maxCol, rect.col + rect.width);
      });
      const centerX = (minCol + maxCol) / 2;
      const centerY = (minRow + maxRow) / 2;
      // Draw text: using drawText(x, y, height, rotation, value, horizontalAlignment, verticalAlignment)
      // Here we use text height 0.2, no rotation, and center alignment.
      dxf.drawText(
        centerX,
        flipY(centerY),
        1,
        0,
        room.label,
        "center",
        "middle"
      );
    });

    const dxfString = dxf.toDxfString();
    const blob = new Blob([dxfString], { type: "application/dxf" });

    saveAs(blob, (fileName?.trim() || "floor-plan") + ".dxf");
  }
}
