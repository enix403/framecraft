import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Redo, Undo } from "lucide-react";
import { ComponentProps, PropsWithChildren, ReactNode, useState } from "react";
import { World2DEditor } from "./world2d/World2DEditor";
import { UnitControl } from "./world2d/controls/UnitControl";
import { FeatureTogglesControl } from "./world2d/controls/FeatureTogglesControl";
import { ViewModeControl } from "./world2d/controls/ViewModeControl";
import { ZoomControl } from "./world2d/controls/ZoomControl";
import { RecenterButton } from "./world2d/controls/RecenterButton";

function TooltipWrapper({
  children,
  tip,
  side = "bottom"
}: PropsWithChildren & {
  tip: ReactNode;
  side?: ComponentProps<typeof TooltipContent>["side"];
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        className='dark px-2 py-1 text-xs'
        showArrow={true}
      >
        {tip}
      </TooltipContent>
    </Tooltip>
  );
}

function Toolbar() {
  return (
    <nav className='flex border-b px-4 py-2'>
      <div className='flex flex-1 items-center gap-x-1'>
        <UnitControl />
        <FeatureTogglesControl />
        <ViewModeControl />
      </div>
      <div className='flex flex-1 items-center justify-end'>
        <TooltipWrapper tip='Undo'>
          <Button size='icon' variant='ghost'>
            <Undo size={20} />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper tip='Redo'>
          <Button size='icon' variant='ghost'>
            <Redo size={20} />
          </Button>
        </TooltipWrapper>
        <div className='ml-3'>
          <ZoomControl />
        </div>
      </div>
    </nav>
  );
}

export function CenterPane() {
  return (
    <ResizablePanel minSize={40} className='relative flex flex-col'>
      <Toolbar />
      <div className='flex-1-fix bg-[#F6F6F6]'>
        <World2DEditor />
      </div>
      <div className='absolute bottom-6 left-6'>
        <TooltipWrapper tip='Recenter' side='top'>
          <RecenterButton />
        </TooltipWrapper>
      </div>
    </ResizablePanel>
  );
}
