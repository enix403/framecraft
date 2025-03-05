import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderGit2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentProps, useState } from "react";

function PlanName() {
  return (
    <>
      <Label className='text-ls font-semibold'>Plan Name</Label>
      <div className='relative mt-1'>
        <Input
          defaultValue='Untitled Plan'
          className='peer ps-10'
          placeholder='Enter plan name'
        />
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
          <FolderGit2 size={20} />
        </div>
      </div>
    </>
  );
}

function DimensionsInput({
  label,
  unit,
  ...props
}: { label: string; unit: string } & ComponentProps<"input">) {
  return (
    <div>
      <Label>{label}</Label>
      <div className='relative mt-1 flex rounded-md shadow-xs'>
        <Input
          className='-me-px rounded-e-none shadow-none'
          type='text'
          // placeholder='Enter width'
          {...props}
        />
        <span className='-z-10 inline-flex items-center rounded-e-md border border-input bg-background px-3 text-sm text-muted-foreground'>
          {unit}
        </span>
      </div>
    </div>
  );
}

function PlotDimensions() {
  const [unit, setUnit] = useState("ft");

  return (
    <div className='mt-8'>
      <Label className='text-ls font-semibold'>Plot Size</Label>

      <Tabs
        value={unit}
        onValueChange={v => setUnit(v)}
        className='mt-2 items-center'
      >
        <TabsList className='flex w-full'>
          <TabsTrigger className='flex-1' value='ft'>
            Feet
          </TabsTrigger>
          <TabsTrigger className='flex-1' value='m'>
            Meters
          </TabsTrigger>
          <TabsTrigger className='flex-1' value='in'>
            Inches
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='mt-3 flex gap-2'>
        <DimensionsInput label='Width' placeholder='Enter width' unit={unit} />
        <DimensionsInput
          label='Height'
          placeholder='Enter height'
          unit={unit}
        />
      </div>
    </div>
  );
}

export function GenerateDesign() {
  return (
    <div className='flex h-full max-h-full overflow-hidden'>
      <div className='w-sm border-r-2 p-4'>
        <h2 className='mb-4 text-2xl font-bold tracking-tight'>
          Generate New Plan
        </h2>

        <PlanName />
        <PlotDimensions />
      </div>
    </div>
  );
}
