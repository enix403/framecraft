import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ResizablePanel } from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Binoculars,
  ChevronDownIcon,
  DraftingCompass,
  Layers,
  LocateFixed,
  Palette,
  Redo,
  Undo,
  ZoomIn
} from "lucide-react";
import { ComponentProps, PropsWithChildren, ReactNode, useState } from "react";
import { EditorView2D } from "./EditorView2D/EditorView2D";

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
          <DropdownMenuItem>70%</DropdownMenuItem>
          <DropdownMenuItem>80%</DropdownMenuItem>
          <DropdownMenuItem>100%</DropdownMenuItem>
          <DropdownMenuItem>110%</DropdownMenuItem>
          <DropdownMenuItem>120%</DropdownMenuItem>
          <DropdownMenuItem>140%</DropdownMenuItem>
          <DropdownMenuItem>180%</DropdownMenuItem>
          <DropdownMenuItem>200%</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UnitControl() {
  const [unit, setUnit] = useState("ft");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <DraftingCompass size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Unit</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={unit} onValueChange={setUnit}>
          <DropdownMenuRadioItem value='ft'>Feet</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='m'>Meters</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='in'>Inches</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FeatureToggle({
  label,
  enabled,
  onChange
}: {
  label: ReactNode;
  enabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <DropdownMenuItem onSelect={e => e.preventDefault()} asChild>
      <Label className='justify-between'>
        <p className='mr-10'>{label}</p>
        <Switch checked={enabled} onCheckedChange={onChange} />
      </Label>
    </DropdownMenuItem>
  );
}

function FeatureTogglesControl() {
  const [wallMeasurements, setWallMeasurements] = useState(true);
  const [roomLabels, setRoomLabels] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Layers size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Toggle Features</DropdownMenuLabel>
        <DropdownMenuGroup>
          <FeatureToggle
            label='Wall Measurements'
            enabled={wallMeasurements}
            onChange={setWallMeasurements}
          />
          <FeatureToggle
            label='Room Labels'
            enabled={roomLabels}
            onChange={setRoomLabels}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ViewModeControl() {
  const [viewMode, setViewMode] = useState("color");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Palette size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select View Mode</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
          <DropdownMenuRadioItem value='color'>Color</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='wireframe'>
            Wireframe
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TooltipWrapper({
  children,
  tip,
  side = 'bottom'
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
    <>
      <ResizablePanel minSize={40} className='relative flex flex-col'>
        <Toolbar />
        <div className='flex-1-fix bg-[#F6F6F6]'>
          <EditorView2D />
        </div>
        <div className='absolute bottom-6 left-6'>
          <TooltipWrapper tip='Recenter' side="top">
            <Button
              size='icon'
              className='rounded-full bg-white p-4 text-black hover:bg-accent/90 active:bg-accent/70'
            >
              <LocateFixed size={30} />
            </Button>
          </TooltipWrapper>
        </div>
      </ResizablePanel>
    </>
  );
}
