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
  ReactFlowProvider,
  useReactFlow
} from "@xyflow/react";
import { ComponentProps, useCallback, useMemo } from "react";

import { FRONT_DOOR_ID, idToNodeType } from "@/lib/nodes";

import { LayoutEdge } from "./LayoutEdge";
import { LayoutNode } from "./LayoutNode";
import { LayoutEditorSettingsContext } from "./LayoutEditorSettings";
import { getNewNodeId } from "./add-node";
import { StateSet } from "@/lib/utils";

/* =================================== */

const nodeTypes = { custom: LayoutNode };
const edgeTypes = { custom: LayoutEdge };

/* =================================== */

export interface LayoutGraphEditorProps {
  nodes: LayoutNode[];
  setNodes: StateSet<LayoutNode[]>;
  edges: LayoutEdge[];
  setEdges: StateSet<LayoutEdge[]>;
  onSelection?: (node: LayoutNode | null) => void;
  readOnly?: boolean;
}

function Inner({
  nodes,
  setNodes,
  edges,
  setEdges,
  onSelection = () => {},
  readOnly = false
}: LayoutGraphEditorProps) {
  const { getNode, screenToFlowPosition } = useReactFlow<
    LayoutNode,
    LayoutEdge
  >();

  const onNodesChange: OnNodesChange<LayoutNode> = useCallback(
    changes =>
      setNodes(nodes => {
        /* Make sure that there is always atleast one front door in the graph. */

        const frontDoorDeletions = changes.filter(
          change =>
            change.type === "remove" &&
            getNode(change.id)?.data.typeId === FRONT_DOOR_ID
        );

        if (frontDoorDeletions.length > 0) {
          const numFrontDoors = nodes.filter(
            node => node.data.typeId === FRONT_DOOR_ID
          ).length;

          if (numFrontDoors - frontDoorDeletions.length <= 0) {
            // if there are no frontdoors left after deleting, we cancel the event
            return nodes;
          }
        }
        return applyNodeChanges(changes, nodes);
      }),
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

      if (!nodeType) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

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
    [screenToFlowPosition]
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

  const settings = useMemo(() => ({ readOnly }), [readOnly]);

  return (
    <LayoutEditorSettingsContext.Provider value={settings}>
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

export function LayoutGraphEditor(props: LayoutGraphEditorProps) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
