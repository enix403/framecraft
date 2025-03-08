import clsx from "clsx";
import { appNodeTypes, NodeType } from "@/lib/nodes";
import { NodeSlab } from "@/components/NodeSlab";
import { atom, useSetAtom } from "jotai";
import dagre from "dagre";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const dndNodeTypeIdAtom = atom("");

const getNextNodePosition = (nodes, edges) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB" }); // Top to Bottom layout
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => g.setNode(node.id, { width: 150, height: 50 }));
  edges.forEach(edge => g.setEdge(edge.source, edge.target));

  dagre.layout(g);

  // Find a suitable position
  let maxY = Math.max(...nodes.map(n => n.position.y), 0);
  return { x: 100, y: maxY + 100 }; // Place new node below the lowest one
};

function Source({ nodeType }: { nodeType: NodeType }) {
  const setTypeId = useSetAtom(dndNodeTypeIdAtom);

  const { getNodes, getEdges, addNodes } = useReactFlow();

  const handleAddNode = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();

    const position = getNextNodePosition(nodes, edges);
    const newNode = {
      id: `ui-node-${nodes.length + 1}`,
      position,
      data: { label: `Node ${nodes.length + 1}` },
      type: "default",
    };

    addNodes(newNode);
  }, [getNodes, addNodes]);


  return (
    <NodeSlab
      title={nodeType.title}
      className={clsx("border-[#04ACB0] shadow-sm", "cursor-grab select-none")}
      onClick={handleAddNode}
      // draggable
      // onDragStart={event => {
      //   setTypeId(nodeType.id);
      //   event.dataTransfer.effectAllowed = "move";
      // }}
    />
  );
}

export function NodeDragSource() {
  return (
    <div className='flex h-full max-h-full w-[16rem] flex-col overflow-y-auto p-4'>
      <h2 className='mb-2 font-semibold'>Available Rooms</h2>

      <div className='-mx-4 -mb-4 flex-1-y space-y-2 px-4 pb-4'>
        {appNodeTypes.map(nodeType => {
          return <Source key={nodeType.id} nodeType={nodeType} />;
        })}
      </div>
    </div>
  );
}
