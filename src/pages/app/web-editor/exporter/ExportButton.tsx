import { Button } from "@/components/ui/button";
import DxfWriter from "dxf-writer";
import { saveAs } from "file-saver";
import { usePlanComponents } from "../plan-state";

export function exportPlanToDXF(components: any) {
  const dxf = new DxfWriter();
  dxf.setUnits("Meters");

  // Create layers (using addLayer(name, colorNumber, lineTypeName))
  // Color numbers: here we use blue (5) for walls, green (3) for doors, red (1) for rooms.
  dxf.addLayer("Walls", 5, "CONTINUOUS");
  dxf.addLayer("Doors", 3, "DASHED");
  dxf.addLayer("Rooms", 1, "CONTINUOUS");



  // --------------------
  // Export Walls
  // --------------------
  dxf.setActiveLayer("Walls");
  components.walls.forEach(wall => {
    if (wall.direction === "h") {
      // For horizontal walls, start at (col, row) and end at (col + length, row)
      dxf.drawLine(wall.col, wall.row, wall.col + wall.length, wall.row);
    } else if (wall.direction === "v") {
      // For vertical walls, start at (col, row) and end at (col, row + length)
      dxf.drawLine(wall.col, wall.row, wall.col, wall.row + wall.length);
    }
    // Note: You can later extend this to add XData if needed.
  });

  // --------------------
  // Export Doors
  // --------------------
  dxf.setActiveLayer("Doors");
  components.doors.forEach(door => {
    if (door.direction === "h") {
      dxf.drawLine(door.col, door.row, door.col + door.length, door.row);
    } else if (door.direction === "v") {
      dxf.drawLine(door.col, door.row, door.col, door.row + door.length);
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
    dxf.drawText(centerX, centerY, 0.2, 0, room.label, "center", "middle");
  });

  // Generate the DXF string and trigger download.
  const dxfString = dxf.toDxfString();
  const blob = new Blob([dxfString], { type: "application/dxf" });
  saveAs(blob, "floor-plan.dxf");
}

export function ExportButton() {
  const components = usePlanComponents();
  return (
    <Button
      onClick={() => {
        exportPlanToDXF(components);
      }}
      size='lg'
      className='mr-2'
    >
      Export
    </Button>
  );
}
