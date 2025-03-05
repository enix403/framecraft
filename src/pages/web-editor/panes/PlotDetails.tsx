import { RectPreview } from "@/components/RectPreview";
import { Stat } from "@/components/Stat";

export function PlotDetails() {
  return (
    <div className='shrink-0 border-t p-4 pb-16'>
      <h2 className='mb-4 font-semibold'>Plot Details</h2>

      <RectPreview
        className='mb-4'
        rectangles={[
          { left: 20, top: 10, width: 80, height: 50 },
          { left: 100, top: 10, width: 50, height: 50 },
          { left: 20, top: 60, width: 130, height: 40 }
        ]}
      />

      <Stat label='Length' value='32 ft.' />
      <Stat label='Width' value='26 ft.' />
      <Stat label='Area' value='832 ft. sq' />
    </div>
  );
}
