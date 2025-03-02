import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { LeftPane } from "./LeftPane";
import { TopNav } from "./TopNav";
import { RightPane } from "./RightPane";

export function WebEditor() {
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
        <LeftPane />
        <ResizableHandle />
        <ResizablePanel minSize={40} className="bg-[#F6F6F6]"></ResizablePanel>
        <ResizableHandle />
        <RightPane />
      </ResizablePanelGroup>
    </div>
  );
}
