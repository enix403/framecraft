import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderGit2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentProps } from "react";

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
  ...props
}: { label: string } & ComponentProps<"input">) {
  return (
    <div>
      <Label>{label}</Label>
      <div className='relative flex rounded-md shadow-xs'>
        <Input
          className='-me-px rounded-e-none shadow-none'
          type='text'
          // placeholder='Enter width'
          {...props}
        />
        <span className='-z-10 inline-flex items-center rounded-e-md border border-input bg-background px-3 text-sm text-muted-foreground'>
          ft
        </span>
      </div>
    </div>
  );
}

function PlotDimensions() {
  return (
    <div className='mt-6'>
      <Label className='text-ls font-semibold'>Plot Size</Label>

      <Tabs defaultValue='tab-1' className='mt-1 items-center'>
        <TabsList className='flex w-full'>
          <TabsTrigger className='flex-1' value='tab-1'>
            Feet
          </TabsTrigger>
          <TabsTrigger className='flex-1' value='tab-2'>
            Meter
          </TabsTrigger>
          <TabsTrigger className='flex-1' value='tab-3'>
            Inches
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='mt-2 flex gap-2'>
        <DimensionsInput label="Width" placeholder="Enter width" />
        <DimensionsInput label="Height" placeholder="Enter height" />
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
