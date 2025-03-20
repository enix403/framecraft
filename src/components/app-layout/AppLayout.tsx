import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { AppTopNav } from "./topnav/AppTopNav";
import { AppSidebar } from "./sidebar/AppSidebar";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

export function AppLayout({
  title,
  titleActions,
  scroll = true,
  children
}: PropsWithChildren & {
  title?: ReactNode;
  titleActions?: ReactNode;
  scroll?: boolean;
}) {
  return (
    <div className='flex h-full max-h-full w-full max-w-full flex-col'>
      <AppTopNav />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className={clsx(scroll && "overflow-y-auto")}>
          <header className='flex shrink-0 items-center px-4 py-4'>
            <SidebarTrigger className='mr-3 -ml-1' />
            <h2 className='text-xl font-bold tracking-tight'>{title}</h2>
            {titleActions && <div className='ml-auto'>{titleActions}</div>}
          </header>
          <div className='px-4'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
