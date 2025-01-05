import clsx from "clsx";

import { Eye as IconEye } from "@phosphor-icons/react";

export function DesignPreview({ selected = false }: { selected?: boolean }) {
  return (
    <button className='relative group cursor-pointer'>
      <div
        className={clsx(
          "absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur",
          selected ? "opacity-100" : "opacity-25"
        )}
      ></div>
      <div
        className={clsx(
          "relative bg-white rounded-2xl border-4 overflow-hidden",
          selected ? "border-pink-400" : ""
        )}
      >
        <div className='relative bg-black'>
          <img className='h-auto max-w-full' src='/plan1.jpg' alt='' />

          {/* <div className='absolute inset-0'>
            <div className='w-full h-full p-2 flex flex-col items-end'>
              <button className='btn btn-circle bg-black/40'>
                <IconEye size={20} />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </button>
  );
}
