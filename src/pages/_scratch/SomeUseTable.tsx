import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

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

type Item = {
  id: string;
  name: string;
  email: string;
  location: string;
  flag: string;
  status: "Active" | "Inactive" | "Pending";
  balance: number;
  note?: string;
};

const columns: ColumnDef<Item>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          {...{
            className: "size-7 ml-1 shadow-none text-muted-foreground",
            onClick: row.getToggleExpandedHandler(),
            "aria-expanded": row.getIsExpanded(),
            "aria-label": row.getIsExpanded()
              ? `Collapse details for ${row.original.name}`
              : `Expand details for ${row.original.name}`,
            size: "icon",
            variant: "ghost"
          }}
        >
          {row.getIsExpanded() ? (
            <ChevronUpIcon
              className='opacity-60'
              size={16}
              aria-hidden='true'
            />
          ) : (
            <ChevronDownIcon
              className='opacity-60'
              size={16}
              aria-hidden='true'
            />
          )}
        </Button>
      ) : undefined;
    },
    size: 10,
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className='pl-2'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='pl-2'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false
  },
  {
    header: "Name",
    accessorKey: "name",
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
          <div className='font-medium'>{row.getValue("name")}</div>
          <span className='mt-0.5 text-xs text-muted-foreground'>
            @alexthompson
          </span>
        </div>
      </div>
    ),
    size: 180,
    enableHiding: false,
    // Filter on both name and email
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
    size: 220
  },
  {
    header: "Location",
    accessorKey: "location",
    cell: ({ row }) => (
      <div>
        <span className='text-lg leading-none'>{row.original.flag}</span>{" "}
        {row.getValue("location")}
      </div>
    ),
    size: 180
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("status") === "Inactive" &&
            "bg-muted-foreground/60 text-primary-foreground"
        )}
      >
        {row.getValue("status")}
      </Badge>
    ),
    size: 100,
    filterFn: uniqueFilterFn()
  },
  {
    header: "Performance",
    accessorKey: "performance",
    filterFn: uniqueFilterFn()
  },
  {
    header: "Balance",
    accessorKey: "balance",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
      return formatted;
    },
    size: 120
  }
  // {
  //   id: "actions",
  //   header: () => <span className='sr-only'>Actions</span>,
  //   cell: ({ row }) => <RowActions row={row} />,
  //   size: 60,
  //   enableHiding: false
  // }
];

export function SomeUseTable() {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://res.cloudinary.com/dlzlfasou/raw/upload/users-01_fertyx.json"
      );
      const data = await res.json();
      setData(data);
    }
    fetchPosts();
  }, []);

  return (
    <SomeDataTable
      data={data}
      columns={columns}
      renderFilters={({ table }) => (
        <div className='flex items-center gap-3'>
          <TextFilter
            table={table}
            columnName='name'
            placeholder='Filter by name or email...'
          />
          <UniqueValuesFilter table={table} columnName='performance' />
          <ColumnVisibilityControl table={table} />
        </div>
      )}
    />
  );
}
