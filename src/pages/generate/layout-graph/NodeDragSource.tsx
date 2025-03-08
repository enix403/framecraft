import clsx from "clsx";
import { appNodeTypes } from "@/lib/nodes";
import { NodeSlab } from "@/components/NodeSlab";

function Source({ label }: { label: string }) {
  return (
    <NodeSlab
      title={label}
      className={clsx("border-[#04ACB0] shadow-sm", "cursor-grab select-none")}
      draggable
      onDragStart={event => {
        event.dataTransfer.effectAllowed = "move";
      }}
    />
  );
}

export function NodeDragSource() {
  return (
    <div className='flex h-full max-h-full w-[16rem] flex-col overflow-y-auto p-4'>
      <h2 className='mb-2 font-semibold'>Available Rooms</h2>

      <div className='-mx-4 -mb-4 flex-1-y space-y-2 px-4 pb-4'>
        {appNodeTypes.map(nodeType => {
          // const style = appNodeStyle[nodeType.id];
          return <Source key={nodeType.id} label={nodeType.title} />;
        })}
      </div>
    </div>
  );
}
