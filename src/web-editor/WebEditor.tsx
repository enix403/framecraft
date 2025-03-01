import { Button } from "@/components/ui/button";

import { ChevronDownIcon, Sparkle } from "lucide-react";

export function WebEditor() {
  return (
    <div className='flex items-center border-b px-2 py-4'>
      <Button variant='secondary' className='h-auto w-auto py-3'>
        <Sparkle className='!h-5 !w-5' />
        <ChevronDownIcon className='opacity-60' aria-hidden='true' />
      </Button>

      <Button variant='ghost' className='ml-4 py-6'>
        <p className='max-w-40 overflow-hidden text-ellipsis'>
          <span className="text-gray-500">Projects / </span>
          My Plan 1
        </p>
        <ChevronDownIcon
          className='-me-1 opacity-60'
          size={16}
          aria-hidden='true'
        />
      </Button>
    </div>
  );
}
