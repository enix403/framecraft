
import {
  Handle,
  Position,
  type Node,
  type NodeProps
} from "@xyflow/react";
import { Link2, Package, Plus } from "lucide-react";
import clsx from "clsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { appRoomTypes, idToNodeType } from "@/lib/nodes";
import { appNodeStyle } from "@/lib/node-styles";

function AddNodeButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            "nodrag nopan cursor-crosshair",
            "!h-auto !w-auto rounded-full !border-none !bg-[#79dcbd] !p-1",
            "absolute !top-[calc(50%-10px)] right-0 translate-x-1/2 -translate-y-1/2"
          )}
        >
          <Plus size={8} className='text-white' strokeWidth={3} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Connect a New Room</DropdownMenuLabel>
        <DropdownMenuGroup>
          {appRoomTypes.map(roomType => {
            const style = appNodeStyle[roomType.id];
            return (
              <DropdownMenuItem key={roomType.id}>
                <style.Icon size={16} color={style.iconColor} />
                <span className='truncate'>{roomType.title}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type LayoutNode = Node<
  {
    label: string;
    typeId: string;
  },
  "custom"
>;

export function LayoutNode({ data, selected }: NodeProps<LayoutNode>) {
  const { label, typeId } = data;

  return (
    <>
      <div
        className={clsx(
          "flex min-w-56 flex-row items-center gap-x-2.5 rounded-[8px] border bg-white p-2.5 pr-6",
          "transition-colors",
          "shadow-[0px_10px_36px_-6px_rgba(0,_0,_0,_0.1)]",
          "relative",
          selected && "border-[#04ACB0]"
        )}
      >
        <div className='rounded-[6px] bg-[#04ACB0] p-1.5 text-white'>
          <Package size={26} />
        </div>

        <div className='flex-1-fit space-y-1.5 font-graph-editor'>
          <p className='text-sm leading-[1] font-semibold text-[color:#1B1B2E]'>
            {label}
          </p>
          <p className='text-[size:0.7rem] leading-[1] font-medium text-[color:#7C7D87]'>
            {idToNodeType[typeId].title}
          </p>
        </div>
      </div>

      <AddNodeButton />

      <Handle
        type='source'
        position={Position.Right}
        isConnectableEnd={false}
        className={clsx(
          "!h-auto !w-auto !border-none !bg-[#AF79DC] !p-1",
          "!top-[calc(50%+10px)]"
        )}
      >
        <Link2
          size={8}
          className='pointer-events-none text-white'
          strokeWidth={3}
        />
      </Handle>

      <Handle
        type='target'
        position={Position.Left}
        isConnectableStart={false}
        className='!top-0 !left-0 !h-full !w-full !transform-none !rounded-none opacity-0'
      />
    </>
  );
}