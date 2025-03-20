import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { TopNav } from "./topnav/TopNav";
import { AppSidebar } from "./sidebar/AppSidebar";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus } from "lucide-react";

export function Scratch() {
  return (
    <div className='flex h-full max-h-full w-full max-w-full flex-col [--header-height:theme(spacing.16)]'>
      <TopNav />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='overflow-y-auto'>
          <header className='flex shrink-0 items-center px-4 py-4'>
            <SidebarTrigger className='mr-3 -ml-1' />
            <h2 className='text-xl font-bold tracking-tight'>
              My Designs
            </h2>
          </header>
          <div className="flex-1 flex justify-center items-center">
            <Button>
              <CircleFadingPlus />
              Generate New Design
            </Button>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
