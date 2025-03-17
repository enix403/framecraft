import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { getInitialPlan } from "@/lib/demo/initialPlan";
import { PlanContext } from "./PlanProvider";

import { TopNav, activeTabAtom } from "./panes/TopNav";
import { RoomList } from "./panes/RoomList";
import { PlotDetails } from "./panes/PlotDetails";
import { RoomDetails } from "./panes/RoomDetails";

import { World2DPane } from "./world2d/World2DPane";
import { useState } from "react";
import { PlanData } from "@/lib/plan";
import { useAtomValue } from "jotai";
import { LayoutGraphEditor } from "@/components/layout-editor/LayoutGraphEditor";
import { useLocation } from "react-router";
import { LayoutNode } from "@/components/layout-editor/LayoutNode";
import { LayoutEdge } from "@/components/layout-editor/LayoutEdge";

import { World3DPane } from "./world3d/World3DPane";

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
    return <World3DPane />
  }

  return null;
}

export function WebEditor() {
  const [plan, setPlan] = useState<PlanData | null>(getInitialPlan);

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
}
