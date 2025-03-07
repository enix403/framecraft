import clsx from "clsx";
import { Package } from "lucide-react";
import { ReactNode } from "react";
import { roomTypeIds, roomTypes } from "../web-editor/plan/rooms";

function Source({ label }: { label: ReactNode }) {
  return (
    <div
      className={clsx(
        "flex min-w-56 flex-row items-center gap-x-2.5 rounded-[8px] border bg-white p-2.5 pr-6",
        "transition-colors",
        // "shadow-[0px_10px_36px_-6px_rgba(0,_0,_0,_0.1)]",
        "shadow-sm",
        "relative",
        "border-[#04ACB0]"
      )}
    >
      <div className='rounded-[6px] bg-[#04ACB0] p-1.5 text-white'>
        <Package size={26} />
      </div>

      <div className='flex-1-fit space-y-1.5 font-graph-editor'>
        <p className='text-sm leading-[1] font-semibold text-[color:#1B1B2E]'>
          {label}
        </p>
      </div>
    </div>
  );
}

export function NodeDragSource() {
  return (
    <div className='flex h-full max-h-full w-[16rem] flex-col overflow-y-auto p-4'>
      <h2 className='mb-2 font-semibold'>Available Rooms</h2>

      <div className='-mx-4 -mb-4 flex-1-y space-y-2 px-4 pb-4'>
        {roomTypeIds.map(typeId => (
          <Source key={typeId} label={roomTypes[typeId].title} />
        ))}
      </div>
    </div>
  );
}
