import clsx from "clsx";

import { CheckCircle, Eye as IconEye } from "@phosphor-icons/react";

export function DesignPreview({
  selected = false,
  onSelect
}: {
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button className='group relative cursor-pointer' onClick={onSelect}>
      <div
        className={clsx(
          "absolute -inset-1 rounded-lg bg-linear-to-r from-red-600 to-violet-600 blur-sm transition-all",
          selected ? "opacity-100" : "opacity-25"
        )}
      ></div>
      <div
        className={clsx(
          "relative overflow-hidden rounded-2xl border-4 bg-white",
          selected ? "border-pink-400" : ""
        )}
      >
        <div className='relative bg-black'>
          <img className='h-auto max-w-full' src='/plan1.jpg' alt='' />

          <div
            className={clsx(
              "pointer-events-none absolute inset-0 transition-all",
              selected ? "opacity-100" : "opacity-0"
            )}
          >
            <div className='flex h-full w-full items-center justify-center bg-black/60'>
              <CheckCircle size={84} weight='fill' className='text-[#b4db40]' />
            </div>
          </div>

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
