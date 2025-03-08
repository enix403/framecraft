import { Stat } from "@/components/Stat";
import { RectPreview } from "@/components/RectPreview";
import { useSelectedObject } from "../world2d/state/selections";
import { usePlan, useUpdatePlan } from "../PlanProvider";
import { DoorOpen } from "lucide-react";
import { RoomIdentityInput } from "@/components/RoomIdentityInput";
import { appNodeStyle } from "@/lib/node-styles";

export function RoomDetails() {
  const plan = usePlan();
  const updatePlan = useUpdatePlan();

  const [selectedObj] = useSelectedObject();

  const room = selectedObj ? plan.rooms[selectedObj.index] : null;
  const style = room ? appNodeStyle[room.typeId] : null;

  return (
    <div className='h-full p-4'>
      {room ? (
        <>
          <h2 className='mb-2 font-semibold'>Room Details</h2>

          <RoomIdentityInput
            key={room.id}
            initialName={room.label}
            initialTypeId={room.typeId}
            onUpdateName={name => {
              updatePlan(plan => {
                plan.rooms[selectedObj!.index].label = name;
              });
            }}
            onUpdateNodeType={typeId => {
              updatePlan(plan => {
                plan.rooms[selectedObj!.index].typeId = typeId;
              });
            }}
          />

          <RectPreview
            className='mt-6 mb-6'
            rectangles={room.rects.map(([r, c, w, h]) => ({
              left: c,
              top: r,
              width: w,
              height: h
            }))}
            outStrokeColor={style!.iconColor}
            fillColor={style!.mapRectColor}
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
          <p className='mt-2 text-center leading-[1.2] font-medium text-muted-foreground/70'>
            Select a room to inspect
          </p>
        </div>
      )}
    </div>
  );
}
