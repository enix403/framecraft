import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { getInitialPlan } from "@/lib/demo/initialPlan";
import { PlanContext } from "./PlanProvider";

import { TopNav, activeTabAtom } from "./panes/TopNav";
import { RoomList } from "./panes/RoomList";
import { PlotDetails } from "./panes/PlotDetails";
import { RoomDetails } from "./panes/RoomDetails";

import { World2DPane } from "./world2d/World2DPane";
import { useState } from "react";
import { PlanData } from "@/lib/plan";
import { useAtomValue } from "jotai";
import { LayoutGraphEditor } from "@/components/layout-editor/LayoutGraphEditor";

function CentralPane() {
  const activeTab = useAtomValue(activeTabAtom);

  if (activeTab === "layout") {
    return <LayoutGraphEditor />;
  } else if (activeTab === "2d") {
    return <World2DPane />;
  }

  return null;
}

export function WebEditor() {
  const [plan, setPlan] = useState<PlanData | null>(getInitialPlan);

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
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
          <ResizablePanel minSize={40} className='flex flex-1-fix flex-col'>
            <CentralPane />
          </ResizablePanel>
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
