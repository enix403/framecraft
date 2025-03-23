import { useParams } from "react-router";
import { skipToken, useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/lib/api-routes";
import { memo, PropsWithChildren, useMemo, useState } from "react";
import { IPlanContext, PlanContext, PlanInfo } from "./PlanProvider";
import { useInitState } from "@/hooks/useInitState";
import { WebEditorUI } from "./WebEditorUI";
import { buildInitPlan } from "./build-plan";

const WebEditorProvider = memo(
  ({ plan: serverPlan, children }: { plan: any } & PropsWithChildren) => {
    console.log(serverPlan);
    const initPlan = useMemo(() => buildInitPlan(serverPlan), [serverPlan]);

    const [planInfo, setPlanInfo] = useInitState(initPlan.planInfo);
    const [planComponents, setPlanComponents] = useInitState(
      initPlan.planComponents
    );

    const context = useMemo(
      () =>
        ({
          planInfo,
          planComponents,
          setPlanComponents
        }) as IPlanContext,
      [initPlan]
    );

    return (
      <PlanContext.Provider value={context}>{children}</PlanContext.Provider>
    );
  }
);

export function WebEditor() {
  const { planId } = useParams();

  const { data: plan, isError } = useQuery({
    queryKey: ["plan", planId],
    queryFn: () => (planId ? apiRoutes.getPlan(planId) : skipToken),
    staleTime: Infinity
  });

  if (!isError && plan)
    return (
      <WebEditorProvider plan={plan}>
        <WebEditorUI />
      </WebEditorProvider>
    );

  return "Loading...";
}
