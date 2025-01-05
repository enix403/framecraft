import { Link } from "react-router";
import { ConfigSidebar } from "./common/ConfigSidebar";
import { DesignPreview } from "./common/DesignPreview";
import { GenerationAppLayout } from "./layout/GenerationAppLayout";
import { ArrowRight as IconArrowRight, Sliders as IconSliders } from "@phosphor-icons/react";

function GenerateDesign() {
  return (
    <div className="flex-1 flex flex-col items-center pt-28">
      <div className="opacity-50">
        <img src="/gen_neutral.svg" className="w-[500px]" />
      </div>
      <div className="alert alert-success max-w-lg mt-10">
        <IconSliders size={28} weight="bold" className="text-success" />
        <div className="flex flex-col">
          <span className="text-content2">
            Tweak the settings to your liking, and hit "Generate"
          </span>
        </div>
      </div>
    </div>
  );
}

function PickDesign() {
  return (
    <div className='p-10 pt-8 overflow-y-auto max-h-full flex flex-col items-center w-full'>
      <div className='mb-12 text-4xl font-semibold'>
        <h1 className='bg-gradient-to-r from-pink-600 via-purple-400 to-blue-500 inline-block text-transparent bg-clip-text'>
          Pick a design to get started
        </h1>
      </div>

      <div className='grid grid-cols-3 gap-x-6 gap-y-8 max-w-4xl'>
        <DesignPreview selected />
        <DesignPreview />
        <DesignPreview />
        <DesignPreview />
        <DesignPreview />
        <DesignPreview />
      </div>

      <Link
        to="/edit"
        type='button'
        className='btn w-full max-w-2xl btn-secondary py-6 mt-12 gap-x-2'
      >
        <strong>Continue with this design</strong>
        <IconArrowRight size={22} weight="bold" />
      </Link>
    </div>
  );
}

export function GeneratePage() {
  return (
    <GenerationAppLayout>
      <ConfigSidebar />

      {/* <GenerateDesign /> */}
      <PickDesign />
    </GenerationAppLayout>
  );
}
