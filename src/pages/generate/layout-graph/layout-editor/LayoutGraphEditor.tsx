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
  useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";
import { FloatingEdge } from "./FloatingEdge";

import { LayoutNode } from "./LayoutNode";

/* =================================== */

const initialNodes: LayoutNode[] = [
  {
    id: "1",
    type: "layoutNode",
    position: { x: 0, y: 0 },
    data: { label: "Living Room 1", roomTypeLabel: "Living Room" }
  },
  {
    id: "2",
    type: "layoutNode",
    position: { x: 80, y: 180 },
    data: { label: "Living Room 2", roomTypeLabel: "Living Room" }
  },
  {
    id: "3",
    type: "layoutNode",
    position: { x: 180, y: -180 },
    data: { label: "Living Room 3", roomTypeLabel: "Living Room" }
  }
];

/* =================================== */

const nodeTypes = { layoutNode: LayoutNode };
const edgeTypes = { floatingEdge: FloatingEdge };

/* =================================== */

export function LayoutGraphEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className='h-full max-h-full w-full max-w-full'>
      <ReactFlow
        nodeTypes={nodeTypes}
        // @ts-ignore
        edgeTypes={edgeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
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
          type: "floatingEdge"
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
