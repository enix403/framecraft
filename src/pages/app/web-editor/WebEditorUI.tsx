import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { TopNav, activeTabAtom } from "./panes/TopNav";
import { RoomList } from "./panes/RoomList";
import { PlotDetails } from "./panes/PlotDetails";
import { RoomDetails } from "./panes/RoomDetails";

import { World2DPane } from "./world2d/World2DPane";
import { memo, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { LayoutGraphEditor } from "@/components/layout-editor/LayoutGraphEditor";
import { useLocation, useParams } from "react-router";
import { LayoutNode } from "@/components/layout-editor/LayoutNode";
import { LayoutEdge } from "@/components/layout-editor/LayoutEdge";

import { World3DPane } from "./world3d/World3DPane";
import { serverIdToNodeType } from "@/lib/nodes";
import { usePlanInfo } from "./PlanProvider";
import { useInitState } from "@/hooks/useInitState";

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
        source: nodes[serverEdge[0]].id,
        target: nodes[serverEdge[1]].id,
      }) as LayoutEdge
  );

  return { nodes, edges };
}

function LayoutViewPane() {
  const serverLayout = usePlanInfo().layout;

  const { nodes: initNodes, edges: initEdges } = useMemo(
    () => buildFlowState(serverLayout),
    [serverLayout]
  );

  const [nodes, setNodes] = useInitState<LayoutNode[]>(initNodes);
  const [edges, setEdges] = useInitState<LayoutEdge[]>(initEdges);

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

export function WebEditorUI() {
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
        {/* Left Pane */}
        <ResizablePanel minSize={10} defaultSize={18} className='flex flex-col'>
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
  );
}
