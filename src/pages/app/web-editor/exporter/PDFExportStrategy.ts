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

    await downloadPDFfromSVG(
      svgString,
      (fileName?.trim() || "floor-plan") + ".svg"
    );
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

  // Retrieve the original SVG dimensions.
  // Prefer the viewBox if available; otherwise, fall back to width/height attributes.
  const viewBox = svgElement.viewBox.baseVal;
  let originalWidth =
    viewBox && viewBox.width
      ? viewBox.width
      : parseFloat(svgElement.getAttribute("width") || "0");
  let originalHeight =
    viewBox && viewBox.height
      ? viewBox.height
      : parseFloat(svgElement.getAttribute("height") || "0");

  if (!originalWidth || !originalHeight) {
    throw new Error(
      "SVG must have a viewBox or width/height attributes defined."
    );
  }

  // Create jsPDF instance
  const pdf = new jsPDF({
    orientation: originalWidth > originalHeight ? "landscape" : "portrait",
    unit: "pt",
    format: "a4"
  });

  // Get PDF width and height
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Calculate a scale factor that fits the entire SVG onto the PDF page,
  // leaving a little padding (5% margin).
  const scaleFactor =
    Math.min(pageWidth / originalWidth, pageHeight / originalHeight) * 0.95;
  const newWidth = originalWidth * scaleFactor;
  const newHeight = originalHeight * scaleFactor;

  // Center the SVG on the PDF page.
  const offsetX = (pageWidth - newWidth) / 2;
  const offsetY = (pageHeight - newHeight) / 2;

  await pdf.svg(svgElement, {
    x: offsetX,
    y: offsetY,
    width: newWidth,
    height: newHeight
  });

  pdf.save(filename);
}
