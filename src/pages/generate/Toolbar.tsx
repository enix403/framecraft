import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Redo, Undo, WandSparkles } from "lucide-react";

export function Toolbar() {
  return (
    <nav className='flex border-b px-4 py-2'>
      <div className='flex flex-1 items-center gap-x-1'>

      </div>
      <div className='flex flex-1 items-center justify-end'>
        <TooltipWrapper tip='Undo'>
          <Button size='icon' variant='ghost'>
            <Undo size={20} />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper tip='Redo'>
          <Button size='icon' variant='ghost'>
            <Redo size={20} />
          </Button>
        </TooltipWrapper>
      </div>
    </nav>
  );
}
