import { Link } from "react-router";
import { GenerationAppLayout } from "./layout/GenerationAppLayout";

import { ArrowLeft as IconArrowLeft } from "@phosphor-icons/react";

export function ViewRenderPage() {
  return (
    <GenerationAppLayout allowScroll>
      <div className='flex max-h-full flex-1 items-center justify-center'>
        <img src='/render1.jpg' className='h-full w-full object-cover' />
      </div>
      <div className='bg-backgroundSecondary flex w-full shrink-0 flex-col gap-6 p-8 max-lg:pb-44 lg:max-w-sm'>
        <Link
          to='/edit'
          type='button'
          className='btn btn-solid w-full gap-x-2 py-6'
        >
          <IconArrowLeft />
          Go Back
        </Link>
      </div>
    </GenerationAppLayout>
  );
}
