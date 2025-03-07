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
import { useRef, useState } from "react";

import {
  nodeTypeToRoomType,
  roomTypeIds,
  roomTypes,
  roomTypeToNodeType
} from "@/pages/web-editor/plan/rooms";

export function RoomIdentityInput({
  initialName,
  initialNodeType,
  onUpdateName,
  onUpdateNodeType
}: {
  initialName: string;
  initialNodeType: number;
  onUpdateName: (name: string) => void;
  onUpdateNodeType: (type: number) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName /* room.label */);

  const [typeId, setTypeId] = useState<string>(
    nodeTypeToRoomType[initialNodeType /* room.type */]
  );
  const selectedType = roomTypes[typeId] || null;

  function saveName() {
    onUpdateName(name);
  }

  function saveType(typeId: string) {
    onUpdateNodeType(roomTypeToNodeType[typeId]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      saveName();
      ref.current?.blur();
    }
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
        ref={ref}
        className='-ms-px rounded-s-none shadow-none focus-visible:z-10'
        placeholder='Room Name'
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        onBlur={saveName}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
