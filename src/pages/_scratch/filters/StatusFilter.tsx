import { type Table as TableInstance } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useId, useMemo } from "react";

export function StatusFilter<Item>({ table }: { table: TableInstance<Item> }) {
  const id = useId();

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status");

    if (!statusColumn) return [];

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status");
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("status")?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <FilterIcon
            className='-ms-1 opacity-60'
            size={16}
            aria-hidden='true'
          />
          Status
          {selectedStatuses.length > 0 && (
            <span className='-me-1 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
              {selectedStatuses.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto min-w-36 p-3' align='start'>
        <div className='space-y-3'>
          <div className='text-xs font-medium text-muted-foreground'>
            Filters
          </div>
          <div className='space-y-3'>
            {uniqueStatusValues.map((value, i) => (
              <div key={value} className='flex items-center gap-2'>
                <Checkbox
                  id={`${id}-${i}`}
                  checked={selectedStatuses.includes(value)}
                  onCheckedChange={(checked: boolean) =>
                    handleStatusChange(checked, value)
                  }
                />
                <Label
                  htmlFor={`${id}-${i}`}
                  className='flex grow justify-between gap-2 font-normal'
                >
                  {value}{" "}
                  <span className='ms-2 text-xs text-muted-foreground'>
                    {statusCounts.get(value)}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
