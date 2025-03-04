import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";
import { sendEditorCommand } from "../state/commands";

export function RecenterButton() {
  return (
    <Button
      onClick={() => {
        sendEditorCommand({ type: "recenter" });
      }}
      size='icon'
      className='rounded-full bg-white p-4 text-black shadow-2xl shadow-black hover:bg-accent/90 active:bg-accent/70'
    >
      <LocateFixed size={30} />
    </Button>
  );
}
