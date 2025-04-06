import { saveAs } from "file-saver";
import { ExportStrategy } from "./ExportStrategy";
import { stageRef } from "../world2d/state/settings";
import { exportStageSVG } from "react-konva-to-svg";
import { jsPDF } from "jspdf";
import "svg2pdf.js";

// @ts-ignore
window.jsPDF = jsPDF;

export class PDFExportStrategy implements ExportStrategy {
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

    // @ts-ignore
    window.svgString = svgString;

    // const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    // saveAs(blob, (fileName?.trim() || "floor-plan") + ".svg");

    await downloadPDFfromSVG(svgString, (fileName?.trim() || "floor-plan") + ".svg");
  }
}

async function downloadPDFfromSVG(svgString: string, filename = "plan.pdf") {
  // Parse SVG string into an SVG element
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = doc.querySelector("svg");

  if (!svgElement) {
    throw new Error("Invalid SVG string.");
  }

  // Create jsPDF instance
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt", // points
    format: "a4"
  });

  // Get PDF width and height
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  await pdf.svg(svgElement, {
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight
  });

  // Use svg2pdf to render the SVG into the PDF
  // await svg2pdf(svgElement, pdf, {
  //   xOffset: 0,
  //   yOffset: 0,
  //   scale: 1,
  //   width: pageWidth,
  //   height: pageHeight
  // });

  // Save the PDF
  pdf.save(filename);
}
