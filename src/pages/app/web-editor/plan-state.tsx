import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useLayoutEffect, useMemo } from "react";

const planAtom = atom<any>(null);

export function useRegisterPlan(initialPlan) {
  const [plan, setPlan] = useAtom(planAtom);

  useLayoutEffect(() => {
    setPlan(initialPlan);
    return () => {
      setPlan(null);
    };
  }, []);

  const isReady = Boolean(plan);
  return isReady;
}

export function usePlan() {
  return useAtomValue(planAtom);
}

export function useSetPlan() {
  return useSetAtom(planAtom);
}

export function usePlanComponents() {
  const plan = usePlan();
  return useMemo(() => plan.canvas.canvasData, [plan.canvas.canvasData]);
}

/* ========== Selections ========== */

export type SelectedObject =
  /* add other types */
  { type: "room"; index: number };

const selectedObjectAtom = atom<SelectedObject | null>(null);

export function useSelectedObject() {
  return useAtom(selectedObjectAtom);
}
