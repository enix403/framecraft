import { RectPreview } from "@/components/RectPreview";
import { Stat } from "@/components/Stat";
import { usePlan } from "../plan-state";

export function PlotDetails() {
  const plan = usePlan();

  let { plotWidth, plotLength, plotMeasureUnit } = plan;

  const area = plotWidth * plotLength;

  return (
    <div className='shrink-0 border-t p-4 pb-16'>
      <h2 className='mb-4 font-semibold'>Plot Details</h2>

      <RectPreview
        className='mb-4'
        rectangles={[
          {
            left: 0,
            top: 0,
            width: plotWidth,
            height: plotLength
          }
        ]}
      />

      <Stat label='Length' value={`${plotLength} ${plotMeasureUnit}`} />
      <Stat label='Width' value={`${plotWidth} ${plotMeasureUnit}`} />
      <Stat label='Area' value={`${area} ${plotMeasureUnit}. sq`} />
    </div>
  );
}
