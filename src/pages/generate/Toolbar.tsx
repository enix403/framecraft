import { RoomIdentityInput } from "@/components/RoomIdentityInput";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Redo, Undo } from "lucide-react";

export function Toolbar() {
  return (
    <nav className='flex gap-x-2 border-b px-4 py-2'>
      <div className='flex-1 items-center'>
        <RoomIdentityInput
          initialName={"Living Room 1"}
          initialNodeType={0}
          onUpdateName={name => {}}
          onUpdateNodeType={type => {}}
          className='max-w-lg'
        />
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
