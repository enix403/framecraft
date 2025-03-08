import clsx from "clsx";
import { appNodeTypes, NodeType } from "@/lib/nodes";
import { NodeSlab } from "@/components/NodeSlab";
import { atom, useSetAtom } from "jotai";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { createNewNode } from "./layout-editor/add-node";

/* ========================== */

function Source({ nodeType }: { nodeType: NodeType }) {
  const { getNodes, addNodes } = useReactFlow();

  const handleAddNode = useCallback(() => {
    const nodes = getNodes();
    const newNode = createNewNode("living", "1", nodes);
    addNodes(newNode);
  }, [getNodes, addNodes]);

  const setTypeId = useSetAtom(dndNodeTypeIdAtom);

  return (
    <NodeSlab
      title={nodeType.title}
      className={clsx("border-[#04ACB0] shadow-sm", "cursor-grab select-none")}
      onClick={() => handleAddNode()}
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
