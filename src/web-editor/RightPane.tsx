import { Stat } from "@/components/Stat";
import { ResizablePanel } from "@/components/ui/resizable";

import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RectPreview } from "./RectPreview";
import { useState } from "react";

const countries = [
  {
    continent: "America",
    items: [
      { value: "1", label: "United States", flag: "🇺🇸" },
      { value: "2", label: "Canada", flag: "🇨🇦" },
      { value: "3", label: "Mexico", flag: "🇲🇽" }
    ]
  },
  {
    continent: "Africa",
    items: [
      { value: "4", label: "South Africa", flag: "🇿🇦" },
      { value: "5", label: "Nigeria", flag: "🇳🇬" },
      { value: "6", label: "Morocco", flag: "🇲🇦" }
    ]
  },
  {
    continent: "Asia",
    items: [
      { value: "7", label: "China", flag: "🇨🇳" },
      { value: "8", label: "Japan", flag: "🇯🇵" },
      { value: "9", label: "India", flag: "🇮🇳" }
    ]
  },
  {
    continent: "Europe",
    items: [
      { value: "10", label: "United Kingdom", flag: "🇬🇧" },
      { value: "11", label: "France", flag: "🇫🇷" },
      { value: "12", label: "Germany", flag: "🇩🇪" }
    ]
  },
  {
    continent: "Oceania",
    items: [
      { value: "13", label: "Australia", flag: "🇦🇺" },
      { value: "14", label: "New Zealand", flag: "🇳🇿" }
    ]
  }
];

function findC(val) {
  for (const c of countries) {
    for (const item of c.items) {
      if (item.value == val) return item;
    }
  }

  return null;
}

/*

<SelectNative className='w-fit rounded-e-none text-muted-foreground shadow-none hover:text-foreground'>
  <option value='https://'>https://</option>
  <option value='http://'>http://</option>
  <option value='ftp://'>ftp://</option>
  <option value='sftp://'>sftp://</option>
  <option value='ws://'>ws://</option>
  <option value='wss://'>wss://</option>
</SelectNative>

*/

function RoomName() {
  const [selected, setSelected] = useState<any>("14");
  return (
    <div className='flex rounded-md shadow-xs'>
      <Select value={selected} onValueChange={v => setSelected(v)}>
        <SelectTrigger className='w-fit rounded-e-none shadow-none'>
          <SelectValue>
            {selected && (
              <span className='text-lg leading-none'>
                {findC(selected)?.flag}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80'>
          {countries.map(continent =>
            continent.items.map(item => (
              <SelectItem key={item.value} value={item.value}>
                <span className='text-lg leading-none'>{item.flag}</span>{" "}
                <span className='truncate'>{item.label}</span>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      <Input
        className='-ms-px rounded-s-none shadow-none focus-visible:z-10'
        placeholder='Room Name'
        type='text'
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

/*

{
  "left": 41,
  "top": 16,
  "width": 17,
  "height": 8
},
{
  "left": 39,
  "top": 21,
  "width": 2,
  "height": 3
}

*/
