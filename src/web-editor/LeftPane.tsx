import { Stat } from "@/components/Stat";
import { Input } from "@/components/ui/input";
import { ResizablePanel } from "@/components/ui/resizable";
import { repeatNode } from "@/utils/markup";
import { Eclipse, Search } from "lucide-react";

import { RectPreview } from "./RectPreview";

// #F4F8F9
function RoomList() {
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
        {repeatNode(50, index => (
          <button
            key={index}
            className='flex w-full items-center gap-x-2 px-4 py-3 last:mb-8 hover:bg-accent'
          >
            <Eclipse className='text-[#f9e909]' strokeWidth={3} />
            <span>Balcony {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LeftPane() {
  return (
    <ResizablePanel minSize={10} defaultSize={18} className='flex flex-col'>
      <RoomList />
      <div className='shrink-0 border-t p-4 pb-40'>
        <h2 className='mb-2 font-semibold'>Plot Details</h2>

        <RectPreview
          rectangles={[
            { x: 20,  y: 10, width:  80, height: 50 },
            { x: 100, y: 10, width:  50, height: 50 },
            { x: 20,  y: 60, width: 130, height: 40 }
          ]}
          canvasHeight={150}
        />

        <Stat label='Length' value='32 ft.' />
        <Stat label='Width' value='26 ft.' />
        <Stat label='Area' value='832 ft. sq' />
      </div>
    </ResizablePanel>
  );
}
