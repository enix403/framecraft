import clsx from "clsx";
import { PropsWithChildren } from "react";

import { AppBar } from "~/components/AppBar";

export function GenerationAppLayout({
  children,
  allowScroll = false,
}: PropsWithChildren & {
  allowScroll?: boolean;
}) {
  return (
    <>
      <AppBar />
      <div
        className={clsx(
          "flex flex-1 max-h-full",
          allowScroll ? "overflow-y-auto max-lg:flex-col gap-y-6" : "overflow-hidden"
        )}
      >
        {children}
      </div>
    </>
  );
}
