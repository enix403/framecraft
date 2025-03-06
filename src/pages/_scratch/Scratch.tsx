import "@xyflow/react/dist/style.css";

import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  useNodesState,
  type Node
} from "@xyflow/react";
import { Package } from "lucide-react";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "myCustomNode",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" }
  },
  {
    id: "2",
    position: { x: 80, y: 180 },
    data: { label: "Node 2" }
  }
];

function MyCustomNode(props) {
  console.log(props);

  const { data } = props;

  return (
    <>
      <div className='flex min-w-56 flex-row items-center gap-x-2.5 rounded-[8px] border bg-white p-2.5'>
        <div className='rounded-[6px] bg-[#04ACB0] p-1.5 text-white'>
          <Package size={26} />
        </div>

        <div className='flex-1-fit space-y-1'>
          <p className='text-sm leading-[1] text-[color:#1B1B2E]'>
            master-build
          </p>
          <p className='text-[size:0.7rem] leading-[1] text-[color:#7C7D87]'>
            Dependency
          </p>
        </div>
      </div>
    </>
  );
}

const nodeTypes = {
  myCustomNode: MyCustomNode
};

function LayoutGraphEditor() {
  let [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  nodes = initialNodes;

  return (
    <>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        nodesDraggable={false}
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
