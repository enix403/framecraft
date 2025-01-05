import { PropsWithChildren } from "react";

import { AppBar } from "~/components/AppBar";

export function GenerationAppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppBar />
      <div className='flex flex-1 max-h-full overflow-hidden'>{children}</div>
    </>
  );
}
