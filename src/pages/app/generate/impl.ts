import { LayoutEdge } from "@/components/layout-editor/LayoutEdge";
import { LayoutNode } from "@/components/layout-editor/LayoutNode";
import { idToNodeType } from "@/lib/nodes";

/*
name: Joi.string(),
plotWidth: Joi.number(),
plotLength: Joi.number(),
plotMeasureUnit: Joi.string(),
layout: Joi.object({
  nodes: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      typeId: Joi.number().integer()
    })
  ),
  edges: Joi.array().items(
    Joi.array().ordered(Joi.number().integer(), Joi.number().integer())
  )
})

*/

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
    typeId: idToNodeType[node.data.typeId].serverId
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
