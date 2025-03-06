import "@xyflow/react/dist/style.css";

import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  useNodesState,
  type Node,
  type NodeProps
} from "@xyflow/react";
import { Circle, Link, Link2, Package, Plus } from "lucide-react";
import clsx from "clsx";

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

function RoomNode({ data, selected }: NodeProps<RoomNode>) {
  const { label, roomTypeLabel } = data;

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
      <Handle
        type='source'
        position={Position.Right}
        className={clsx(
          "!h-auto !w-auto !border-none !bg-[#79dcbd] !p-1",
          "!top-[calc(50%-10px)]"
        )}
      >
        <Plus
          size={8}
          className='pointer-events-none text-white'
          strokeWidth={3}
        />
      </Handle>

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
    </>
  );
}

const nodeTypes = {
  roomNode: RoomNode
};

function LayoutGraphEditor() {
  let [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // nodes = initialNodes;

  return (
    <>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        // nodesDraggable={false}
        onNodesChange={onNodesChange}
        edges={[]}
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
