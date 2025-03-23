import { createContext, useContext } from "react";
import { StateSet } from "@/lib/utils";
import type { buildComponents } from './build-plan';

export type PlanComponents = ReturnType<typeof buildComponents>;

export interface PlanLayoutData {
  nodes: {
    label: string;
    typeId: number;
    position: { x: number; y: number };
  }[];
  edges: [number, number][];
}

export interface PlanInfo {
  id: string;
  name: string;
  plotWidth: number;
  plotLength: number;
  plotMeasureUnit: string;
  canvasId: string;
  layout: PlanLayoutData;
}

export interface IPlanContext {
  planInfo: PlanInfo;
  planComponents: PlanComponents;

  // setPlanInfo: StateSet<PlanInfo>;
  setPlanComponents: StateSet<PlanComponents>;
}

export const PlanContext = createContext<IPlanContext | null>(null);

function usePlan() {
  return useContext(PlanContext)!;
}

export function usePlanInfo() {
  return usePlan().planInfo;
}

export function usePlanComponents() {
  return usePlan().planComponents;
}

export function useSetPlanComponents() {
  return usePlan().setPlanComponents;
}
