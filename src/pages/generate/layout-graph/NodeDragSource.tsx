import clsx from "clsx";
import { appNodeTypes, NodeType } from "@/lib/nodes";
import { NodeSlab } from "@/components/NodeSlab";
import { atom, useSetAtom } from "jotai";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import dagre from "dagre";

/* ======================== */

// Default size for nodes if not explicitly set
const DEFAULT_NODE_SIZE = { width: 150, height: 50 };

// Helper function to check for overlap between candidate node and existing nodes
function isCollision(candidate, newNodeSize, nodes) {
  const candidateBox = {
    left: candidate.x,
    right: candidate.x + newNodeSize.width,
    top: candidate.y,
    bottom: candidate.y + newNodeSize.height
  };

  for (const node of nodes) {
    const nodeSize = {
      width: node.width || DEFAULT_NODE_SIZE.width,
      height: node.height || DEFAULT_NODE_SIZE.height
    };
    const nodeBox = {
      left: node.position.x,
      right: node.position.x + nodeSize.width,
      top: node.position.y,
      bottom: node.position.y + nodeSize.height
    };

    // Check if the candidate overlaps with this node
    if (
      !(
        candidateBox.right < nodeBox.left ||
        candidateBox.left > nodeBox.right ||
        candidateBox.bottom < nodeBox.top ||
        candidateBox.top > nodeBox.bottom
      )
    ) {
      return true;
    }
  }
  return false;
}

// Function to find the next free position near the reference node using a spiral search
function getNextNodePosition(
  nodes,
  referenceNodeId,
  newNodeSize = DEFAULT_NODE_SIZE
) {
  const referenceNode = nodes.find(n => n.id === referenceNodeId);
  if (!referenceNode) return { x: 100, y: 100 }; // Fallback if reference node not found

  // Compute the center of the reference node
  const refWidth = referenceNode.width || DEFAULT_NODE_SIZE.width;
  const refHeight = referenceNode.height || DEFAULT_NODE_SIZE.height;
  const refCenter = {
    x: referenceNode.position.x + refWidth / 2,
    y: referenceNode.position.y + refHeight / 2
  };

  // Parameters for the spiral search
  const radiusStep = 20;
  const maxRadius = 500;
  const angleStep = 15; // degrees
  const toRadians = angle => angle * (Math.PI / 180);

  // Spiral outwards from the reference center to search for an available spot.
  for (let radius = radiusStep; radius <= maxRadius; radius += radiusStep) {
    for (let angle = 0; angle < 360; angle += angleStep) {
      // Compute offset from the center using polar coordinates
      const offsetX = radius * Math.cos(toRadians(angle));
      const offsetY = radius * Math.sin(toRadians(angle));

      // Candidate top-left position such that the new node is centered at the candidate point
      const candidate = {
        x: refCenter.x + offsetX - newNodeSize.width / 2,
        y: refCenter.y + offsetY - newNodeSize.height / 2
      };

      // If the candidate does not collide with any existing node, return it
      if (!isCollision(candidate, newNodeSize, nodes)) {
        return candidate;
      }
    }
  }

  // Fallback: if no free space was found, place the new node to the right of the reference node.
  return {
    x: referenceNode.position.x + refWidth + 20,
    y: referenceNode.position.y
  };
}

/* ========================== */

function Source({ nodeType }: { nodeType: NodeType }) {
  const { getNodes, addNodes } = useReactFlow();

  const handleAddNode = useCallback(
    referenceNodeId => {
      const nodes = getNodes();
      const position = getNextNodePosition(nodes, referenceNodeId);

      const newNode = {
        id: `node-${nodes.length + 1}`,
        position,
        data: { label: `Node ${nodes.length + 1}` },
        type: "default"
      };

      addNodes(newNode);
    },
    [getNodes, addNodes]
  );

  const setTypeId = useSetAtom(dndNodeTypeIdAtom);

  return (
    <NodeSlab
      title={nodeType.title}
      className={clsx("border-[#04ACB0] shadow-sm", "cursor-grab select-none")}
      onClick={() => handleAddNode("1")}
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

export const dndNodeTypeIdAtom = atom("");
