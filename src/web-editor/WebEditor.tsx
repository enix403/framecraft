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
  Search,
  Settings,
  Sparkle,
  Waypoints
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useId } from "react";

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
  const id = useId();
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel minSize={10} defaultSize={18} className='p-4'>
          <h2 className="mb-2 font-semibold">Rooms</h2>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
              <Search size={16} aria-hidden='true' />
            </div>
            <Input
              id={id}
              className='bg-muted ps-9 pe-11'
              placeholder='Search...'
              type='search'
            />
            <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground'>
              <kbd className='inline-flex h-5 max-h-full items-center rounded border bg-primary-foreground px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
                ⌘K
              </kbd>
            </div>
          </div>
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
