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
import { RectPreview } from "./RectPreview";
import { ComponentType, useState } from "react";
import { BedDouble, Droplet, Eclipse, Grape, Tv } from "lucide-react";
// import {  } from "@radix-ui/react-select";

interface RoomType {
  id: string;
  title: string;
  color: string;
  Icon: ComponentType<any>;
}

const roomTypes = {
  living: {
    id: "living",
    title: "Living Room",
    color: "#EE4D4D",
    Icon: Tv
  } as RoomType,
  bedroom: {
    id: "bedroom",
    title: "Bedroom Room",
    color: "#a808c5",
    Icon: BedDouble
  } as RoomType,
  bathroom: {
    id: "bathroom",
    title: "Bathroom Room",
    color: "#BEBEBE",
    Icon: Droplet
  } as RoomType,
  kitchen: {
    id: "kitchen",
    title: "Kitchen",
    color: "#6ce244",
    Icon: Grape
  } as RoomType,
  balcony: {
    id: "balcony",
    title: "Balcony",
    color: "#f9e909",
    Icon: Eclipse
  } as RoomType
} as const;

type RoomTypeIds = keyof typeof roomTypes;
const roomTypeIds = Object.keys(roomTypes) as RoomTypeIds[];

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
            {/* {selected && (
              <span className='text-lg leading-none'>
                {findC(selected)?.flag}
              </span>
            )} */}
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

export function RightPane() {
  return (
    <ResizablePanel minSize={10} defaultSize={15} className='flex flex-col p-4'>
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
    </ResizablePanel>
  );
}
