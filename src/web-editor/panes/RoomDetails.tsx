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
import { useState } from "react";

import { roomTypeIds, roomTypes } from "../plan/rooms";
import { RectPreview } from "@/components/RectPreview";

function RoomName() {
  const [selectedId, setSelectedId] = useState<any>("living");

  const selected = roomTypes[selectedId] || null;

  return (
    <div className='flex rounded-md shadow-xs'>
      <Select value={selectedId} onValueChange={v => setSelectedId(v)}>
        <SelectTrigger className='w-fit rounded-e-none shadow-none'>
          <SelectValue>
            {selected && (
              <selected.Icon size={18} color={selected.color} strokeWidth={3} />
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
        defaultValue='Living Room'
      />
    </div>
  );
}

export function RoomDetails() {
  return (
    <div className='flex flex-col p-4'>
      <h2 className='mb-2 font-semibold'>Room Details</h2>

      <RoomName />

      <RectPreview
        className='mt-6 mb-6'
        rectangles={[
          {
            left: 29,
            top: 39,
            width: 9,
            height: 14
          },
          {
            left: 29,
            top: 53,
            width: 5,
            height: 1
          }
        ]}
      />

      <Stat label='Length' value='32 ft.' />
      <Stat label='Width' value='26 ft.' />
      <Stat label='Area' value='832 ft. sq' />
    </div>
  );
}
