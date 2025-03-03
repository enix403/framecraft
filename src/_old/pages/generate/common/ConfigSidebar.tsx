import { Sparkle as IconSparkle } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { OptionsBar } from "~/components/OptionsBar";

/* function validateNumKey(event: KeyboardEvent<HTMLInputElement>) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
} */

export function ConfigSidebar() {
  const location = useLocation();

  const isPickStage = location.pathname.includes("generate/pick");
  const isGenerateStage = !isPickStage;

  return (
    <motion.div
      className={clsx(
        "bg-backgroundSecondary w-full shrink-0 flex-col gap-6 overflow-hidden p-8",
        "lg:max-w-sm",
        isPickStage ? "hidden lg:flex" : "flex"
      )}
    >
      <h2 className='text-lg font-bold'>Generate New Design</h2>
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
            <span className='text-content3 absolute inset-y-0 right-4 inline-flex items-center'>
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
            <span className='text-content3 absolute inset-y-0 right-4 inline-flex items-center'>
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
        <div className='mt-2 flex gap-x-2'>
          <OptionsBar options={["Quality", "Fast"]} defaultSelected='Quality' />
        </div>
      </div>
      <div>
        <label className='form-label mb-2'>Number of maps</label>
        <div className='mt-2 flex gap-x-2'>
          <OptionsBar
            options={["1", "2", "3", "4", "5", "6"]}
            defaultSelected='1'
          />
        </div>
      </div>
      <Link
        to='/generate/pick'
        type='button'
        className='btn mt-8 w-full gap-x-2 bg-linear-to-r from-pink-600 to-blue-500 py-6'
      >
        <IconSparkle size={24} weight='fill' />
        <strong className='text-[1.01rem] text-white'>Generate</strong>
      </Link>
    </motion.div>
  );
}
