import { Stat } from "@/components/Stat";
import { ResizablePanel } from "@/components/ui/resizable";

import { RectPreview } from "./RectPreview";

export function RightPane() {
  return (
    <ResizablePanel minSize={10} defaultSize={15} className='flex flex-col p-4'>
      <h2 className='mb-4 font-semibold'>Room Details</h2>

      <RectPreview
        className='mb-4'
        rectangles={[
          {
            left: 29,
            top: 39,
            width: 9,
            height: 14
          },
          {
            left: 29,
            top: 53,
            width: 5,
            height: 1
          }
        ]}
      />

      <Stat label='Length' value='32 ft.' />
      <Stat label='Width' value='26 ft.' />
      <Stat label='Area' value='832 ft. sq' />
    </ResizablePanel>
  );
}


/*

{
  "left": 41,
  "top": 16,
  "width": 17,
  "height": 8
},
{
  "left": 39,
  "top": 21,
  "width": 2,
  "height": 3
}

*/