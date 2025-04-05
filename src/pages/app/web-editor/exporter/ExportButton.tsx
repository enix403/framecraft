import { Button } from "@/components/ui/button";
import DxfWriter from "dxf-writer";
import { saveAs } from "file-saver";

export function exportPlanToDXF(plan: any) {
  const dxf = new DxfWriter();

  // Set units to meters (or whatever is appropriate)
  dxf.setUnits("Meters");

  // Add layers with the correct signature: addLayer(name, colorNumber, lineTypeName)
  // Color numbers: e.g., 5 (blue), 3 (green), 1 (red) – adjust as needed.
  dxf.addLayer("Walls", 5, "CONTINUOUS");
  dxf.addLayer("Doors", 3, "DASHED");
  dxf.addLayer("Rooms", 1, "CONTINUOUS");

  // Export Walls
  dxf.setActiveLayer("Walls");
  plan.walls.forEach(wall => {
    // Draw a line for each wall using drawLine(x1, y1, x2, y2)
    dxf.drawLine(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
    // For semantic purposes, the wall's metadata is implicitly attached by its layer and its ID can be recorded
    // via naming conventions or later extension if needed.
  });

  // Export Doors
  dxf.setActiveLayer("Doors");
  plan.doors.forEach(door => {
    dxf.drawLine(door.start.x, door.start.y, door.end.x, door.end.y);
  });

  // Export Rooms as text labels.
  dxf.setActiveLayer("Rooms");
  plan.rooms.forEach(room => {
    // drawText(x1, y1, height, rotation, value, horizontalAlignment?, verticalAlignment?)
    // Here, we assume a text height of 0.2, no rotation, centered horizontally and vertically.
    dxf.drawText(
      room.center.x,
      room.center.y,
      0.2,
      0,
      room.label,
      "center",
      "middle"
    );
  });

  // Generate the DXF string and create a downloadable Blob.
  const blob = new Blob([dxf.toDxfString()], { type: "application/dxf" });
  saveAs(blob, "floor-plan.dxf");
}

export function ExportButton() {
  return (
    <Button size='lg' className='mr-2'>
      Export
    </Button>
  );
}
