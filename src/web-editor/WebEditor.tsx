import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

import {
  Apple,
  BedDouble,
  Box,
  ChevronDownIcon,
  Droplet,
  Eclipse,
  Grape,
  Map,
  Search,
  Settings,
  Sparkle,
  Tv,
  Waypoints
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ReactNode, useId } from "react";
import { repeatNode } from "@/utils/markup";

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

/* ================================ */

function RoomList() {
  return (
    <div className='flex flex-1 flex-col p-4 pb-0'>
      <h2 className='mb-2 font-semibold'>Rooms</h2>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
          <Search size={16} aria-hidden='true' />
        </div>
        <Input
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

      <div className='-mx-4 flex-1-y pt-2'>
        {repeatNode(50, index => (
          <button
            key={index}
            className='flex w-full items-center gap-x-2 px-4 py-3 last:mb-8 hover:bg-accent'
          >
            <Eclipse className='text-[#f9e909]' strokeWidth={3} />
            <span>Balcony {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className='flex items-center justify-center gap-x-4 mb-1'>
      <p className='flex-1 text-right text-sm text-muted-foreground'>{label}:</p>
      <p className='flex-1 text-accent-foreground'>{value}</p>
    </div>
  );
}

function LeftPane() {
  return (
    <>
      <RoomList />
      <div className='shrink-0 border-t p-4 pb-40'>
        <h2 className='mb-2 font-semibold'>Plot Details</h2>
        <Stat label="Length" value="32 ft." />
        <Stat label="Width" value="26 ft." />
        <Stat label="Area" value="832 ft. sq" />
      </div>
    </>
  );
}

export function WebEditor() {
  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden'>
      <TopNav />
      <ResizablePanelGroup direction='horizontal' className='flex-1-fix'>
        <ResizablePanel minSize={10} defaultSize={18} className='flex flex-col'>
          <LeftPane />
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
