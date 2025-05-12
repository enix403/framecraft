import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";
import { sendEditorCommand } from "../state/commands";
import { ComponentProps } from "react";

export function RecenterButton({ ...props }: ComponentProps<"button">) {
  return (
    <Button
      {...props}
      onClick={() => {
        sendEditorCommand({ type: "recenter" });
      }}
      size='icon'
      className='rounded-full bg-background p-7 text-foreground shadow-2xl shadow-background hover:bg-accent/90 active:bg-accent/70'
    >
      <LocateFixed className='size-7' />
    </Button>
  );
}
