import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomIdentityInput } from "@/components/RoomIdentityInput";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Info, Redo, Undo } from "lucide-react";
import { useState } from "react";
import { LayoutGraphEditor } from "./layout-editor/LayoutGraphEditor";
import { NodeDragSource } from "./NodeDragSource";
import { GraphPresets } from "./GraphPresets";
import {
  ReactFlowProvider,
  useEdgesState,
  useNodesData,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import { LayoutNode } from "./layout-editor/LayoutNode";
import { LayoutEdge } from "./layout-editor/LayoutEdge";
import { useSelectedObject } from "@/pages/web-editor/world2d/state/selections";

export function LayoutGraphTitle() {
  return (
    <nav className='flex items-center justify-between border-b px-4 py-2'>
      <p className='text-xl font-bold tracking-tight'>Plan Layout Graph</p>
      <Button
        variant='ghost'
        className='flex items-center gap-x-2 text-blue-600'
      >
        <WandSparkles size={20} />
        Use Auto Layout
      </Button>
    </nav>
  );
}

// TODO: Simplify. Too many unnecessary flex divs
export function Toolbar({ selectedNodeId }: { selectedNodeId: string }) {
  const node = useNodesData<LayoutNode>(selectedNodeId);
  // const { updateNodeData } = useReactFlow<LayoutNode>();

  return (
    <nav className='flex gap-x-2 border-b px-4 py-2'>
      <div className='flex flex-1 items-center'>
        {node ? (
          <RoomIdentityInput
            key={node.id}
            initialName={"Living Room 1"}
            initialTypeId='living'
            onUpdateName={name => {}}
            onUpdateNodeType={type => {}}
            className='max-w-lg flex-1'
          />
        ) : (
          <p className='flex flex-1-x items-center gap-x-2 text-muted-foreground/70'>
            <Info className='shrink-0' />
            <span className='font-medium tracking-tight'>
              Select a node in the editor to inspect
            </span>
          </p>
        )}
      </div>
      <div className='flex items-center justify-end'>
        <TooltipWrapper tip='Undo'>
          <Button size='icon' variant='ghost'>
            <Undo size={20} />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper tip='Redo'>
          <Button size='icon' variant='ghost'>
            <Redo size={20} />
          </Button>
        </TooltipWrapper>
      </div>
    </nav>
  );
}

function LayoutGraphPaneInner() {
  const nodesState = useNodesState(initialNodes);
  const edgesState = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState("");

  return (
    <>
      <LayoutGraphTitle />
      <Toolbar selectedNodeId={selectedNodeId} />
      <div className='flex flex-1-fix'>
        <div className='flex-1-fix shrink-0'>
          <LayoutGraphEditor
            nodesState={nodesState}
            edgesState={edgesState}
            onSelection={(node: LayoutNode | null) => {
              setSelectedNodeId(node?.id || "");
            }}
          />
        </div>
        <div className='max-h-full max-w-sm border-l-2'>
          <NodeDragSource />
        </div>
      </div>
      <div className='shrink-0 border-t-2'>
        <GraphPresets />
      </div>
    </>
  );
}

export function LayoutGraphPane() {
  return (
    <ReactFlowProvider>
      <LayoutGraphPaneInner />
    </ReactFlowProvider>
  );
}

/* =================================== */

const initialNodes: LayoutNode[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Living Room 1", roomTypeLabel: "Living Room" }
  },
  {
    id: "2",
    type: "custom",
    position: { x: 80, y: 180 },
    data: { label: "Living Room 2", roomTypeLabel: "Living Room" }
  },
  {
    id: "3",
    type: "custom",
    position: { x: 180, y: -180 },
    data: { label: "Living Room 3", roomTypeLabel: "Living Room" }
  }
];

const initialEdges: LayoutEdge[] = [];
