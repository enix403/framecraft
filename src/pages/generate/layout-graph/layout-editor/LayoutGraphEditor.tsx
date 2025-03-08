import "@xyflow/react/dist/style.css";

import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import { useCallback } from "react";
import { useAtomValue } from "jotai";

import { idToNodeType } from "@/lib/nodes";

import { LayoutEdge } from "./LayoutEdge";
import { LayoutNode } from "./LayoutNode";
import { dndNodeTypeIdAtom } from "../NodeDragSource";

/* =================================== */

const nodeTypes = { custom: LayoutNode };
const edgeTypes = { custom: LayoutEdge };

/* =================================== */

let id = 0;
const getId = () => `dndnode_${id++}`;

export function LayoutGraphEditor({
  nodesState,
  edgesState,
  onSelection
}: {
  nodesState: ReturnType<typeof useNodesState<LayoutNode>>;
  edgesState: ReturnType<typeof useEdgesState<LayoutEdge>>;
  onSelection: (node: LayoutNode | null) => void;
}) {
  const [nodes, setNodes, onNodesChange] = nodesState;
  const [edges, setEdges, onEdgesChange] = edgesState;
  const { screenToFlowPosition } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const typeId = useAtomValue(dndNodeTypeIdAtom);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();

      const nodeType = idToNodeType[typeId] || null;

      if (!nodeType) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: {
          label: nodeType.title,
          typeId: nodeType.id
        }
      } as LayoutNode;

      setNodes(nds => nds.concat(newNode));
    },
    [screenToFlowPosition, typeId]
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
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        fitViewOptions={{ maxZoom: 1 }}
        defaultEdgeOptions={{
          animated: true,
          type: "custom"
        }}
        proOptions={{ hideAttribution: true }}
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
