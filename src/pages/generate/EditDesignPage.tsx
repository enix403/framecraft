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
      <div className='max-h-full flex items-center justify-center flex-1'>
        <img src='/plan2.jpg' className='h-[700px]' />
      </div>
      <div className='flex w-full lg:max-w-sm flex-col gap-6 bg-backgroundSecondary p-8 shrink-0 max-lg:pb-44'>
        <div className='flex gap-4'>
          {/* Length */}
          <div className='form-control relative flex-1'>
            <span className='absolute inset-y-0 left-4 inline-flex items-center text-content3'>
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
          <table className='table table-compact table-zebra max-w-full'>
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
        <button
          type='button'
          className='btn w-full btn-secondary py-6 gap-x-2'
        >
          <IconPackage />
          <strong>Export</strong>
        </button>
        <Link
          to='/render'
          type='button'
          className='btn w-full btn-success py-6 gap-x-2'
        >
          <IconSphere />
          <strong>Render 3D Model</strong>
        </Link>
        <Link
          to='/generate/pick'
          type='button'
          className='btn w-full btn-solid-error py-6 gap-x-2 mt-auto'
        >
          <IconArrowLeft />
          Discard and go back
        </Link>
      </div>
    </GenerationAppLayout>
  );
}
