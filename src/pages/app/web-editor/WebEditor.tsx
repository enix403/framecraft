import { useParams } from "react-router";
import { skipToken, useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/lib/api-routes";
import { memo, useMemo, useState } from "react";
import { IPlanContext, PlanContext, PlanInfo } from "./PlanProvider";
import { makeInitialPlan } from "@/lib/demo/initialPlan";
import { useInitState } from "@/hooks/useInitState";
import { WebEditorUI } from "./WebEditorUI";

function buildInitPlan(serverPlan) {
  const planInfo: PlanInfo = {
    id: serverPlan.id,
    name: serverPlan.name,
    plotWidth: serverPlan.plotWidth,
    plotLength: serverPlan.plotLength,
    plotMeasureUnit: serverPlan.plotMeasureUnit,
    canvasId: serverPlan.canvas.id,
    layout: serverPlan.layout
  };

  const planComponents = makeInitialPlan(serverPlan.canvas.canvasData);

  return {
    planInfo,
    planComponents
  };
}

const WebEditorImpl = memo(({ plan: serverPlan }: { plan: any }) => {
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
    <PlanContext.Provider value={context}>
      <WebEditorUI />
    </PlanContext.Provider>
  );
});

export function WebEditor() {
  const { planId } = useParams();

  const { data: plan, isError } = useQuery({
    queryKey: ["plan", planId],
    queryFn: () => (planId ? apiRoutes.getPlan(planId) : skipToken),
    staleTime: Infinity
  });

  if (!isError && plan) return <WebEditorImpl plan={plan} />;

  return "Loading...";
}
