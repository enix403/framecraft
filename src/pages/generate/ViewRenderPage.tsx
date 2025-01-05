import { Link } from "react-router";
import { GenerationAppLayout } from "./layout/GenerationAppLayout";

import { ArrowLeft as IconArrowLeft } from "@phosphor-icons/react";

export function ViewRenderPage() {
  return (
    <GenerationAppLayout>
      <div className='max-h-full flex items-center justify-center flex-1'>
        <img src='/render1.jpg' className='w-full h-full' />
      </div>
      <div className='flex w-full max-w-sm flex-col gap-6 bg-backgroundSecondary p-8 shrink-0'>
        <Link
          to='/edit'
          type='button'
          className='btn w-full max-w-2xl btn-solid py-6 gap-x-2'
        >
          <IconArrowLeft />
          Go Back
        </Link>
      </div>
    </GenerationAppLayout>
  );
}
