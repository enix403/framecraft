import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import {
  Box,
  ChevronDownIcon,
  Map,
  Settings,
  Sparkle,
  Waypoints
} from "lucide-react";

function TopNav() {
  return (
    <nav className='flex border-b px-4 py-4'>
      <div className='flex flex-1 items-center'>
        <Button variant='secondary' className='h-auto w-auto py-3'>
          <Sparkle className='!h-5 !w-5' />
          <ChevronDownIcon className='opacity-60' aria-hidden='true' />
        </Button>

        <Button variant='ghost' className='ml-4 py-4'>
          <p className='max-w-40 overflow-hidden text-ellipsis'>
            <span className='text-gray-500'>Projects / </span>
            My Plan 1
          </p>
          <ChevronDownIcon
            className='-me-1 opacity-60'
            size={16}
            aria-hidden='true'
          />
        </Button>
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <ToggleGroup
          defaultValue='2d'
          variant='outline'
          size='lg'
          className='inline-flex'
          type='single'
        >
          <ToggleGroupItem value='layout'>
            Layout Graph <Waypoints />
          </ToggleGroupItem>
          <ToggleGroupItem value='2d'>
            2D View <Map />
          </ToggleGroupItem>
          <ToggleGroupItem value='3d'>
            3D View <Box />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='flex flex-1 items-center justify-end'>
        <Button size='lg' className='mr-2'>
          Export
        </Button>
        <Button variant='outline' size='icon'>
          <Settings />
        </Button>
      </div>
    </nav>
  );
}

export function WebEditor() {
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel minSize={10} defaultSize={18}>
          One
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={40}>Two</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={10} defaultSize={15}>
          Three
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <div className="flex-1">
      </div> */}
    </div>
  );
}
