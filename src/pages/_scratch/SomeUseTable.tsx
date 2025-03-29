import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
  InfoIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { SomeDataTable } from "./SomeDataTable";
import { TextFilter } from "./filters/TextFilter";
import {
  uniqueFilterFn,
  UniqueValuesFilter
} from "./filters/UniqueValuesFilter";
import { ColumnVisibilityControl } from "./filters/ColumnVisibilityControl";
import { DeleteRowsButton } from "./filters/DeleteRowsButton";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "./filters/ConfirmDialog";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/lib/api-routes";

// type Item = {
//   id: string;
//   name: string;
//   email: string;
//   location: string;
//   flag: string;
//   status: "Active" | "Inactive" | "Pending";
//   balance: number;
//   note?: string;
// };

type Item = Record<string, any>;

const columns: ColumnDef<Item>[] = [
  {
    header: "Name",
    accessorKey: "fullName",
    cell: ({ row }) => (
      // <div className="font-medium">{row.getValue("name")}</div>
      <div className='flex items-center gap-3'>
        <img
          className='rounded-full'
          src={
            "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg"
          }
          width={40}
          height={40}
          alt={"User"}
        />
        <div>
          <div className='font-medium'>{row.original.fullName}</div>
          {/* <span className='mt-0.5 text-xs text-muted-foreground'>
            @alexthompson
          </span> */}
        </div>
      </div>
    ),
    size: 100,
    enableHiding: false,
    filterFn: (row, columnId, filterValue) => {
      const searchableRowContent =
        `${row.original.name} ${row.original.email}`.toLowerCase();
      const searchTerm = (filterValue ?? "").toLowerCase();
      return searchableRowContent.includes(searchTerm);
    }
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 100
    // size: 220
  },
  {
    header: "Role",
    accessorKey: "role",
    size: 40,
    cell: ({ row }) => {
      let role = row.getValue("role") as any;

      const styles = {
        admin: "bg-emerald-400/20 text-emerald-500",
        user: "bg-amber-400/20 text-amber-500"
      }[role];

      return (
        <div
          className={cn(
            "inline-flex items-center justify-center rounded px-2.5 py-1 font-medium",
            "capitalize",
            styles
          )}
        >
          {role}
        </div>
      );
    },
    filterFn: uniqueFilterFn()
  },
  {
    header: "Gender",
    accessorKey: "gender",
    size: 40,
    cell: ({ row }) => {
      let gender = row.getValue("gender") as any;
      return <span className='capitalize'>{gender}</span>;
    },
    filterFn: uniqueFilterFn()
  },
  {
    header: "Address",
    accessorKey: "address",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className='truncate text-ellipsis'>
          {`${user.addressArea || ""}, ${user.addressCity || ""}, ${user.addressCountry || ""}, ${user.addressZip || ""}`.trim()}
        </div>
      );
    },
    size: 200
  }
];

export function SomeUseTable() {
  const { data = [] } = useQuery({
    queryKey: ["users", "list"],
    queryFn: () => apiRoutes.getUsers()
  });

  return (
    <SomeDataTable
      data={data}
      columns={columns}
      initialSort={[
        {
          id: "fullName",
          desc: false
        }
      ]}
      enableRowSelect
      renderFilters={({ table }) => (
        <>
          <div className='flex items-center gap-3'>
            <TextFilter
              table={table}
              columnName='fullName'
              placeholder='Filter by name or email...'
            />
            <UniqueValuesFilter table={table} columnName='role' />
            <ColumnVisibilityControl table={table} />
          </div>
          {table.getSelectedRowModel().rows.length > 0 && (
            <div className='ml-auto'>
              <DeleteRowsButton
                table={table}
                onDelete={() => {
                  table.resetRowSelection();
                }}
              />
            </div>
          )}
        </>
      )}
      // enableRowExpand
      // canRowExpand={row => Boolean(row.original.note)}
      /* renderExpandedRow={row => (
        <div className='flex max-w-full items-start py-2 text-primary/80'>
          <span
            className='me-3 mt-0.5 flex w-7 shrink-0 justify-center'
            aria-hidden='true'
          >
            <InfoIcon className='opacity-60' size={16} />
          </span>
          <p className='flex-1-fix text-sm text-wrap'>{row.original.note}</p>
        </div>
      )} */
      renderActions={() => (
        <>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Edit</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Duplicate</span>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Archive</span>
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Move to project</DropdownMenuItem>
                  <DropdownMenuItem>Move to folder</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Advanced options</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Add to favorites</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ConfirmDialog>
            <DropdownMenuItem
              // Important
              onSelect={e => e.preventDefault()}
              className='text-destructive focus:text-destructive'
            >
              <span>Delete</span>
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </ConfirmDialog>
        </>
      )}
    />
  );
}
