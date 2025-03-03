import { createContext, useContext } from "react";
import { PlanData } from "./plan/plan";

export const PlanContext = createContext<PlanData | null>(null);

export function usePlan() {
  return useContext(PlanContext)!;
}