import { RoomIdentityInput } from "@/components/RoomIdentityInput";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Info, MessageSquareWarning, Redo, Undo } from "lucide-react";

export function Toolbar() {
  return (
    <nav className='flex gap-x-2 border-b px-4 py-2'>
      <div className='flex flex-1 items-center'>
        {/* <RoomIdentityInput
          initialName={"Living Room 1"}
          initialNodeType={0}
          onUpdateName={name => {}}
          onUpdateNodeType={type => {}}
          className='flex-1 max-w-lg'
        /> */}

        <p className='flex items-center flex-1-x gap-x-2 text-muted-foreground/70'>
          <Info className="shrink-0" />
          <span className='font-medium tracking-tight'>
            Select a node in the editor to inspect
          </span>
        </p>
      </div>
      <div className='flex items-center justify-end'>
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
