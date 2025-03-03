import { createContext, useContext } from "react";

export const PlanContext = createContext<any>(null);

export function usePlan() {
  return useContext(PlanContext);
}