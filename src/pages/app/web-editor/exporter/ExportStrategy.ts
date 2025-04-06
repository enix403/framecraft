export interface ExportStrategy {
  exportPlan(plan: any, fileName?: string): Promise<void>;
}
