import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon, InfoIcon } from "lucide-react";

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
      enableRowSelect
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
      canRowExpand={row => Boolean(row.original.note)}
      renderExpandedRow={row => (
        <div className='flex max-w-full items-start py-2 text-primary/80'>
          <span
            className='me-3 mt-0.5 flex w-7 shrink-0 justify-center'
            aria-hidden='true'
          >
            <InfoIcon className='opacity-60' size={16} />
          </span>
          <p className='flex-1-fix text-sm text-wrap'>{row.original.note}</p>
        </div>
      )}
    />
  );
}
