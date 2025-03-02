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
        <h2 className='mb-4 font-semibold'>Plot Details</h2>

        <RectPreview
          className='mb-4'
          rectangles={[
            // { x: 20, y: 10, width: 80, height: 50 },
            // { x: 100, y: 10, width: 50, height: 50 },
            // { x: 20, y: 60, width: 130, height: 40 }
            {
              "x": 29,
              "y": 39,
              "width": 9,
              "height": 14
            },
            {
              "x": 29,
              "y": 53,
              "width": 5,
              "height": 1
            }
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

/*

[
  [24, 46, 12, 8],
  [48, 5, 24, 5],
  [39, 29, 9, 14, 53, 29, 5, 1],
  [16, 41, 17, 8, 21, 39, 2, 3],
  [6, 3, 8, 18],
  [6, 28, 11, 18, 6, 39, 2, 15],
  [36, 5, 24, 12],
  [32, 38, 20, 20],
  [24, 5, 33, 12, 36, 29, 9, 3]
].map((room, index) => {
  let [...flatRects] = room;
  let rects = [];

  for (let i = 0; i < flatRects.length; i += 4) {
    rects.push({
      x: flatRects[i + 1],
      y: flatRects[i],
      width: flatRects[i + 2],
      height: flatRects[i + 3]
    });
  }

  return rects;
})

[
  [
    {
      "x": 46,
      "y": 24,
      "width": 12,
      "height": 8
    }
  ],
  [
    {
      "x": 5,
      "y": 48,
      "width": 24,
      "height": 5
    }
  ],
  [
    {
      "x": 29,
      "y": 39,
      "width": 9,
      "height": 14
    },
    {
      "x": 29,
      "y": 53,
      "width": 5,
      "height": 1
    }
  ],
  [
    {
      "x": 41,
      "y": 16,
      "width": 17,
      "height": 8
    },
    {
      "x": 39,
      "y": 21,
      "width": 2,
      "height": 3
    }
  ],
  [
    {
      "x": 3,
      "y": 6,
      "width": 8,
      "height": 18
    }
  ],
  [
    {
      "x": 28,
      "y": 6,
      "width": 11,
      "height": 18
    },
    {
      "x": 39,
      "y": 6,
      "width": 2,
      "height": 15
    }
  ],
  [
    {
      "x": 5,
      "y": 36,
      "width": 24,
      "height": 12
    }
  ],
  [
    {
      "x": 38,
      "y": 32,
      "width": 20,
      "height": 20
    }
  ],
  [
    {
      "x": 5,
      "y": 24,
      "width": 33,
      "height": 12
    },
    {
      "x": 29,
      "y": 36,
      "width": 9,
      "height": 3
    }
  ]
]
*/
