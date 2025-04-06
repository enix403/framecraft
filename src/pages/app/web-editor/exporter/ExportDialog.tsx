import { PropsWithChildren, useEffect, useId, useState } from "react";
import { DownloadIcon, StoreIcon } from "lucide-react";

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
import { ExportStrategy } from "./ExportStrategy";
import { DXFExportStrategy } from "./DXFExportStrategy";
import { usePlan } from "../plan-state";

type ExportStrategyOption = {
  id: string;
  label: string;
  strategy: ExportStrategy;
  desc: string;
};

const exportStrategies: ExportStrategyOption[] = [
  {
    id: "dxf",
    strategy: new DXFExportStrategy(),
    label: "DXF",
    desc: "For use in AutoCAD softwares"
  },
  {
    id: "pdf",
    strategy: new DXFExportStrategy(),
    label: "PDF",
    desc: "Best for quick printing and visualization"
  }
];

export function ExportDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const [strategyId, setStrategyId] = useState(exportStrategies[0].id);
  const strategyOption = exportStrategies.find(s => s.id === strategyId)!;

  const plan = usePlan();
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setFileName(plan.name);
  }, [plan]);

  useEffect(() => {
    if (open) setFileName(plan.name);
  }, [open]);

  const [loading, setLoading] = useState(false);

  function handleExport() {
    setLoading(true);
    strategyOption.strategy
      .exportPlan(plan, fileName)
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
        <div className='flex flex-col items-center space-y-4'>
          <div
            className='flex size-11 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <DownloadIcon className='opacity-80' size={16} />
          </div>

          <DialogHeader>
            <DialogTitle className='text-center'>Export Plan</DialogTitle>
            <DialogDescription className='text-center'>
              Take your plan anywhere in standard formats.
            </DialogDescription>
          </DialogHeader>
        </div>

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
                <strong>{strategyOption.label}</strong>: {strategyOption.desc}
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
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
