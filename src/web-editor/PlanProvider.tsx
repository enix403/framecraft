import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext
} from "react";
import { PlanData } from "./plan/plan";
import { produce } from "immer";

interface IPlanContext {
  plan: PlanData | null;
  setPlan: Dispatch<SetStateAction<PlanData | null>>;
}

export const PlanContext = createContext<IPlanContext | null>(null);

export function usePlan() {
  return useContext(PlanContext)!.plan!;
}

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
