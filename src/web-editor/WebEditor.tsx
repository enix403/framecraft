import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import { TopNav } from "./TopNav";
import { LeftPane } from "./LeftPane";
import { RightPane } from "./RightPane";
import { CenterPane } from "./CenterPane";

export function WebEditor() {
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
        <LeftPane />
        <ResizableHandle />
        <CenterPane />
        <ResizableHandle />
        <RightPane />
      </ResizablePanelGroup>
    </div>
  );
}
