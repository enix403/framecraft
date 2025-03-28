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
import { VoidCallback } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";

export function ConfirmDialog({
  title = "Are you absolutely sure?",
  subtitle = "This action cannot be undone.",
  actionButton = "Delete",
  onConfirm,
  children
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  actionButton?: ReactNode;
  onConfirm?: VoidCallback;
} & PropsWithChildren) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className='flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4'>
          <div
            className='flex size-9 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <CircleAlertIcon className='opacity-80' size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{subtitle}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {actionButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
