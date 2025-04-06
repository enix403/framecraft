import { delay } from "@/lib/utils";
import { ExportStrategy } from "./ExportStrategy";

export class DXFExportStrategy implements ExportStrategy {
  async exportPlan(plan: any, fileName?: string) {
    return delay(4500);
  }
}