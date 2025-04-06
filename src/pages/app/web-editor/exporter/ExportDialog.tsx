import { PropsWithChildren, useId, useState } from "react";
import { StoreIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { delay } from "@/lib/utils";

const exportStrategies = [
  { id: "dxf", label: "DXF", desc: "For use in AutoCAD softwares" },
  { id: "pdf", label: "PDF", desc: "Best for quick printing and visualization" }
];

export function ExportDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const [strategyId, setStrategyId] = useState(exportStrategies[0].id);
  const [fileName, setFileName] = useState("");

  const strategy = exportStrategies.find(s => s.id === strategyId)!;

  const [loading, setLoading] = useState(false);

  function handleExport() {
    setLoading(true);
    delay(5000)
      .then(() => {
        setOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        if (!open && loading) return;
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div
          className='flex size-11 shrink-0 items-center justify-center rounded-full border'
          aria-hidden='true'
        >
          <StoreIcon className='opacity-80' size={16} />
        </div>

        <DialogHeader>
          <DialogTitle className='text-left'>Export Plan</DialogTitle>
          <DialogDescription className='text-left'>
            Get the plans exported in other formats for importing into other
            compatible softwares
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='space-y-4'>
            {/* Export Type select */}
            <div className='*:not-first:mt-2'>
              <Label>Format</Label>
              <Select
                disabled={loading}
                value={strategyId}
                onValueChange={setStrategyId}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select framework' />
                </SelectTrigger>
                <SelectContent>
                  {exportStrategies.map(({ id, label }) => (
                    <SelectItem value={id} key={id}>
                      <span className='truncate'>{label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className='ps-3 text-sm text-muted-foreground'>
                <strong>{strategy.label}</strong>: {strategy.desc}
              </p>
            </div>
            {/* File name input */}
            <div className='*:not-first:mt-2'>
              <Label>File Name</Label>
              <Input
                type='text'
                placeholder='Enter file name'
                disabled={loading}
                value={fileName}
                onChange={e => setFileName(e.target.value)}
              />
              <p className='text-sm text-muted-foreground'>
                Name of the exported file
              </p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            loading={loading}
            type='button'
            className='w-full'
          >
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
