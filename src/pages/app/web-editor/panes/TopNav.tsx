import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { atom, useAtom } from "jotai";

import {
  Box,
  ChevronDownIcon,
  Map,
  Settings,
  Sparkle,
  Waypoints
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { LogOutIcon, PinIcon } from "lucide-react";
import { Link } from "react-router";
import { AvatarDropdown } from "@/components/topnav/AvatarDropdown";
import { Separator } from "@/components/ui/separator";
import { usePlan, useSetPlan } from "../plan-state";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { apiRoutes } from "@/lib/api-routes";
import { produce } from "immer";

export const activeTabAtom = atom<"layout" | "2d" | "3d">("2d");

function PlanNameDropdown() {
  const queryClient = useQueryClient();

  const plan = usePlan();
  const setPlan = useSetPlan();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(plan.name);
  }, [plan]);

  useEffect(() => {
    if (open) setName(plan.name);
  }, [open]);

  const updateNameMut = useMutation({
    mutationFn: async () => {
      return apiRoutes.updatePlan({ name }, plan.id);
    },
    onSuccess: () => {
      // Update the main list
      queryClient.invalidateQueries({ queryKey: ["plan", "list"] });
      // Invalidate cache so that if a refetch happens in the future it
      // gets fetches the latest data.
      queryClient.invalidateQueries({ queryKey: ["plan", plan.id] });

      // update the name localy
      setPlan(plan => ({
        ...plan,
        name: name
      }));

      toast.success("Name updated successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to update name");
    }
  });

  function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name) {
      toast.error("Enter a valid name");
      return;
    }

    updateNameMut.mutate();
  }

  return (
    <>
      <Popover
        open={open}
        onOpenChange={open => {
          // If trying to close the popover while the mutation is
          // running, stop the user
          if (!open && updateNameMut.isPending) return;
          setOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant='ghost' className='py-4'>
            <p className='max-w-40 overflow-hidden text-ellipsis'>
              <span className='text-gray-500'>Plans / </span>
              {plan.name}
            </p>
            <ChevronDownIcon
              className='-me-1 opacity-60'
              size={16}
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-72'>
          <h2 className='mb-2 text-sm font-semibold'>Change Plan Name</h2>
          <form onSubmit={handleUpdate} className='space-y-3'>
            <Input
              disabled={updateNameMut.isPending}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Enter name'
            />
            <div className='flex flex-col sm:flex-row sm:justify-end'>
              <Button
                type='submit'
                disabled={plan.name == name}
                loading={updateNameMut.isPending}
              >
                Update
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}

export function TopNav() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <nav className='flex border-b px-4 py-4'>
      <div className='flex flex-1 items-center'>
        <PlanNameDropdown />
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <ToggleGroup
          variant='outline'
          size='lg'
          className='inline-flex'
          type='single'
          value={activeTab}
          onValueChange={setActiveTab as any}
        >
          <ToggleGroupItem value='layout'>
            Layout Graph <Waypoints />
          </ToggleGroupItem>
          <ToggleGroupItem value='2d'>
            2D View <Map />
          </ToggleGroupItem>
          <ToggleGroupItem value='3d'>
            3D View <Box />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='flex flex-1 items-center justify-end'>
        <Button size='lg' className='mr-2'>
          Export
        </Button>
        <Button variant='outline' size='icon' className='mr-0.5'>
          <Settings />
        </Button>
        <Separator orientation='vertical' className='mx-3 !h-6 bg-[#d8dae2]' />
        <AvatarDropdown />
      </div>
    </nav>
  );
}
