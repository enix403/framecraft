import { saveAs } from "file-saver";
import { ExportStrategy } from "./ExportStrategy";
import { stageRef } from "../world2d/state/settings";
import { exportStageSVG } from "react-konva-to-svg";

export class SVGExportStrategy implements ExportStrategy {
  async exportPlan(plan: any, fileName?: string) {
    let stage = stageRef.current!;

    const svgString = await exportStageSVG(stage, false, {
      onBefore: ([stage, layer]) => {
        // Perform actions before export
      },
      onAfter: ([stage, layer]) => {
        // Perform actions after export
      }
    });

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

    saveAs(blob, (fileName?.trim() || "floor-plan") + ".svg");
  }
}

