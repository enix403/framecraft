import { createContext, useContext } from "react";

import { getInitialPlan } from "@/lib/demo/initialPlan";
import { StateSet } from "@/lib/utils";

export type PlanComponents = ReturnType<typeof getInitialPlan>;

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

/*
export function useUpdatePlan() {
  const { setPlan } = useContext(PlanContext)!;
  return useCallback(
    (fn: (old: PlanData) => void) => {
      setPlan(
        produce(draft => {
          if (!draft) return;
          fn(draft);
        })
      );
    },
    [setPlan]
  );
}
 */
