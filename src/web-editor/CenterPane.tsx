import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ResizablePanel } from "@/components/ui/resizable";
import {
  Binoculars,
  ChevronDownIcon,
  CopyPlusIcon,
  Fullscreen,
  Redo,
  Undo,
  ZoomIn
} from "lucide-react";

function ZoomControl() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary'>
          <ZoomIn className='me-1' size={18} />
          180%
          <ChevronDownIcon
            className='-me-1 opacity-60'
            size={16}
            aria-hidden='true'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Zoom</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Binoculars size={16} className='opacity-60' aria-hidden='true' />
            Reset
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>80%</DropdownMenuItem>
          <DropdownMenuItem>100%</DropdownMenuItem>
          <DropdownMenuItem>110%</DropdownMenuItem>
          <DropdownMenuItem>120%</DropdownMenuItem>
          <DropdownMenuItem>130%</DropdownMenuItem>
          <DropdownMenuItem>140%</DropdownMenuItem>
          <DropdownMenuItem>150%</DropdownMenuItem>
          <DropdownMenuItem>160%</DropdownMenuItem>
          <DropdownMenuItem>180%</DropdownMenuItem>
          <DropdownMenuItem>200%</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Toolbar() {
  return (
    <nav className='flex border-b px-4 py-2'>
      <div className='flex flex-1 items-center justify-end'>
        <Button size='icon' variant='ghost'>
          <Undo />
        </Button>
        <Button size='icon' variant='ghost'>
          <Redo />
        </Button>
        <div className='ml-3'>
          <ZoomControl />
        </div>
      </div>
    </nav>
  );
}

export function CenterPane() {
  return (
    <>
      <ResizablePanel minSize={40} className='flex flex-col'>
        <Toolbar />
        <div className='flex-1-fix bg-[#F6F6F6]'></div>
      </ResizablePanel>
    </>
  );
}
