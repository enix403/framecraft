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

import { idToNodeType } from "@/lib/nodes";

import { LayoutEdge } from "./LayoutEdge";
import { LayoutNode } from "./LayoutNode";
import { LayoutEditorSettingsContext } from "./LayoutEditorSettings";

/* =================================== */

const nodeTypes = { custom: LayoutNode };
const edgeTypes = { custom: LayoutEdge };

/* =================================== */

let id = 0;
const getId = () => `dndnode_${id++}`;

export function LayoutGraphEditor({
  initialNodes,
  initialEdges,
  onSelection = () => {},
  readOnly = false
}: {
  initialNodes: LayoutNode[];
  initialEdges: LayoutEdge[];
  onSelection?: (node: LayoutNode | null) => void;
  readOnly?: boolean;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

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
    [screenToFlowPosition]
  );

  return (
    <LayoutEditorSettingsContext.Provider value={{ readOnly }}>
      <div className='h-full max-h-full w-full max-w-full'>
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          onNodesChange={readOnly ? undefined : onNodesChange}
          onNodeClick={readOnly ? undefined : (e, node) => onSelection(node)}
          onNodeDragStart={
            readOnly ? undefined : (e, node) => onSelection(node)
          }
          onPaneClick={readOnly ? undefined : () => onSelection(null)}
          edges={edges}
          onEdgesChange={readOnly ? undefined : onEdgesChange}
          onConnect={readOnly ? undefined : onConnect}
          edgesFocusable={false}
          nodesFocusable={!readOnly}
          nodesDraggable={!readOnly}
          onDragOver={readOnly ? undefined : onDragOver}
          onDrop={readOnly ? undefined : onDrop}
          fitView
          fitViewOptions={{ maxZoom: 1 }}
          defaultEdgeOptions={{
            animated: !readOnly,
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
    </LayoutEditorSettingsContext.Provider>
  );
}
