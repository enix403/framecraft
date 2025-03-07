import { WandSparkles } from "lucide-react";
import { GeneralSettings } from "./GeneralSettings";
import { Button } from "@/components/ui/button";

function LayoutGraphHeading() {
  return (
    <nav className='flex items-center justify-between border-b px-4 py-2'>
      <p className='text-xl font-bold tracking-tight'>Plan Layout Graph</p>
      <Button variant="ghost" className='text-blue-600 flex items-center gap-x-2'>
        <WandSparkles size={20} />
        Use Auto Layout
      </Button>
    </nav>
  );
}

export function GenerateDesign() {
  return (
    <div className='flex h-full max-h-full overflow-hidden'>
      <div className='w-sm border-r-2 p-4'>
        <GeneralSettings />
      </div>
      <div className='flex flex-1-fix flex-col'>
        <LayoutGraphHeading />
      </div>
    </div>
  );
}
