import clsx from "clsx";
import { PropsWithChildren } from "react";

import { AppBar } from "~/components/AppBar";

export function GenerationAppLayout({
  children,
  allowScroll = false
}: PropsWithChildren & {
  allowScroll?: boolean;
}) {
  return (
    <>
      <AppBar />
      <div
        className={clsx(
          "flex max-h-full flex-1",
          allowScroll
            ? "gap-y-6 overflow-y-auto max-lg:flex-col"
            : "overflow-hidden"
        )}
      >
        {children}
      </div>
    </>
  );
}
