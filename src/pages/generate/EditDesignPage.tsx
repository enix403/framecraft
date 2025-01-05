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
    <GenerationAppLayout>
      <div className='max-h-full flex items-center justify-center flex-1'>
        <img src='/plan2.jpg' className='h-[700px]' />
      </div>
      <div className='flex w-full max-w-sm flex-col gap-6 bg-backgroundSecondary p-8 shrink-0'>
        <div className='flex gap-4'>
          {/* Length */}
          <div className='form-control relative flex-1'>
            <span className='absolute inset-y-0 left-4 inline-flex items-center text-content3'>
              <IconPencilLine size={18} weight='bold' />
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
          className='btn w-full max-w-2xl btn-secondary py-6 gap-x-2'
        >
          <IconPackage size={22} weight='bold' />
          <strong>Export</strong>
        </button>
        <Link
          to='/render'
          type='button'
          className='btn w-full max-w-2xl btn-success py-6 gap-x-2'
        >
          <IconSphere size={22} weight='bold' />
          <strong>Render 3D Model</strong>
        </Link>
        <Link
          to='/generate'
          type='button'
          className='btn w-full max-w-2xl btn-solid-error py-6 gap-x-2 mt-auto'
        >
          <IconArrowLeft size={22} weight='bold' />
          Discard and go back
        </Link>
      </div>
    </GenerationAppLayout>
  );
}
