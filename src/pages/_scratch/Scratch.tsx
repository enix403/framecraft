import "@xyflow/react/dist/style.css";

import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Handle,
  OnConnect,
  Position,
  ReactFlow,
  useConnection,
  useEdgesState,
  useNodesState,
  type Node,
  type NodeProps
} from "@xyflow/react";
import { Circle, Link, Link2, Package, Plus } from "lucide-react";
import clsx from "clsx";
import { useCallback } from "react";

const initialNodes: RoomNode[] = [
  {
    id: "1",
    type: "roomNode",
    position: { x: 0, y: 0 },
    data: { label: "Living Room 1", roomTypeLabel: "Living Room" }
  },
  {
    id: "2",
    type: "roomNode",
    position: { x: 80, y: 180 },
    data: { label: "Living Room 2", roomTypeLabel: "Living Room" }
  }
];

type RoomNode = Node<
  {
    label: string;
    roomTypeLabel: string;
  },
  "roomNode"
>;

function RoomNode({ id, data, selected }: NodeProps<RoomNode>) {
  const { label, roomTypeLabel } = data;

  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;

  return (
    <>
      <div
        className={clsx(
          "flex min-w-56 flex-row items-center gap-x-2.5 rounded-[8px] border bg-white p-2.5 pr-6",
          "transition-colors",
          "shadow-[0px_10px_36px_-6px_rgba(0,_0,_0,_0.1)]",
          "relative",
          selected && "border-[#04ACB0]"
        )}
      >
        <div className='rounded-[6px] bg-[#04ACB0] p-1.5 text-white'>
          <Package size={26} />
        </div>

        <div className='flex-1-fit space-y-1.5 font-graph-editor'>
          <p className='text-sm leading-[1] font-semibold text-[color:#1B1B2E]'>
            {label}
          </p>
          <p className='text-[size:0.7rem] leading-[1] font-medium text-[color:#7C7D87]'>
            {roomTypeLabel}
          </p>
        </div>
      </div>
      <button
        className={clsx(
          "nodrag nopan cursor-crosshair",
          "!h-auto !w-auto rounded-full !border-none !bg-[#79dcbd] !p-1",
          "absolute !top-[calc(50%-10px)] right-0 translate-x-1/2 -translate-y-1/2"
        )}
      >
        <Plus size={8} className='text-white' strokeWidth={3} />
      </button>

      <Handle
        type='source'
        position={Position.Right}
        className={clsx(
          "!h-auto !w-auto !border-none !bg-[#AF79DC] !p-1",
          "!top-[calc(50%+10px)]"
        )}
      >
        <Link2
          size={8}
          className='pointer-events-none text-white'
          strokeWidth={3}
        />
      </Handle>

      {(connection.inProgress && isTarget) && <Handle
        type='target'
        position={Position.Left}
        className='!top-0 !left-0 !h-full !w-full !transform-none !rounded-none opacity-50'
      />}
    </>
  );
}

const nodeTypes = {
  roomNode: RoomNode
};

function LayoutGraphEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);

  const onConnect: OnConnect = useCallback(
    connection =>
      setEdges(eds => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  return (
    <>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{
          maxZoom: 1
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
    </>
  );
}

export function Scratch() {
  return <LayoutGraphEditor />;
}

/*
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  NodeToolbar,
  OnConnect,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback } from "react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } }
];

const initialEdges = [] as any;

function GraphEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
      colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export function Scratch() {
  return <GraphEditor />;
}
*/
