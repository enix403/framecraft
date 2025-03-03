import { Link, Route, Routes } from "react-router";
import { ConfigSidebar } from "./common/ConfigSidebar";
import { DesignPreview } from "./common/DesignPreview";
import { GenerationAppLayout } from "./layout/GenerationAppLayout";
import {
  ArrowRight as IconArrowRight,
  Sliders as IconSliders,
  X as IconX
} from "@phosphor-icons/react";
import { useState } from "react";
import { repeatNode } from "~/utils/markup";
import clsx from "clsx";

function GenerateDesign() {
  return (
    <div
      className={clsx("flex-1 flex-col items-center pt-28", "hidden lg:flex")}
    >
      <div className='opacity-50'>
        <img src='/gen_neutral.svg' className='w-[500px]' />
      </div>
      <div className='alert alert-success mt-10 max-w-lg'>
        <IconSliders size={28} className='text-success' />
        <div className='flex flex-col'>
          <span className='text-content2'>
            Tweak the settings to your liking, and hit "Generate"
          </span>
        </div>
      </div>
    </div>
  );
}

function PickDesign() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const canContinue = selectedIndex !== -1;

  return (
    <div className='relative flex max-h-full w-full flex-col items-center overflow-y-auto p-10 pt-24'>
      <div className='mb-8 text-4xl font-semibold max-lg:self-start'>
        <h1 className='inline-block bg-linear-to-r from-pink-600 via-purple-400 to-blue-500 bg-clip-text text-transparent'>
          Pick a design to get started
        </h1>
      </div>

      <Link to='/generate' className='absolute -top-0 left-10'>
        <button className='btn btn-solid-error mt-6 w-full gap-x-2 py-6'>
          <IconX />
          <strong>Cancel</strong>
        </button>
      </Link>

      <div className='flex flex-col items-stretch gap-y-12 max-lg:flex-col-reverse max-lg:pb-44 lg:items-center'>
        <div className='grid max-w-4xl grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
          {repeatNode(6, index => {
            const isSelected = selectedIndex === index;
            return (
              <DesignPreview
                selected={isSelected}
                onSelect={() => setSelectedIndex(isSelected ? -1 : index)}
              />
            );
          })}
        </div>

        <Link to={canContinue ? "/edit" : "#"} className='w-full lg:max-w-2xl'>
          <button
            disabled={!canContinue}
            className='btn btn-secondary w-full gap-x-2 py-6'
          >
            <strong>Continue with this design</strong>
            <IconArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
}

export function GeneratePage() {
  return (
    <GenerationAppLayout>
      <ConfigSidebar />

      <Routes>
        <Route index element={<GenerateDesign />} />
        <Route path='/pick' element={<PickDesign />} />
      </Routes>
    </GenerationAppLayout>
  );
}
