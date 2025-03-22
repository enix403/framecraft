import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { makeInitialPlan } from "@/lib/demo/initialPlan";
import { PlanContext, usePlan } from "./PlanProvider";

import { TopNav, activeTabAtom } from "./panes/TopNav";
import { RoomList } from "./panes/RoomList";
import { PlotDetails } from "./panes/PlotDetails";
import { RoomDetails } from "./panes/RoomDetails";

import { World2DPane } from "./world2d/World2DPane";
import { memo, useEffect, useMemo, useState } from "react";
import { PlanData } from "@/lib/plan";
import { useAtomValue } from "jotai";
import { LayoutGraphEditor } from "@/components/layout-editor/LayoutGraphEditor";
import { useLocation, useParams } from "react-router";
import { LayoutNode } from "@/components/layout-editor/LayoutNode";
import { LayoutEdge } from "@/components/layout-editor/LayoutEdge";

import { World3DPane } from "./world3d/World3DPane";
import { skipToken, useQueries, useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/lib/api-routes";
import { serverIdToNodeType } from "@/lib/nodes";

/*

const initialNodes: LayoutNode[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Front Door Entrance", typeId: "fdoor" }
  },
  {
    id: "2",
    type: "custom",
    position: { x: 220, y: -180 },
    data: { label: "Main Living Room", typeId: "living" }
  }
];

const initialEdges: LayoutEdge[] = [
  {
    id: "e1",
    source: "1",
    target: "2"
  }
];


*/

function buildFlowState(serverLayout) {
  const nodes = serverLayout.nodes.map(
    (serverNode, index) =>
      ({
        id: `n-${index}`,
        type: "custom",
        position: serverNode.position,
        data: {
          label: serverNode.label,
          typeId: serverIdToNodeType[serverNode.typeId].id
        }
      }) as LayoutNode
  );

  const edges = serverLayout.edges.map(
    (serverEdge, index) =>
      ({
        id: `e-${index}`,
        source: `n-${serverEdge.source}`,
        target: `n-${serverEdge.target}`
      }) as LayoutEdge
  );

  return { nodes, edges };
}

function LayoutViewPane() {
  const { state } = useLocation();

  let initialNodes: any[] = [];
  let initialEdges: any[] = [];

  if (state && state.layoutData) {
    initialNodes = state.layoutData.nodes;
    initialEdges = state.layoutData.edges;
  }

  const [nodes, setNodes] = useState<LayoutNode[]>(initialNodes);
  const [edges, setEdges] = useState<LayoutEdge[]>(initialEdges);

  return (
    <LayoutGraphEditor
      nodes={nodes}
      setNodes={setNodes}
      edges={edges}
      setEdges={setEdges}
      readOnly
    />
  );
}

function CentralPane() {
  const activeTab = useAtomValue(activeTabAtom);

  if (activeTab === "layout") {
    return <LayoutViewPane />;
  } else if (activeTab === "2d") {
    return <World2DPane />;
  } else if (activeTab === "3d") {
    return <World3DPane />;
  }

  return null;
}

const WebEditorImpl = memo(({ initPlan }: { initPlan: any }) => {
  const [plan, setPlan] = useState<PlanData | null>(initPlan);

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      <div className='flex h-full max-h-full flex-col overflow-hidden'>
        <TopNav />
        <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
          {/* Left Pane */}
          <ResizablePanel
            minSize={10}
            defaultSize={18}
            className='flex flex-col'
          >
            <RoomList />
            <PlotDetails />
          </ResizablePanel>
          <ResizableHandle />
          {/* Center Pane */}
          <ResizablePanel minSize={40} className='flex flex-1-fix flex-col'>
            <CentralPane />
          </ResizablePanel>
          <ResizableHandle />
          {/* Right Pane */}
          <ResizablePanel minSize={10} defaultSize={15}>
            <RoomDetails />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </PlanContext.Provider>
  );
});

export function WebEditor() {
  const { planId } = useParams();

  const { data: serverPlan, isError } = useQuery({
    queryKey: ["plan", planId],
    queryFn: () => (planId ? apiRoutes.getPlan(planId) : skipToken),
    staleTime: Infinity
  });

  const plan = useMemo(
    () => (serverPlan ? makeInitialPlan(serverPlan.canvas.canvasData) : null),
    [serverPlan]
  );

  if (!isError && plan) return <WebEditorImpl initPlan={plan} />;

  return "Loading...";
}
