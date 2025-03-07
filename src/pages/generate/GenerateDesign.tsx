import { Button } from "@/components/ui/button";
import { GeneralSettings } from "./GeneralSettings";
import { LayoutGraphPane } from "./layout-graph/LayoutGraphPane";

export function GenerateDesign() {
  return (
    <div className='flex h-full max-h-full overflow-hidden'>
      <div className='w-sm border-r-2 p-4'>
        <GeneralSettings />
      </div>
      <div className='flex flex-1-fix flex-col'>
        <LayoutGraphPane />
      </div>
    </div>
  );
}
