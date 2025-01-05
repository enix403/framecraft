import { Sparkle as IconSparkle } from "@phosphor-icons/react";
import { KeyboardEvent } from "react";
import { Link } from "react-router";
import { OptionsBar } from "~/components/OptionsBar";

/* function validateNumKey(event: KeyboardEvent<HTMLInputElement>) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
} */

export function ConfigSidebar() {
  return (
    <div className='flex w-full max-w-sm flex-col gap-6 bg-backgroundSecondary p-8 shrink-0'>
      {/* Plot Dimension s*/}
      <div>
        <label className='form-label mb-2'>Plot Dimensions</label>
        <div className='flex gap-4'>
          {/* Length */}
          <div className='form-control relative w-full'>
            <input
              className='input input-lg max-w-full'
              placeholder='Length'
              // onInput={validateNumKey}
            />
            <span className='absolute inset-y-0 right-4 inline-flex items-center text-content3'>
              (in)
            </span>
          </div>
          {/* Width */}
          <div className='form-control relative w-full'>
            <input
              className='input input-lg max-w-full'
              placeholder='Width'
              // onKeyDown={validateNumKey}
            />
            <span className='absolute inset-y-0 right-4 inline-flex items-center text-content3'>
              (in)
            </span>
          </div>
        </div>
      </div>
      {/* Number of rooms */}
      <div>
        <label className='form-label mb-2'>Rooms Count</label>
        <input
          className='input input-lg max-w-full'
          placeholder='Number of rooms'
          // onKeyDown={validateNumKey}
        />
      </div>
      <div>
        <label className='form-label mb-2'>Generation Mode</label>
        <div className='flex mt-2 gap-x-2'>
          <OptionsBar options={["Quality", "Fast"]} defaultSelected='Quality' />
        </div>
      </div>
      <div>
        <label className='form-label mb-2'>Number of maps</label>
        <div className='flex mt-2 gap-x-2'>
          <OptionsBar
            options={["1", "2", "3", "4", "5", "6"]}
            defaultSelected='1'
          />
        </div>
      </div>
      <Link
        to='/generate/pick'
        type='button'
        className='btn w-full bg-gradient-to-r py-6 from-pink-600 to-blue-500 mt-8 gap-x-2'
      >
        <IconSparkle size={24} weight='fill' />
        <strong className='text-white text-[1.01rem]'>Generate</strong>
      </Link>
    </div>
  );
}
