import { ComponentProps, ReactNode, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlipHorizontal, FlipVertical, FolderGit2 } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParamVoidCallback } from "@/lib/utils";

export function PlanName(props: ComponentProps<"input">) {
  return (
    <>
      <Label className='atext-ls font-semibold'>Plan Name</Label>
      <div className='relative mt-1'>
        <Input
          // defaultValue='Untitled Plan'
          {...props}
          placeholder='Enter plan name'
          className='peer ps-10'
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
  icon,
  ...props
}: {
  label: string;
  unit: string;
  icon?: ReactNode;
} & ComponentProps<"input">) {
  return (
    <div>
      <Label>{label}</Label>
      <div className='relative mt-1 flex rounded-md shadow-xs'>
        <Input
          className='-me-px rounded-e-none ps-9 shadow-none'
          type='text'
          {...props}
        />
        {icon && (
          <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
            {/*  */}
            {icon}
          </div>
        )}
        <span className='-z-10 inline-flex items-center rounded-e-md border border-input bg-background px-3 text-sm text-muted-foreground'>
          {unit}
        </span>
      </div>
    </div>
  );
}

export function PlotDimensions({
  unit,
  onUnitChange,
  widthProps,
  lengthProps
}: {
  unit: string;
  onUnitChange: ParamVoidCallback<string>;
  widthProps: ComponentProps<"input">;
  lengthProps: ComponentProps<"input">;
}) {
  return (
    <div className='mt-8'>
      <Label className='atext-ls font-semibold'>Plot Size</Label>

      <Tabs
        value={unit}
        onValueChange={v => onUnitChange(v)}
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
        <DimensionsInput
          {...widthProps}
          label='Width'
          placeholder='Enter width'
          icon={<FlipVertical size={18} />}
          unit={unit}
        />
        <DimensionsInput
          {...lengthProps}
          label='Length'
          placeholder='Enter length'
          icon={<FlipHorizontal size={18} />}
          unit={unit}
        />
      </div>
    </div>
  );
}
/*
export function GeneralSettings() {
  return (
    <>
      <PlanName />
      <PlotDimensions />
    </>
  );
}
 */
