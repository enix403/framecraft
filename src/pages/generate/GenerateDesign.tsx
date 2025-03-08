import { GeneralSettings } from "./panes/GeneralSettings";
import { useCallback, useState } from "react";

import { NodeDragSource } from "./panes/NodeDragSource";
import { GraphPresets } from "./panes/GraphPresets";
import { LayoutGraphTitle } from "./panes/LayoutGraphTitle";
import { Toolbar } from "./panes/Toolbar";

import { LayoutNode } from "./layout-editor/LayoutNode";
import { LayoutEdge } from "./layout-editor/LayoutEdge";
import { LayoutGraphEditor } from "./layout-editor/LayoutGraphEditor";
import { StateSet } from "@/lib/utils";

function LayoutGraphPanes({
  nodes,
  setNodes,
  edges,
  setEdges
}: {
  nodes: LayoutNode[];
  setNodes: StateSet<LayoutNode[]>;
  edges: LayoutEdge[];
  setEdges: StateSet<LayoutEdge[]>;
}) {
  const [selectedNodeId, setSelectedNodeId] = useState("");

  const selectedNode = nodes.find(n => n.id === selectedNodeId) ?? null;

  const updateNodeData = useCallback(
    (nodeId: string, updates: Partial<LayoutNode["data"]>) => {
      setNodes(prev =>
        prev.map(node =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...updates
                }
              }
            : node
        )
      );
    },
    [setNodes]
  );

  return (
    <>
      <LayoutGraphTitle />
      <Toolbar node={selectedNode} updateNodeData={updateNodeData} />
      <div className='flex flex-1-fix'>
        <div className='flex-1-fix shrink-0'>
          <LayoutGraphEditor
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            onSelection={(node: LayoutNode | null) => {
              setSelectedNodeId(node?.id || "");
            }}
            // readOnly
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

export function GenerateDesign() {
  const [nodes, setNodes] = useState<LayoutNode[]>(initialNodes);
  const [edges, setEdges] = useState<LayoutEdge[]>(initialEdges);

  return (
    <div className='flex h-full max-h-full overflow-hidden'>
      <div className='w-sm border-r-2 p-4'>
        <GeneralSettings />
      </div>
      <div className='flex flex-1-fix flex-col'>
        <LayoutGraphPanes
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </div>
    </div>
  );
}

/* =================================== */

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
