import { Stat } from "@/components/Stat";
import { ResizablePanel } from "@/components/ui/resizable";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import {
  nodeTypeToRoomType,
  roomInfoFromNodeType,
  roomTypeIds,
  roomTypes,
  roomTypeToNodeType
} from "../plan/rooms";
import { RectPreview } from "@/components/RectPreview";
import { useSelectedObject } from "../world2d/state/selections";
import { usePlan, useUpdatePlan } from "../PlanProvider";
import { PlanData } from "../plan/plan";
import { DoorOpen } from "lucide-react";

function RoomName({
  room,
  roomIndex
}: {
  room: PlanData["rooms"][number];
  roomIndex: number;
}) {
  const updatePlan = useUpdatePlan();
  const [name, setName] = useState(room.label);

  const [typeId, setTypeId] = useState<string>(nodeTypeToRoomType[room.type]);
  const selectedType = roomTypes[typeId] || null;

  function saveName() {
    updatePlan(plan => {
      plan.rooms[roomIndex].label = name;
    });
  }

  function saveType(typeId: string) {
    updatePlan(plan => {
      plan.rooms[roomIndex].type = roomTypeToNodeType[typeId];
    });
  }

  return (
    <div className='flex rounded-md shadow-xs'>
      <Select
        value={typeId}
        onValueChange={v => {
          setTypeId(v);
          saveType(v);
        }}
      >
        <SelectTrigger className='w-fit rounded-e-none shadow-none'>
          <SelectValue>
            {selectedType && (
              <selectedType.Icon
                size={18}
                color={selectedType.color}
                strokeWidth={3}
              />
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0'>
          <SelectGroup>
            <SelectLabel>Select Room Type</SelectLabel>

            {roomTypeIds.map(roomTypeId => {
              const typeInfo = roomTypes[roomTypeId];
              return (
                <SelectItem key={roomTypeId} value={roomTypeId}>
                  <typeInfo.Icon size={16} color={typeInfo.color} />
                  <span className='truncate'>{typeInfo.title}</span>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className='-ms-px rounded-s-none shadow-none focus-visible:z-10'
        placeholder='Room Name'
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        onBlur={saveName}
      />
    </div>
  );
}

export function RoomDetails() {
  const plan = usePlan();
  const [selectedObj] = useSelectedObject();

  const room = selectedObj ? plan.rooms[selectedObj.index] : null;

  return (
    <div className='h-full p-4'>
      {room ? (
        <>
          <h2 className='mb-2 font-semibold'>Room Details</h2>

          <RoomName key={room.id} room={room} roomIndex={selectedObj!.index} />

          <RectPreview
            className='mt-6 mb-6'
            rectangles={room.rects.map(([r, c, w, h]) => ({
              left: c,
              top: r,
              width: w,
              height: h
            }))}
            fillColor='#843cd655'
            outStrokeColor='#843cd6'
          />

          <Stat label='Length' value='32 ft.' />
          <Stat label='Width' value='26 ft.' />
          <Stat label='Area' value='832 ft. sq' />
        </>
      ) : (
        <div className='flex h-full max-h-[34rem] flex-col items-center justify-center px-3'>
          <DoorOpen
            className='h-auto w-full max-w-52 text-muted-foreground opacity-40'
            strokeWidth={1}
          />
          <p className='mt-2 font-medium text-center leading-[1.2] text-muted-foreground/70'>
            Select a room to inspect
          </p>
        </div>
      )}
    </div>
  );
}
