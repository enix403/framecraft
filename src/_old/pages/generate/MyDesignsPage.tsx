import clsx from "clsx";

import { GenerationAppLayout } from "./layout/GenerationAppLayout";
import { MyDesignCard } from "./common/MyDesignCard";

export function MyDesignsPage() {
  return (
    <GenerationAppLayout>
      <div className='max-h-full flex-1 overflow-y-auto p-10'>
        <div className='mb-12 text-4xl font-semibold'>My Plans</div>

        <div
          className={clsx(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
            "gap-x-6 gap-y-8"
          )}
        >
          <MyDesignCard name='Design 1' />
          <MyDesignCard name='Design 2' />
          <MyDesignCard name='Design 3' />
          <MyDesignCard name='Design 4' />
          <MyDesignCard name='Design 5' />
          <MyDesignCard name='Design 6' />
          <MyDesignCard name='Design 7' />
          <MyDesignCard name='Design 8' />
          <MyDesignCard name='Design 9' />
          <MyDesignCard name='Design 10' />
        </div>
      </div>
    </GenerationAppLayout>
  );
}
