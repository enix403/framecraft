import { Link, Route, Routes } from "react-router";
import { ConfigSidebar } from "./common/ConfigSidebar";
import { DesignPreview } from "./common/DesignPreview";
import { GenerationAppLayout } from "./layout/GenerationAppLayout";
import {
  ArrowRight as IconArrowRight,
  Sliders as IconSliders
} from "@phosphor-icons/react";
import { useState } from "react";
import { repeatNode } from "~/utils/markup";

function GenerateDesign() {
  return (
    <div className='flex-1 flex flex-col items-center pt-28'>
      <div className='opacity-50'>
        <img src='/gen_neutral.svg' className='w-[500px]' />
      </div>
      <div className='alert alert-success max-w-lg mt-10'>
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
    <div className='p-10 pt-8 overflow-y-auto max-h-full flex flex-col items-center w-full'>
      <div className='mb-12 text-4xl font-semibold'>
        <h1 className='bg-gradient-to-r from-pink-600 via-purple-400 to-blue-500 inline-block text-transparent bg-clip-text'>
          Pick a design to get started
        </h1>
      </div>

      <div className='grid grid-cols-3 gap-x-6 gap-y-8 max-w-4xl'>
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

      <Link to={canContinue ? "/edit" : "#"} className='w-full max-w-2xl'>
        <button
          disabled={!canContinue}
          className='btn w-full btn-secondary py-6 mt-12 gap-x-2'
        >
          <strong>Continue with this design</strong>
          <IconArrowRight />
        </button>
      </Link>
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
