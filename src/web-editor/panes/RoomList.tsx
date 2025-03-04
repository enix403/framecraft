import { Input } from "@/components/ui/input";
import { repeatNode } from "@/utils/markup";
import { Eclipse, Search } from "lucide-react";
import { usePlan } from "../PlanProvider";
import { roomInfoFromNodeType } from "../plan/rooms";

export function RoomList() {
  let { rooms } = usePlan();

  return (
    <div className='flex flex-1 flex-col p-4 pb-0'>
      <h2 className='mb-2 font-semibold'>Rooms</h2>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
          <Search size={16} aria-hidden='true' />
        </div>
        <Input
          className='bg-[#F4F8F9] ps-9 pe-11'
          placeholder='Search...'
          type='search'
        />
        <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground'>
          <kbd className='inline-flex h-5 max-h-full items-center rounded border bg-primary-foreground px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
            ⌘K
          </kbd>
        </div>
      </div>

      <div className='-mx-4 mt-2 flex-1-y'>
        {rooms.map(room => {
          const roomType = roomInfoFromNodeType(room.type);
          return (
            <button
              key={room.id}
              className='flex w-full items-center gap-x-2 px-4 py-3 last:mb-8 hover:bg-accent-foreground/[0.07]'
            >
              <roomType.Icon color={roomType.color} strokeWidth={3} />
              <span>{room.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
