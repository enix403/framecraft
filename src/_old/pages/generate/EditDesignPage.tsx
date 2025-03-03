import { Link } from "react-router";
import { GenerationAppLayout } from "./layout/GenerationAppLayout";

import {
  ArrowLeft as IconArrowLeft,
  Package as IconPackage,
  PencilLine as IconPencilLine,
  Sphere as IconSphere
} from "@phosphor-icons/react";

export function EditDesignPage() {
  return (
    <GenerationAppLayout allowScroll>
      <div className='flex max-h-full flex-1 items-center justify-center'>
        <img src='/plan2.jpg' className='h-[700px]' />
      </div>
      <div className='bg-backgroundSecondary flex w-full shrink-0 flex-col gap-6 p-8 max-lg:pb-44 lg:max-w-sm'>
        <div className='flex gap-4'>
          {/* Length */}
          <div className='form-control relative flex-1'>
            <span className='text-content3 absolute inset-y-0 left-4 inline-flex items-center'>
              <IconPencilLine size={18} />
            </span>
            <input
              className='input w-full max-w-full px-10'
              placeholder='Name'
              defaultValue='Design 1'
            />
          </div>
          <button type='button' className='btn btn-solid-warning gap-x-2'>
            <strong>Save</strong>
          </button>
        </div>
        <div className='flex w-full overflow-x-auto'>
          <table className='table-compact table-zebra table max-w-full'>
            <thead>
              <tr>
                <th>Room</th>
                <th>Length</th>
                <th>Width</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Living Room</th>
                <td>10 ft</td>
                <td>12 ft</td>
              </tr>
              <tr>
                <th>Bedroom 1</th>
                <td>10 ft</td>
                <td>12 ft</td>
              </tr>
              <tr>
                <th>Bedroom 2</th>
                <td>10 ft</td>
                <td>12 ft</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type='button' className='btn btn-secondary w-full gap-x-2 py-6'>
          <IconPackage />
          <strong>Export</strong>
        </button>
        <Link
          to='/render'
          type='button'
          className='btn btn-success w-full gap-x-2 py-6'
        >
          <IconSphere />
          <strong>Render 3D Model</strong>
        </Link>
        <Link
          to='/generate/pick'
          type='button'
          className='btn btn-solid-error mt-auto w-full gap-x-2 py-6'
        >
          <IconArrowLeft />
          Discard and go back
        </Link>
      </div>
    </GenerationAppLayout>
  );
}
