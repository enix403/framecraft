import "@xyflow/react/dist/style.css";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  NodeMouseHandler,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange,
  ReactFlow,
  useReactFlow,
  XYPosition
} from "@xyflow/react";
import { ComponentProps, useCallback } from "react";

import { idToNodeType } from "@/lib/nodes";

import { LayoutEdge } from "./LayoutEdge";
import { LayoutNode } from "./LayoutNode";
import { LayoutEditorSettingsContext } from "./LayoutEditorSettings";
import { getNewNodeId } from "./add-node";
import { StateSet } from "@/lib/utils";

/* =================================== */

const nodeTypes = { custom: LayoutNode };
const edgeTypes = { custom: LayoutEdge };

/* =================================== */

export function LayoutGraphEditor({
  nodes,
  setNodes,
  edges,
  setEdges,
  onSelection = () => {},
  placeDroppedNode,
  readOnly = false
}: {
  nodes: LayoutNode[];
  setNodes: StateSet<LayoutNode[]>;
  edges: LayoutEdge[];
  setEdges: StateSet<LayoutEdge[]>;
  onSelection?: (node: LayoutNode | null) => void;
  readOnly?: boolean;
  placeDroppedNode?: (event: React.DragEvent<HTMLElement>) => XYPosition;
}) {
  const onNodesChange: OnNodesChange<LayoutNode> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  const onEdgesChange: OnEdgesChange<LayoutEdge> = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick: NodeMouseHandler<LayoutNode> = useCallback(
    (e, node) => onSelection(node),
    [onSelection]
  );

  const onNodeDragStart: OnNodeDrag<LayoutNode> = useCallback(
    (e, node) => onSelection(node),
    [onSelection]
  );

  const onPaneClick = useCallback(() => onSelection(null), [onSelection]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();

      const typeId = event.dataTransfer.getData("custom/source-node-type");
      const nodeType = idToNodeType[typeId] || null;

      if (!nodeType || !placeDroppedNode) {
        return;
      }

      const position = placeDroppedNode(event);

      const newNode = {
        id: getNewNodeId(),
        type: "custom",
        position,
        data: {
          label: nodeType.title,
          typeId: nodeType.id
        }
      } as LayoutNode;

      setNodes(nds => nds.concat(newNode));
    },
    [placeDroppedNode]
  );

  const interactionHandlers: ComponentProps<
    typeof ReactFlow<LayoutNode, LayoutEdge>
  > = {
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onNodeDragStart,
    onPaneClick,
    onDragOver,
    onDrop
  };

  return (
    <LayoutEditorSettingsContext.Provider value={{ readOnly }}>
      <div className='h-full max-h-full w-full max-w-full'>
        <ReactFlow
          {...(readOnly ? {} : interactionHandlers)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          nodesFocusable={!readOnly}
          nodesDraggable={!readOnly}
          edgesFocusable={false}
          defaultEdgeOptions={{
            animated: !readOnly,
            type: "custom"
          }}
          fitView
          fitViewOptions={{ maxZoom: 1 }}
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
    </LayoutEditorSettingsContext.Provider>
  );
}
