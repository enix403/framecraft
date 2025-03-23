import { LayoutEdge } from "@/components/layout-editor/LayoutEdge";
import { LayoutNode } from "@/components/layout-editor/LayoutNode";
import { idToNodeType } from "@/lib/nodes";

export async function generateDesignFromServer(
  nodes: LayoutNode[],
  edges: LayoutEdge[]
) {

  let nodeIdToIndex = {};
  let index = 0;
  for (const node of nodes) {
    nodeIdToIndex[node.id] = index++;
  }

  let serverNodes = nodes.map(node => ({
    label: node.data.label,
    typeId: idToNodeType[node.data.typeId].serverId,
    position: node.position
  }));

  let serverEdges = edges.map(edge => [
    nodeIdToIndex[edge.source],
    nodeIdToIndex[edge.target]
  ]);

  let generationSettings = {
    name: "My Plan 16",
    plotWidth: 100,
    plotLength: 116,
    plotMeasureUnit: "ft",
    layout: {
      nodes: serverNodes,
      edges: serverEdges
    }
  };

  console.log(generationSettings);
}
