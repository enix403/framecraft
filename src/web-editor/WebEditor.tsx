import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { TopNav } from "./TopNav";
import { CenterPane } from "./CenterPane";

import { RoomList } from "./panes/RoomList";
import { PlotDetails } from "./panes/PlotDetails";
import { RoomDetails } from "./panes/RoomDetails";

export function WebEditor() {
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
        {/* Left Pane */}
        <ResizablePanel minSize={10} defaultSize={18} className='flex flex-col'>
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
  );
}
