import { type Table as TableInstance } from "@tanstack/react-table";
import { CircleAlertIcon, TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { VoidCallback } from "@/lib/utils";

export function DeleteRowsButton<Item>({
  table,
  handleDeleteRows
}: {
  table: TableInstance<Item>;
  handleDeleteRows?: VoidCallback;
}) {
  return (
    <>
      {table.getSelectedRowModel().rows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='ml-auto' variant='outline'>
              <TrashIcon
                className='-ms-1 opacity-60'
                size={16}
                aria-hidden='true'
              />
              Delete
              <span className='-me-1 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
                {table.getSelectedRowModel().rows.length}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className='flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4'>
              <div
                className='flex size-9 shrink-0 items-center justify-center rounded-full border'
                aria-hidden='true'
              >
                <CircleAlertIcon className='opacity-80' size={16} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {table.getSelectedRowModel().rows.length} selected{" "}
                  {table.getSelectedRowModel().rows.length === 1
                    ? "row"
                    : "rows"}
                  .
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteRows}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
