import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { TopNav } from "./panes/TopNav";
import { RoomList } from "./panes/RoomList";
import { PlotDetails } from "./panes/PlotDetails";
import { RoomDetails } from "./panes/RoomDetails";

import { getInitialPlan } from "./plan/demo/initialPlan";

import { CenterPane } from "./CenterPane";
import { PlanContext } from "./PlanProvider";

const plan = getInitialPlan();

export function WebEditor() {
  return (
    <PlanContext.Provider value={plan}>
      <div className='flex h-full max-h-full flex-col overflow-hidden'>
        <TopNav />
        <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
          {/* Left Pane */}
          <ResizablePanel
            minSize={10}
            defaultSize={18}
            className='flex flex-col'
          >
            <RoomList />
            <PlotDetails />
          </ResizablePanel>
          <ResizableHandle />
          {/* Center Pane */}
          <CenterPane />
          <ResizableHandle />
          {/* Right Pane */}
          <ResizablePanel minSize={10} defaultSize={15}>
            <RoomDetails />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </PlanContext.Provider>
  );
}
