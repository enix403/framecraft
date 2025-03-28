"use client";

import {
  CSSProperties,
  Fragment,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  InfoIcon,
  ListFilterIcon,
  PinOffIcon,
  PlusIcon,
  TrashIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
  type TableOptions,
  type Table as TableInstance,
  getFacetedRowModel
} from "@tanstack/react-table";
import { getFacetedMinMaxValues } from "@tanstack/react-table";
import { TextFilter } from "./filters/TextFilter";

export function SomeDataTable<Item>({
  data,
  columns,
  canRowExpand,
  renderExpandedRow
}: {
  data: Item[];
  columns: ColumnDef<Item>[];
  canRowExpand?: (row: Row<Item>) => boolean;
  renderExpandedRow?: (row: Row<Item>) => ReactNode;
}) {
  /* ========= Sorting ========= */
  const [sorting, setSorting] = useState<SortingState>([]);

  /* ========= Pagination ========= */
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  /* =============================== */
  /* ============ Apply ============ */
  /* =============================== */
  const table = useReactTable({
    data,
    columns,

    // Core
    getCoreRowModel: getCoreRowModel(),
    // Sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    // row collapse/expand
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: row => canRowExpand?.(row) ?? false,
    // Pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    // Filtering
    // getFilteredRowModel: getFilteredRowModel(),
    // Faceting
    // getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedMinMaxValues: getFacetedMinMaxValues(),

    // onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      pagination
      // columnFilters,
      // columnVisibility
    }
  });

  return (
    <div className='space-y-4'>
      {/* Filters */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <TextFilter
            table={table}
            columnName='name'
            placeholder='Filter by name or email...'
          />
        </div>
      </div>

      {/* Table */}
      <InnerTable
        table={table}
        renderExpandedRow={renderExpandedRow}
        columns={columns}
      />

      {/* Pagination */}
      <PaginationControls table={table} />
    </div>
  );
}

function InnerTable<Item>({
  table,
  renderExpandedRow,
  columns
}: {
  table: TableInstance<Item>;
  renderExpandedRow?: (row: Row<Item>) => ReactNode;
  columns: ColumnDef<Item>[];
}) {
  return (
    <div className='overflow-hidden rounded-md border bg-background'>
      <Table className='table-fixed'>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className='bg-muted/50'>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className='h-11'
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={e => {
                          // Enhanced keyboard handling for sorting
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUpIcon
                              className='shrink-0 opacity-60'
                              size={16}
                              aria-hidden='true'
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className='shrink-0 opacity-60'
                              size={16}
                              aria-hidden='true'
                            />
                          )
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='last:py-0'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {renderExpandedRow && row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                      <div className='flex max-w-full'>
                        {renderExpandedRow?.(row)}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function PaginationControls<Item>({ table }: { table: TableInstance<Item> }) {
  const id = useId();

  return (
    <div className='flex items-center justify-between gap-8'>
      {/* Results per page */}
      <div className='flex items-center gap-3'>
        <Label htmlFor={id} className='max-sm:sr-only'>
          Rows per page
        </Label>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={value => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger id={id} className='w-fit whitespace-nowrap'>
            <SelectValue placeholder='Select number of results' />
          </SelectTrigger>
          <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2'>
            {[5, 10, 25, 50].map(pageSize => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Page number information */}
      <div className='flex grow justify-end text-sm whitespace-nowrap text-muted-foreground'>
        <p
          className='text-sm whitespace-nowrap text-muted-foreground'
          aria-live='polite'
        >
          <span className='text-foreground'>
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{" "}
          of{" "}
          <span className='text-foreground'>
            {table.getRowCount().toString()}
          </span>
        </p>
      </div>

      {/* Pagination buttons */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* First page button */}
            <PaginationItem>
              <Button
                size='icon'
                variant='outline'
                className='disabled:pointer-events-none disabled:opacity-50'
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label='Go to first page'
              >
                <ChevronFirstIcon size={16} aria-hidden='true' />
              </Button>
            </PaginationItem>
            {/* Previous page button */}
            <PaginationItem>
              <Button
                size='icon'
                variant='outline'
                className='disabled:pointer-events-none disabled:opacity-50'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label='Go to previous page'
              >
                <ChevronLeftIcon size={16} aria-hidden='true' />
              </Button>
            </PaginationItem>
            {/* Next page button */}
            <PaginationItem>
              <Button
                size='icon'
                variant='outline'
                className='disabled:pointer-events-none disabled:opacity-50'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label='Go to next page'
              >
                <ChevronRightIcon size={16} aria-hidden='true' />
              </Button>
            </PaginationItem>
            {/* Last page button */}
            <PaginationItem>
              <Button
                size='icon'
                variant='outline'
                className='disabled:pointer-events-none disabled:opacity-50'
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                aria-label='Go to last page'
              >
                <ChevronLastIcon size={16} aria-hidden='true' />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
