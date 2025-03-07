import { Button } from "@/components/ui/button";
import { GeneralSettings } from "./GeneralSettings";
import { LayoutGraphHeading } from "./LayoutGraphHeading";
import { Toolbar } from "./Toolbar";
import { GraphEditor } from "./graph-editor/GraphEditor";
import { NodeDragSource } from "./NodeDragSource";

export function GenerateDesign() {
  return (
    <div className='flex h-full max-h-full overflow-hidden'>
      <div className='w-sm border-r-2 p-4'>
        <GeneralSettings />
      </div>
      <div className='flex flex-1-fix flex-col'>
        <LayoutGraphHeading />
        <Toolbar />
        <div className='flex flex-1-fix'>
          <div className='flex-1-fix shrink-0'>
            <GraphEditor />
          </div>
          <div className='border-l-2 max-h-full max-w-sm'>
            <NodeDragSource />
          </div>
        </div>
        <div className='border-t-2 shrink-0'>
          <GraphPresets />
        </div>
      </div>
    </div>
  );
}


function GraphPresets() {
  return "p";
}
