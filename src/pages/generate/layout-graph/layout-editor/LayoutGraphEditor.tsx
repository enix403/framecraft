import "@xyflow/react/dist/style.css";

import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import { useCallback } from "react";
import { LayoutEdge } from "./LayoutEdge";

import { LayoutNode } from "./LayoutNode";

/* =================================== */

const nodeTypes = { custom: LayoutNode };
const edgeTypes = { custom: LayoutEdge };

/* =================================== */

export function LayoutGraphEditor({
  nodesState,
  edgesState,
  onSelection
}: {
  nodesState: ReturnType<typeof useNodesState<LayoutNode>>;
  edgesState: ReturnType<typeof useEdgesState<LayoutEdge>>;
  onSelection: (node: LayoutNode | null) => void;
}) {
  const [nodes, _setNodes, onNodesChange] = nodesState;
  const [edges, setEdges, onEdgesChange] = edgesState;

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className='h-full max-h-full w-full max-w-full'>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeClick={(e, node) => onSelection(node)}
        onNodeDragStart={(e, node) => onSelection(node)}
        onPaneClick={() => onSelection(null)}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgesFocusable={false}
        fitView
        fitViewOptions={{
          maxZoom: 1
        }}
        defaultEdgeOptions={{
          animated: true,
          type: "custom"
        }}
        proOptions={{
          hideAttribution: true
        }}
      >
        <Background
          bgColor='#FAFAFA'
          color='#CACACA'
          variant={BackgroundVariant.Dots}
          gap={10}
          size={1.5}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
